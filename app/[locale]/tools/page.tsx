import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { registry } from '@/lib/content/registry'
import Breadcrumb from '@/components/Breadcrumb'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({ locale, path: '/tools' })
}

export default async function ToolsPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'toolsIndex' })
  const tb = await getTranslations({ locale, namespace: 'breadcrumb' })
  const base = `/${locale}`
  const tools = registry.listPages(locale).filter(p => p.section === 'tool')

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumb currentPath={`${base}/tools`} items={[{ name: tb('home'), href: base }, { name: tb('tools') }]} />

      <h1 className="text-3xl font-bold mt-6 mb-2" style={{ fontFamily: 'var(--font-display), Georgia, serif', color: '#1A1512' }}>{t('heading')}</h1>
      <p className="text-base mb-10" style={{ color: '#4A3F35' }}>{t('intro')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map(tool => (
          <Link
            key={tool.path}
            href={`${base}${tool.path}`}
            className="block no-underline rounded p-5 transition-colors hover:border-[#B8860B]"
            style={{ background: '#FFFFFF', border: '1px solid #D8CFC4' }}
          >
            <div className="flex items-start justify-between mb-2">
              <h2 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '15px', fontWeight: 600, color: '#1A1512', lineHeight: 1.35 }}>{tool.title}</h2>
              <span className="font-mono text-[10px] whitespace-nowrap ml-2 px-1.5 py-0.5 rounded-[2px] shrink-0" style={{ color: '#8B6E5A', background: '#EDE8E0', border: '1px solid #D8CFC4' }}>
                {t('tag')}
              </span>
            </div>
            <p className="text-sm mb-3" style={{ color: '#4A3F35', lineHeight: 1.65 }}>{tool.description}</p>
            <span className="font-mono text-[11px]" style={{ color: '#B8860B' }}>{t('open')} →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
