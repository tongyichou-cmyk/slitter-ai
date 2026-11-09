import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { registry } from '@/lib/content/registry'
import Breadcrumb from '@/components/Breadcrumb'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({ locale, path: '/wiki' })
}

export default async function WikiIndexPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'wikiIndex' })
  const tb = await getTranslations({ locale, namespace: 'breadcrumb' })
  const ta = await getTranslations({ locale, namespace: 'article' })
  const base = `/${locale}`
  const articles = registry.listPages(locale).filter(p => p.section === 'wiki')

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumb currentPath={`${base}/wiki`} items={[{ name: tb('home'), href: base }, { name: tb('wiki') }]} />

      <h1 className="text-3xl font-bold mt-6 mb-2" style={{ fontFamily: 'var(--font-display), Georgia, serif', color: '#1A1512' }}>{t('heading')}</h1>
      <p className="text-base mb-10" style={{ color: '#4A3F35' }}>{t('intro')}</p>
      <p className="text-sm mb-6 font-mono" style={{ color: '#8B6E5A' }}>{ta('articleCount', { count: articles.length })}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map(page => (
          <Link
            key={page.path}
            href={`${base}${page.path}`}
            className="block no-underline rounded p-5 transition-colors hover:border-[#B8860B]"
            style={{ background: '#FFFFFF', border: '1px solid #D8CFC4' }}
          >
            <h2 className="mb-2" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '15px', fontWeight: 600, color: '#1A1512', lineHeight: 1.35 }}>
              {page.title}
            </h2>
            <p className="text-sm mb-3 line-clamp-3" style={{ color: '#4A3F35', lineHeight: 1.65 }}>{page.description}</p>
            <span className="font-mono text-[11px]" style={{ color: '#B8860B' }}>{ta('readArticle')} →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
