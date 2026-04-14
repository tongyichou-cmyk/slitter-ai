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

const enArticles = [
  { slug: 'slitting-machine-selection-guide',  tag: 'Machine Selection' },
  { slug: 'slitter-knife-material-comparison', tag: 'Knife Materials' },
  { slug: 'precision-spacer-specifications',   tag: 'Spacers' },
  { slug: 'slitting-machine-troubleshooting',  tag: 'Troubleshooting' },
  { slug: 'coil-slitting-process',             tag: 'Process' },
  { slug: 'slitter-knife',                     tag: 'Knife Guide' },
  { slug: 'slitting-machine',                  tag: 'Machines' },
  { slug: 'slitting-process',                  tag: 'Process' },
]

const zhArticles = [
  { slug: 'metal-slitting-machine',         tag: '分條機' },
  { slug: 'slitter-knife-guide',            tag: '分條刀' },
  { slug: 'slitting-clearance-guide',       tag: '間隙設定' },
  { slug: 'arbor-spacer-guide',             tag: '間隔環' },
  { slug: 'lightweight-vs-standard-spacers', tag: '間隔環比較' },
  { slug: 'stripper-rings-guide',           tag: '剪切環' },
  { slug: 'hydraulic-nut-guide',            tag: '液壓螺母' },
  { slug: 'knife-regrinding-guide',         tag: '研磨服務' },
  { slug: 'slitting-defects-diagnosis',     tag: '問題診斷' },
  { slug: 'tooling-installation-guide',     tag: '刀具安裝' },
]

export default function WikiIndexPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const base = `/${locale}`
  const isZh = locale === 'zh-TW' || locale === 'zh-CN'

  const articleList = isZh ? zhArticles : enArticles

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articleList.map(({ slug, tag }) => {
            const wiki = getWikiContent(locale, slug)
            if (!wiki) return null
            const { frontmatter } = wiki
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
                  <span
                    className="font-mono text-[10px] whitespace-nowrap ml-2 px-1.5 py-0.5 rounded-[2px] shrink-0"
                    style={{ color: '#8B6E5A', background: '#EDE8E0', border: '1px solid #D8CFC4' }}
                  >
                    {tag}
                  </span>
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
