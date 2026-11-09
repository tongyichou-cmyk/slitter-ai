// 把數據代號與數據元件換成純文字，給 FAQ 結構化資料與 llms 全文版使用，數值一樣只從 data/slitting.ts 來。
import en from '@/messages/en.json'
import zhTW from '@/messages/zh-TW.json'
import {
  SLITTING_DATA,
  MATERIALS,
  getClearance,
  getRule,
  getBurrLimit,
  type MaterialKey,
  type RuleKey,
  type BurrApplication,
  type ClearanceRule,
} from '@/data/slitting'
import type { Locale } from '@/lib/i18n'

const MESSAGES = { en, 'zh-TW': zhTW } as const

const range = ([min, max]: [number, number]) => `${min}–${max}%`

export function clearanceText(material: string, thickness: number): string {
  const row = getClearance(material as MaterialKey, thickness)
  if (!row) throw new Error(`data/slitting.ts 沒有 ${material} 厚度 ${thickness} mm 的間隙數據`)
  return range([row.min, row.max])
}

export function ruleText(material: string): string {
  const rule = getRule(material as RuleKey)
  if (!rule) throw new Error(`data/slitting.ts 沒有 ${material} 的間隙規則`)
  return rule.deltaPct ? `+${range(rule.deltaPct)}` : range(rule.fixedPct!)
}

export function burrText(application: string): string {
  const limit = getBurrLimit(application as BurrApplication)
  if (!limit) throw new Error(`data/slitting.ts 沒有 ${application} 的毛邊上限`)
  return `${limit.maxPct}%`
}

// 數據表裡規則列的說明文字，網頁元件與純文字版共用
export function ruleCell(locale: Locale, rule: ClearanceRule): string {
  const d = MESSAGES[locale].data
  if (!rule.deltaPct) return range(rule.fixedPct!)
  return d.ruleDelta
    .replace('{basis}', d.basis[rule.basis!])
    .replace('{min}', String(rule.deltaPct[0]))
    .replace('{max}', String(rule.deltaPct[1]))
}

// frontmatter 用 {{clearance:材料:厚度}}、{{rule:材料}}、{{burr:用途}}
export function resolveDataTokens(text: string): string {
  return text
    .replace(/\{\{clearance:([\w-]+):([\d.]+)\}\}/g, (_, m, t) => clearanceText(m, Number(t)))
    .replace(/\{\{rule:([\w-]+)\}\}/g, (_, m) => ruleText(m))
    .replace(/\{\{burr:([\w-]+)\}\}/g, (_, a) => burrText(a))
}

function clearanceTableText(locale: Locale, materials?: MaterialKey[]): string {
  const m = MESSAGES[locale]
  const names = m.materials as Record<MaterialKey, string>
  const rows = SLITTING_DATA.clearance.filter(r => (materials ?? MATERIALS).includes(r.material))
  const rules = materials ? [] : SLITTING_DATA.clearanceRules
  return [
    `| ${m.data.material} | ${m.data.thickness} | ${m.data.clearance} |`,
    '|---|---|---|',
    ...rows.map(r => `| ${names[r.material]} | ${r.thicknessMm[0]}–${r.thicknessMm[1]} | ${range(r.clearancePct)} |`),
    ...rules.map(r => `| ${m.data.rules[r.material]} | ${m.data.anyThickness} | ${ruleCell(locale, r)} |`),
  ].join('\n')
}

function burrTableText(locale: Locale): string {
  const d = MESSAGES[locale].data
  return [
    `| ${d.application} | ${d.burrMax} |`,
    '|---|---|',
    ...SLITTING_DATA.burrLimits.map(l => `| ${d.applications[l.application]} | ≤ ${l.maxPct}% |`),
  ].join('\n')
}

export function renderDataComponents(body: string, locale: Locale): string {
  return body
    .replace(/<Clearance\s+material="([\w-]+)"\s+thickness="([\d.]+)"\s*\/>/g, (_, m, t) => clearanceText(m, Number(t)))
    .replace(/<ClearanceRule\s+material="([\w-]+)"\s*\/>/g, (_, m) => ruleText(m))
    .replace(/<BurrLimit\s+application="([\w-]+)"\s*\/>/g, (_, a) => burrText(a))
    .replace(/<ClearanceTable(?:\s+materials="([\w,-]+)")?\s*\/>/g, (_, list?: string) =>
      clearanceTableText(locale, list ? (list.split(',') as MaterialKey[]) : undefined),
    )
    .replace(/<BurrTable\s*\/>/g, () => burrTableText(locale))
    .replace(/<DataStatus\s*\/>/g, '')
}
