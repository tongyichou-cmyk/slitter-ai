import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import Breadcrumb from '@/components/Breadcrumb'
import Calculator from '@/components/Calculator'
import CTA from '@/components/CTA'
import { DataStatus } from '@/components/SlittingData'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({ locale, path: '/tools/clearance-calculator' })
}

export default async function CalculatorPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'calculator' })
  const tb = await getTranslations({ locale, namespace: 'breadcrumb' })
  const base = `/${locale}`

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumb
        currentPath={`${base}/tools/clearance-calculator`}
        items={[{ name: tb('home'), href: base }, { name: tb('tools'), href: `${base}/tools` }, { name: t('heading') }]}
      />

      <h1>{t('heading')}</h1>
      <p className="mt-3 text-gray-600 mb-8">{t('intro')}</p>

      <Calculator />
      <div className="mt-4"><DataStatus locale={locale} /></div>

      <div className="mt-12">
        <CTA locale={locale} variant="banner" heading={t('ctaHeading')} subheading={t('ctaSubheading')} />
      </div>
    </div>
  )
}
