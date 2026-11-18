// 分條間隙等技術數值的唯一來源。文章、FAQ、計算機都從這裡讀取，不在別處手打數字。
// 這些是參考用的起始值，網站上一律標示為參考值，實際設定以試切結果為準。

export type MaterialKey =
  | 'mild-steel'
  | 'stainless-steel'
  | 'aluminum'
  | 'copper'

export type Source =
  | { type: 'company-practice'; note: string }
  | { type: 'standard'; ref: string }
  | { type: 'publication'; ref: string; url?: string }

export type ClearanceRow = {
  material: MaterialKey
  // 左閉右開：[min, max)
  thicknessMm: [number, number]
  // 單邊間隙，占材料厚度的百分比
  clearancePct: [number, number]
  source: Source
}

export type RuleKey = 'hsla' | 'ahss' | 'galvanized' | 'silicon-steel'

// 沒有依厚度分級的材料：用相對基準材料的加減，或不分厚度的固定範圍表示（兩者擇一）
export type ClearanceRule = {
  material: RuleKey
  basis?: 'mild-steel' | 'base-metal'
  deltaPct?: [number, number]
  fixedPct?: [number, number]
  source: Source
}

export type BurrApplication = 'general' | 'automotive' | 'electrical-steel' | 'battery-electrode'

// 毛邊高度上限，占材料厚度的百分比；實際以客戶規格為準
export type BurrLimit = { application: BurrApplication; maxPct: number; source: Source }

export type SlittingData = {
  version: string
  updatedAt: string
  clearance: ClearanceRow[]
  clearanceRules: ClearanceRule[]
  burrLimits: BurrLimit[]
}

const PRACTICE: Source = {
  type: 'company-practice',
  note: 'Starting values compiled by TOA DR Enterprise; confirm by test slitting.',
}

export const SLITTING_DATA: SlittingData = {
  version: '2026-11',
  updatedAt: '2026-11-09',
  clearance: [
    { material: 'mild-steel', thicknessMm: [0.3, 0.8], clearancePct: [5, 8], source: PRACTICE },
    { material: 'mild-steel', thicknessMm: [0.8, 2.0], clearancePct: [7, 10], source: PRACTICE },
    { material: 'mild-steel', thicknessMm: [2.0, 4.0], clearancePct: [9, 12], source: PRACTICE },
    { material: 'stainless-steel', thicknessMm: [0.3, 1.5], clearancePct: [4, 7], source: PRACTICE },
    { material: 'stainless-steel', thicknessMm: [1.5, 4.0], clearancePct: [6, 9], source: PRACTICE },
    { material: 'aluminum', thicknessMm: [0.5, 2.0], clearancePct: [6, 10], source: PRACTICE },
    { material: 'copper', thicknessMm: [0.3, 1.5], clearancePct: [5, 8], source: PRACTICE },
  ],
  clearanceRules: [
    { material: 'hsla', basis: 'mild-steel', deltaPct: [1, 2], source: PRACTICE },
    { material: 'ahss', basis: 'mild-steel', deltaPct: [2, 4], source: PRACTICE },
    { material: 'galvanized', basis: 'base-metal', deltaPct: [0.5, 1], source: PRACTICE },
    { material: 'silicon-steel', fixedPct: [4, 6], source: PRACTICE },
  ],
  burrLimits: [
    { application: 'general', maxPct: 12, source: PRACTICE },
    { application: 'automotive', maxPct: 8, source: PRACTICE },
    { application: 'electrical-steel', maxPct: 5, source: PRACTICE },
    { application: 'battery-electrode', maxPct: 2, source: PRACTICE },
  ],
}

export const MATERIALS: MaterialKey[] = ['mild-steel', 'stainless-steel', 'aluminum', 'copper']

export function getRule(material: RuleKey, data: SlittingData = SLITTING_DATA): ClearanceRule | null {
  return data.clearanceRules.find(r => r.material === material) ?? null
}

export function getBurrLimit(application: BurrApplication, data: SlittingData = SLITTING_DATA): BurrLimit | null {
  return data.burrLimits.find(l => l.application === application) ?? null
}

export function getClearance(
  material: MaterialKey,
  thicknessMm: number,
  data: SlittingData = SLITTING_DATA,
): { min: number; max: number; thicknessMm: [number, number]; source: Source } | null {
  const row = data.clearance.find(
    r => r.material === material && thicknessMm >= r.thicknessMm[0] && thicknessMm < r.thicknessMm[1],
  )
  if (!row) return null
  return { min: row.clearancePct[0], max: row.clearancePct[1], thicknessMm: row.thicknessMm, source: row.source }
}

export function clearanceRows(material: MaterialKey, data: SlittingData = SLITTING_DATA): ClearanceRow[] {
  return data.clearance.filter(r => r.material === material)
}

function hasSource(source: Source): boolean {
  if (source.type === 'company-practice') return source.note.trim() !== ''
  return source.ref.trim() !== ''
}

export function assertPublishable(data: SlittingData = SLITTING_DATA): void {
  if (!data.updatedAt) throw new Error('data/slitting.ts 缺少更新日期 updatedAt。')
  const sources = [...data.clearance, ...data.clearanceRules, ...data.burrLimits].map(r => r.source)
  if (!sources.every(hasSource)) throw new Error('data/slitting.ts 有數值沒有說明來源。')
}
