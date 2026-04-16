import { buildMetadata } from '@/lib/seo'
import { buildBreadcrumbSchema, SCHEMA_BASE_URL } from '@/lib/schema'
import SchemaScript from '@/components/SchemaScript'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({
    title: 'Engineering Tools — Slitting Calculators & References',
    description: 'Interactive engineering tools for slitting machine setup: clearance calculator, material thickness reference, and more.',
    locale,
    path: '/tools',
  })
}

export default function ToolsPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const base = `/${locale}`
  const isZh = locale === 'zh-TW' || locale === 'zh-CN'

  const tools = [
    {
      slug: 'clearance-calculator',
      title: isZh ? '分條間隙計算機' : 'Slitter Clearance Calculator',
      description: isZh
        ? '根據材料種類和厚度，自動計算建議的刀具間隙範圍。'
        : 'Enter material type and thickness to get the recommended slitter knife clearance range.',
      tag: isZh ? '計算工具' : 'Calculator',
    },
  ]

  return (
    <>
      <SchemaScript schemas={[
        buildBreadcrumbSchema([
          { name: 'Home', url: `${SCHEMA_BASE_URL}/${locale}` },
          { name: isZh ? '工具' : 'Tools', url: `${SCHEMA_BASE_URL}/${locale}/tools` },
        ]),
      ]} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb items={[
          { name: 'Home', href: base },
          { name: isZh ? '工具' : 'Tools' },
        ]} />

        <h1 className="text-3xl font-bold mt-6 mb-2" style={{ fontFamily: 'var(--font-display), Georgia, serif', color: '#1A1512' }}>
          {isZh ? '工程計算工具' : 'Engineering Tools'}
        </h1>
        <p className="text-base mb-10" style={{ color: '#4A3F35' }}>
          {isZh
            ? '分條製程設定輔助計算工具，由道德煜企業技術團隊整理提供。'
            : 'Interactive tools to support slitting process setup, maintained by TOA DR Engineering Team.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map(({ slug, title, description, tag }) => (
            <Link
              key={slug}
              href={`${base}/tools/${slug}`}
              className="block no-underline rounded p-5 transition-colors hover:border-[#B8860B]"
              style={{ background: '#FFFFFF', border: '1px solid #D8CFC4' }}
            >
              <div className="flex items-start justify-between mb-2">
                <h2 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '15px', fontWeight: 600, color: '#1A1512', lineHeight: 1.35 }}>
                  {title}
                </h2>
                <span
                  className="font-mono text-[10px] whitespace-nowrap ml-2 px-1.5 py-0.5 rounded-[2px] shrink-0"
                  style={{ color: '#8B6E5A', background: '#EDE8E0', border: '1px solid #D8CFC4' }}
                >
                  {tag}
                </span>
              </div>
              <p className="text-sm mb-3" style={{ color: '#4A3F35', lineHeight: 1.65 }}>
                {description}
              </p>
              <span className="font-mono text-[11px]" style={{ color: '#B8860B' }}>
                {isZh ? '開啟工具 →' : 'Open tool →'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
