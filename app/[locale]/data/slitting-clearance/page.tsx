import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { buildDatasetSchema } from '@/lib/schema'
import { registry } from '@/lib/content/registry'
import { SLITTING_DATA } from '@/data/slitting'
import SchemaScript from '@/components/SchemaScript'
import Breadcrumb from '@/components/Breadcrumb'
import { ClearanceTable, BurrTable } from '@/components/SlittingData'
import type { Locale } from '@/lib/i18n'

const PATH = '/data/slitting-clearance'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({ locale, path: PATH })
}

export default async function ClearanceDataPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'data' })
  const tb = await getTranslations({ locale, namespace: 'breadcrumb' })
  const tp = await getTranslations({ locale, namespace: 'pages' })
  const page = registry.getPage(locale, PATH)!
  const base = `/${locale}`

  return (
    <>
      <SchemaScript schemas={[buildDatasetSchema({
        locale,
        name: page.title,
        description: tp('clearanceData.datasetDescription'),
        path: PATH,
        version: SLITTING_DATA.version,
        updatedAt: SLITTING_DATA.updatedAt,
      })]} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb currentPath={`${base}${PATH}`} items={[{ name: tb('home'), href: base }, { name: tb('data') }]} />
        <h1>{t('heading')}</h1>
        <p className="mt-3 text-gray-600">{t('intro')}</p>
        <ClearanceTable locale={locale} />
        <h2 className="mt-10">{t('burrHeading')}</h2>
        <p className="mt-3 text-gray-600">{t('burrIntro')}</p>
        <BurrTable locale={locale} />
        <p className="mt-6 text-sm text-gray-500">{t('license')}</p>
      </div>
    </>
  )
}
