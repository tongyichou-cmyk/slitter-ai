import { buildMetadata } from '@/lib/seo'
import { buildBreadcrumbSchema, SCHEMA_BASE_URL } from '@/lib/schema'
import SchemaScript from '@/components/SchemaScript'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'
import { getAllWikiSlugs, getWikiContent } from '@/lib/wiki'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({
    title: 'Knowledge Base — Slitting Machine & Knife Wiki',
    description: 'Complete technical wiki for slitting machines, slitter knives, spacers, and process parameters. Engineering reference maintained by TOA DR Enterprise.',
    locale,
    path: '/wiki',
  })
}

export default function WikiIndexPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const base = `/${locale}`
  const isZh = locale === 'zh-TW' || locale === 'zh-CN'

  // Dynamically load all articles for this locale
  const slugs = getAllWikiSlugs(locale)
  const articles = slugs
    .map(slug => {
      const wiki = getWikiContent(locale, slug)
      if (!wiki) return null
      return { slug, frontmatter: wiki.frontmatter }
    })
    .filter(Boolean) as { slug: string; frontmatter: { title: string; description: string; keywords?: string[] } }[]

  return (
    <>
      <SchemaScript schemas={[
        buildBreadcrumbSchema([
          { name: 'Home', url: `${SCHEMA_BASE_URL}/${locale}` },
          { name: 'Knowledge Base', url: `${SCHEMA_BASE_URL}/${locale}/wiki` },
        ]),
      ]} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb items={[
          { name: 'Home', href: base },
          { name: 'Knowledge Base' },
        ]} />

        <h1 className="text-3xl font-bold mt-6 mb-2" style={{ fontFamily: 'var(--font-display), Georgia, serif', color: '#1A1512' }}>
          {isZh ? '知識庫' : 'Knowledge Base'}
        </h1>
        <p className="text-base mb-10" style={{ color: '#4A3F35' }}>
          {isZh
            ? '分條機設備、分條刀具、間隔環與製程參數的完整技術參考，由道德煜企業技術團隊撰寫維護。'
            : 'Complete technical reference for slitting machines, slitter knives, spacers, and process parameters — maintained by TOA DR Engineering Team.'}
        </p>

        <p className="text-sm mb-6 font-mono" style={{ color: '#8B6E5A' }}>
          {articles.length} {isZh ? '篇文章' : 'articles'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map(({ slug, frontmatter }) => {
            const tag = frontmatter.keywords?.[0] ?? ''
            return (
              <Link
                key={slug}
                href={`${base}/wiki/${slug}`}
                className="block no-underline rounded p-5 transition-colors hover:border-[#B8860B]"
                style={{ background: '#FFFFFF', border: '1px solid #D8CFC4' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h2 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '15px', fontWeight: 600, color: '#1A1512', lineHeight: 1.35 }}>
                    {frontmatter.title}
                  </h2>
                  {tag && (
                    <span
                      className="font-mono text-[10px] whitespace-nowrap ml-2 px-1.5 py-0.5 rounded-[2px] shrink-0"
                      style={{ color: '#8B6E5A', background: '#EDE8E0', border: '1px solid #D8CFC4' }}
                    >
                      {tag}
                    </span>
                  )}
                </div>
                <p className="text-sm mb-3" style={{ color: '#4A3F35', lineHeight: 1.65 }}>
                  {frontmatter.description.slice(0, 100)}…
                </p>
                <span className="font-mono text-[11px]" style={{ color: '#B8860B' }}>
                  {isZh ? '閱讀文章 →' : 'Read article →'}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
