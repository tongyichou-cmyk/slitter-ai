import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { SITE, officialLink } from '@/data/site'
import Breadcrumb from '@/components/Breadcrumb'
import CTA from '@/components/CTA'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({ locale, path: '/about' })
}

export default async function AboutPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'about' })
  const tb = await getTranslations({ locale, namespace: 'breadcrumb' })
  const base = `/${locale}`

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumb currentPath={`${base}/about`} items={[{ name: tb('home'), href: base }, { name: t('heading') }]} />
      <h1>{t('heading')}</h1>

      <div className="mt-6 article-body">
        <p className="text-lg text-gray-600">{t('lead')}</p>

        <h2>{t('companyHeading')}</h2>
        <ul>
          <li><strong>{t('founded')}:</strong> {SITE.company.founded}</li>
          <li><strong>{t('products')}:</strong> {t('productsValue')}</li>
          <li><strong>{t('certification')}:</strong> {SITE.company.certifications.join(', ')}</li>
          <li><strong>{t('website')}:</strong> <Link href={officialLink(locale, 'home')} target="_blank" rel="noopener">slitterline.com</Link></li>
        </ul>

        <h2>{t('editorialHeading')}</h2>
        <p>{t('editorial1')}</p>
        <p>{t('editorial2')}</p>
        <p>{t('editorial3')}</p>
      </div>

      <CTA locale={locale} variant="banner" />
    </article>
  )
}
