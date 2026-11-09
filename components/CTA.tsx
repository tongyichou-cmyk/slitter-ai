import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'
import { officialLink } from '@/data/site'

interface CTAProps {
  locale: Locale
  variant?: 'banner' | 'inline'
  heading?: string
  subheading?: string
}

export default async function CTA({ locale, variant = 'banner', heading, subheading }: CTAProps) {
  const t = await getTranslations({ locale, namespace: 'cta' })
  const title = heading ?? t('heading')
  const text = subheading ?? t('subheading')
  const href = officialLink(locale, 'inquiry')

  if (variant === 'inline') {
    return (
      <div style={{ margin: '32px 0', padding: '16px 20px', borderLeft: '4px solid #B8860B', background: '#0F0D0B', borderRadius: '0 6px 6px 0' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#B8860B', fontSize: '14px' }}>{title}</p>
        <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: '14px', color: '#8A7A6E', marginTop: '4px' }}>{text}</p>
        <Link
          href={href}
          target="_blank"
          rel="noopener"
          className="inline-block transition-colors hover:bg-[#D4A010]"
          style={{ marginTop: '12px', padding: '8px 16px', background: '#B8860B', color: '#0F0D0B', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-mono)', borderRadius: '3px', textDecoration: 'none' }}
        >
          {t('button')} →
        </Link>
      </div>
    )
  }

  return (
    <section style={{ margin: '48px 0', background: '#0F0D0B', borderLeft: '4px solid #B8860B', borderRadius: '0 6px 6px 0', padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
      <div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: '#6A5A48', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          {t('eyebrow')}
        </p>
        <h2 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '22px', fontWeight: 600, color: '#F5EDD8', marginBottom: '8px' }}>{title}</h2>
        <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: '15px', color: '#8A7A6E', maxWidth: '480px' }}>{text}</p>
      </div>
      <Link
        href={href}
        target="_blank"
        rel="noopener"
        className="transition-colors hover:bg-[#D4A010]"
        style={{ background: '#B8860B', color: '#0F0D0B', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, padding: '12px 24px', borderRadius: '3px', textDecoration: 'none', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}
      >
        {t('button')} →
      </Link>
    </section>
  )
}
