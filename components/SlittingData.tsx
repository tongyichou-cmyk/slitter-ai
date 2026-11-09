import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'
import { SLITTING_DATA, MATERIALS, getClearance, isReviewed, type MaterialKey } from '@/data/slitting'

// 這些元件可在 MDX 中使用，文章裡的間隙數值一律透過它們從 data/slitting.ts 讀取。

export async function ClearanceTable({ locale, materials = MATERIALS }: { locale: Locale; materials?: MaterialKey[] }) {
  const t = await getTranslations({ locale, namespace: 'data' })
  const tm = await getTranslations({ locale, namespace: 'materials' })
  const rows = SLITTING_DATA.clearance.filter(r => materials.includes(r.material))
  const cell = 'border border-gray-200 px-3 py-2 text-left'
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
              <td className={cell} style={{ fontVariantNumeric: 'tabular-nums' }}>{r.thicknessMm[0]}–{r.thicknessMm[1]}</td>
              <td className={cell} style={{ fontVariantNumeric: 'tabular-nums' }}>{r.clearancePct[0]}–{r.clearancePct[1]}%</td>
              <td className={cell}>{t(`sourceTypes.${r.source.type}`)}</td>
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
      {t('version')}: {SLITTING_DATA.version} ·{' '}
      {isReviewed() ? t('reviewedOn', { date: SLITTING_DATA.reviewedAt! }) : t('pendingReview')}{' '}
      <Link href={`/${locale}/data/slitting-clearance`} className="underline">{t('heading')}</Link>
    </p>
  )
}

export function Clearance({ material, thickness }: { material: MaterialKey; thickness: number }) {
  const row = getClearance(material, thickness)
  if (!row) throw new Error(`data/slitting.ts 沒有 ${material} 厚度 ${thickness} mm 的間隙數據`)
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{row.min}–{row.max}%</span>
}
