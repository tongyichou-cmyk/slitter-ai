import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { registry } from '@/lib/content/registry'
import ArticleCard from '@/components/ArticleCard'
import Breadcrumb from '@/components/Breadcrumb'
import CTA from '@/components/CTA'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({ locale, path: '/guide' })
}

export default async function GuideIndexPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'guideIndex' })
  const tb = await getTranslations({ locale, namespace: 'breadcrumb' })
  const ta = await getTranslations({ locale, namespace: 'article' })
  const base = `/${locale}`
  const guides = registry.listPages(locale).filter(p => p.section === 'guide')

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumb currentPath={`${base}/guide`} items={[{ name: tb('home'), href: base }, { name: tb('guide') }]} />
      <h1>{t('heading')}</h1>
      <p className="mt-3 text-gray-600">{t('intro')}</p>

      <div className="mt-8 grid gap-4">
        {guides.length > 0
          ? guides.map(page => <ArticleCard key={page.path} page={page} href={`${base}${page.path}`} dateLabel={ta('updated')} />)
          : <p className="text-gray-400">{t('empty')}</p>}
      </div>

      <div className="mt-12">
        <CTA locale={locale} variant="banner" />
      </div>
    </div>
  )
}
