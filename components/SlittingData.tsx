import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'
import { SLITTING_DATA, MATERIALS, type MaterialKey, type RuleKey, type BurrApplication } from '@/data/slitting'
import { clearanceText, ruleText, burrText, ruleCell } from '@/lib/content/data-text'

// 這些元件可在 MDX 中使用，文章裡的間隙與毛邊數值一律透過它們從 data/slitting.ts 讀取。

const cell = 'border border-gray-200 px-3 py-2 text-left'
const num = { fontVariantNumeric: 'tabular-nums' } as const

export async function ClearanceTable({ locale, materials }: { locale: Locale; materials?: MaterialKey[] }) {
  const t = await getTranslations({ locale, namespace: 'data' })
  const tm = await getTranslations({ locale, namespace: 'materials' })
  const rows = SLITTING_DATA.clearance.filter(r => (materials ?? MATERIALS).includes(r.material))
  const rules = materials ? [] : SLITTING_DATA.clearanceRules
  return (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className={cell}>{t('material')}</th>
            <th className={cell}>{t('thickness')}</th>
            <th className={cell}>{t('clearance')}</th>
            <th className={cell}>{t('source')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className={cell}>{tm(r.material)}</td>
              <td className={cell} style={num}>{r.thicknessMm[0]}–{r.thicknessMm[1]}</td>
              <td className={cell} style={num}>{r.clearancePct[0]}–{r.clearancePct[1]}%</td>
              <td className={cell}>{t(`sourceTypes.${r.source.type}`)}</td>
            </tr>
          ))}
          {rules.map(r => (
            <tr key={r.material}>
              <td className={cell}>{t(`rules.${r.material}`)}</td>
              <td className={cell}>{t('anyThickness')}</td>
              <td className={cell} style={num}>{ruleCell(locale, r)}</td>
              <td className={cell}>{t(`sourceTypes.${r.source.type}`)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <DataStatus locale={locale} />
    </div>
  )
}

export async function BurrTable({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'data' })
  return (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className={cell}>{t('application')}</th>
            <th className={cell}>{t('burrMax')}</th>
          </tr>
        </thead>
        <tbody>
          {SLITTING_DATA.burrLimits.map(l => (
            <tr key={l.application}>
              <td className={cell}>{t(`applications.${l.application}`)}</td>
              <td className={cell} style={num}>≤ {l.maxPct}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <DataStatus locale={locale} />
    </div>
  )
}

export async function DataStatus({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'data' })
  return (
    <p className="mt-2 text-xs text-gray-500">
      {t('version')}: {SLITTING_DATA.version} · {t('updatedOn', { date: SLITTING_DATA.updatedAt })} · {t('reference')}{' '}
      <Link href={`/${locale}/data/slitting-clearance`} className="underline">{t('heading')}</Link>
    </p>
  )
}

// MDX 不執行 JS 運算式，所以厚度用字串傳入，例如 thickness="1.5"
export function Clearance({ material, thickness }: { material: MaterialKey; thickness: string }) {
  return <span style={num}>{clearanceText(material, Number(thickness))}</span>
}

export function ClearanceRule({ material }: { material: RuleKey }) {
  return <span style={num}>{ruleText(material)}</span>
}

export function BurrLimit({ application }: { application: BurrApplication }) {
  return <span style={num}>{burrText(application)}</span>
}
