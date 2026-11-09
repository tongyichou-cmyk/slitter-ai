import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo'
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/schema'
import { registry } from '@/lib/content/registry'
import { SITE } from '@/data/site'
import SchemaScript from '@/components/SchemaScript'
import CTA from '@/components/CTA'
import QuickFacts from '@/components/QuickFacts'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({ locale, path: '' })
}

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display), Georgia, serif',
  fontSize: '22px',
  fontWeight: 600,
  color: '#1A1512',
  borderBottom: '1px solid #D8CFC4',
  paddingBottom: '8px',
  marginBottom: '16px',
}
const bodyStyle = { fontFamily: 'var(--font-body), Georgia, serif', fontSize: '15px', color: '#4A3F35', lineHeight: 1.8 } as const
const outlineButton = 'inline-flex items-center gap-1.5 font-mono text-[12px] no-underline rounded-[3px] px-3.5 py-2 transition-colors hover:bg-[#B8860B] hover:text-[#0F0D0B]'

export default async function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'home' })
  const ta = await getTranslations({ locale, namespace: 'article' })
  const base = `/${locale}`
  const articles = registry.listPages(locale).filter(p => p.section === 'wiki')
  const guides = registry.listPages(locale).filter(p => p.section === 'guide')

  const facts = [
    { label: t('factPublisher'), value: SITE.company.name[locale] },
    { label: t('factFounded'), value: String(SITE.company.founded) },
    { label: t('factCertification'), value: SITE.company.certifications[0] },
    { label: t('factLanguages'), value: t('factLanguagesValue') },
  ]

  return (
    <>
      <SchemaScript schemas={[buildWebSiteSchema(locale), buildOrganizationSchema(locale)]} />

      <div className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F0D0B, #1E1510, #2A1E10)', borderBottom: '3px solid #B8860B' }}>
        <img
          src="/slitter-machine-hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.18 }}
        />
        <div className="relative max-w-[1200px] mx-auto px-4 lg:px-6 py-10 lg:py-14 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="flex-1">
            <p className="font-mono text-[11px] uppercase tracking-widest mb-3" style={{ color: '#B8860B' }}>{t('eyebrow')}</p>
            <h1 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, color: '#F5EDD8', lineHeight: 1.2, marginBottom: '16px', textWrap: 'balance' }}>
              {t('heading')}
            </h1>
            <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: '15px', color: '#B5A89A', lineHeight: 1.75, maxWidth: '560px' }}>
              {t('intro')}
            </p>
          </div>
          <div className="w-full lg:w-[260px] shrink-0">
            <QuickFacts title={t('factsTitle')} rows={facts} />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-6 lg:py-10">
        <section id="knowledge" className="mb-10">
          <h2 style={sectionHeadingStyle}>{t('knowledgeHeading')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map(page => (
              <Link
                key={page.path}
                href={`${base}${page.path}`}
                className="knowledge-card block no-underline rounded"
                style={{ background: '#FFFFFF', border: '1px solid #D8CFC4', padding: '20px' }}
              >
                <h3 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '16px', fontWeight: 600, color: '#1A1512', marginBottom: '8px' }}>
                  {page.title}
                </h3>
                <p className="mb-3 line-clamp-3" style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: '14px', color: '#4A3F35', lineHeight: 1.7 }}>
                  {page.description}
                </p>
                <span className="font-mono text-[11px]" style={{ color: '#B8860B' }}>{ta('readArticle')} →</span>
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <Link href={`${base}/wiki`} className={outlineButton} style={{ border: '1px solid #B8860B', color: '#B8860B' }}>
              {t('viewAll')} →
            </Link>
          </div>
        </section>

        {guides.length > 0 && (
          <section id="guides" className="mb-10">
            <h2 style={sectionHeadingStyle}>{t('guidesHeading')}</h2>
            <p className="mb-3" style={bodyStyle}>{t('guidesIntro')}</p>
            <ul className="mb-4 list-disc pl-5" style={bodyStyle}>
              {guides.map(g => (
                <li key={g.path}><Link href={`${base}${g.path}`} className="underline">{g.title}</Link></li>
              ))}
            </ul>
            <Link href={`${base}/guide`} className={outlineButton} style={{ border: '1px solid #B8860B', color: '#B8860B' }}>
              {t('browseGuides')} →
            </Link>
          </section>
        )}

        <section id="tools" className="mb-10">
          <h2 style={sectionHeadingStyle}>{t('toolsHeading')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: t('calculatorTitle'), desc: t('calculatorDesc'), href: `${base}/tools/clearance-calculator` },
              { title: t('dataTitle'), desc: t('dataDesc'), href: `${base}/data/slitting-clearance` },
            ].map(item => (
              <Link key={item.href} href={item.href} className="block no-underline rounded p-5 transition-colors hover:border-[#B8860B]" style={{ background: '#FFFFFF', border: '1px solid #D8CFC4' }}>
                <p className="font-mono text-[14px] font-semibold mb-1" style={{ color: '#1A1512' }}>{item.title}</p>
                <p className="mb-2" style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: '#4A3F35' }}>{item.desc}</p>
                <span className="font-mono text-[11px]" style={{ color: '#B8860B' }}>{t('open')} →</span>
              </Link>
            ))}
          </div>
        </section>

        <CTA locale={locale} variant="banner" />
      </div>
    </>
  )
}
