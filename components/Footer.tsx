import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'
import { registry } from '@/lib/content/registry'
import { officialLink } from '@/data/site'

const headingStyle = { fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, color: '#6A5A48', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' } as const
const linkStyle = { fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#8A7A6E', textDecoration: 'none' } as const

function LinkList({ items }: { items: { label: string; href: string; external?: boolean }[] }) {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map(item => (
        <li key={item.href}>
          <Link
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener' : undefined}
            className="transition-colors hover:text-[#F5E6B8]"
            style={linkStyle}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'footer' })
  const base = `/${locale}`

  const knowledgeLinks = [
    ...registry.listPages(locale).filter(p => p.section === 'wiki').slice(0, 4).map(p => ({ label: p.title.split(/[:：]/)[0], href: `${base}${p.path}` })),
    { label: t('allArticles'), href: `${base}/wiki` },
  ]
  const resourceLinks = [
    { label: t('allGuides'), href: `${base}/guide` },
    { label: t('calculator'), href: `${base}/tools/clearance-calculator` },
    { label: t('clearanceData'), href: `${base}/data/slitting-clearance` },
  ]
  const companyLinks = [
    { label: t('about'), href: `${base}/about` },
    { label: t('contact'), href: `${base}/contact` },
    { label: `${t('officialSite')} ↗`, href: officialLink(locale, 'home'), external: true },
  ]

  return (
    <footer style={{ background: '#0F0D0B', borderTop: '3px solid #B8860B', marginTop: '64px', padding: '48px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#F5E6B8', marginBottom: '8px', letterSpacing: '-0.01em' }}>
            slitter<span style={{ color: '#8A7A6E' }}>.ai</span>
          </p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#8A7A6E', maxWidth: '220px', lineHeight: 1.6, marginBottom: '12px' }}>
            {t('tagline')}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4A3A28' }}>
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
        <div>
          <p style={headingStyle}>{t('knowledge')}</p>
          <LinkList items={knowledgeLinks} />
        </div>
        <div>
          <p style={headingStyle}>{t('resources')}</p>
          <LinkList items={resourceLinks} />
        </div>
        <div>
          <p style={headingStyle}>{t('company')}</p>
          <LinkList items={companyLinks} />
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '20px 24px 0', borderTop: '1px solid #2A2018' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4A3A28' }}>{t('certifications')}</p>
      </div>
    </footer>
  )
}
