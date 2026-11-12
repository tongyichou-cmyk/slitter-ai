import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'
import { SLITTING_DATA, MATERIALS, type MaterialKey, type RuleKey, type BurrApplication } from '@/data/slitting'
import { clearanceText, ruleText, burrText, ruleCell } from '@/lib/content/data-text'

const num = { fontVariantNumeric: 'tabular-nums' } as const

// 這些元件可在 MDX 中使用，文章裡的間隙與毛邊數值一律透過它們從 data/slitting.ts 讀取。


export async function ClearanceTable({ locale, materials }: { locale: Locale; materials?: MaterialKey[] }) {
  const t = await getTranslations({ locale, namespace: 'data' })
  const tm = await getTranslations({ locale, namespace: 'materials' })
  const rows = SLITTING_DATA.clearance.filter(r => (materials ?? MATERIALS).includes(r.material))
  const rules = materials ? [] : SLITTING_DATA.clearanceRules
  return (
    <div className="not-prose my-6">
      <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>{t('material')}</th>
            <th>{t('thickness')}</th>
            <th>{t('clearance')}</th>
            <th>{t('source')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{tm(r.material)}</td>
              <td className="num">{r.thicknessMm[0]}–{r.thicknessMm[1]}</td>
              <td className="num">{r.clearancePct[0]}–{r.clearancePct[1]}%</td>
              <td>{t(`sourceTypes.${r.source.type}`)}</td>
            </tr>
          ))}
          {rules.map(r => (
            <tr key={r.material}>
              <td>{t(`rules.${r.material}`)}</td>
              <td>{t('anyThickness')}</td>
              <td className="num">{ruleCell(locale, r)}</td>
              <td>{t(`sourceTypes.${r.source.type}`)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <DataStatus locale={locale} />
    </div>
  )
}

export async function BurrTable({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'data' })
  return (
    <div className="not-prose my-6">
      <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>{t('application')}</th>
            <th>{t('burrMax')}</th>
          </tr>
        </thead>
        <tbody>
          {SLITTING_DATA.burrLimits.map(l => (
            <tr key={l.application}>
              <td>{t(`applications.${l.application}`)}</td>
              <td className="num">≤ {l.maxPct}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
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
