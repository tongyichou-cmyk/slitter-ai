import { buildMetadata } from '@/lib/seo'
import { getAllArticles } from '@/lib/data'
import ArticleCard from '@/components/ArticleCard'
import CTA from '@/components/CTA'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({
    title: 'Slitting Technology Guides',
    description: 'Practical engineering guides for slitting machine operation, knife selection, process setup, and troubleshooting.',
    locale,
    path: '/guide',
  })
}

export default function GuidePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const articles = getAllArticles(locale, 'guide')
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1>Slitting Technology Guides</h1>
      <p className="mt-3 text-gray-600">Practical engineering guides for slitting operations, knife selection, and process optimization.</p>

      <div className="mt-8 grid gap-4">
        {articles.length > 0 ? (
          articles.map(article => (
            <ArticleCard
              key={article.slug}
              article={article}
              href={`/${locale}/guide/${article.slug}`}
            />
          ))
        ) : (
          <p className="text-gray-400">Guides coming soon.</p>
        )}
      </div>

      <div className="mt-12">
        <CTA variant="banner" />
      </div>
    </div>
  )
}
