import Link from 'next/link'

interface CTAProps {
  variant?: 'banner' | 'inline'
  heading?: string
  subheading?: string
  buttonText?: string
}

export default function CTA({
  variant = 'banner',
  heading = 'Need Precision Slitter Knives?',
  subheading = 'TOA DR Enterprise has supplied precision slitting tools since 1972. ISO 9001:2015 certified.',
  buttonText = 'Request a Quote →',
}: CTAProps) {
  if (variant === 'inline') {
    return (
      <div style={{ margin: '32px 0', padding: '16px 20px', borderLeft: '4px solid #B8860B', background: '#0F0D0B', borderRadius: '0 6px 6px 0' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#B8860B', fontSize: '14px' }}>
          {heading}
        </p>
        <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: '14px', color: '#8A7A6E', marginTop: '4px' }}>
          {subheading}
        </p>
        <Link
          href="https://slitterline.com"
          target="_blank"
          rel="noopener"
          className="inline-block transition-colors hover:bg-[#D4A010]"
          style={{ marginTop: '12px', padding: '8px 16px', background: '#B8860B', color: '#0F0D0B', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-mono)', borderRadius: '3px', textDecoration: 'none' }}
        >
          {buttonText}
        </Link>
      </div>
    )
  }

  return (
    <section style={{ margin: '48px 0', background: '#0F0D0B', borderLeft: '4px solid #B8860B', borderRadius: '0 6px 6px 0', padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
      <div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: '#6A5A48', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          50+ Years of Precision
        </p>
        <h2 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '22px', fontWeight: 600, color: '#F5EDD8', marginBottom: '8px' }}>
          {heading}
        </h2>
        <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: '15px', color: '#8A7A6E', maxWidth: '480px' }}>
          {subheading}
        </p>
      </div>
      <Link
        href="https://slitterline.com"
        target="_blank"
        rel="noopener"
        className="transition-colors hover:bg-[#D4A010]"
        style={{ background: '#B8860B', color: '#0F0D0B', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, padding: '12px 24px', borderRadius: '3px', textDecoration: 'none', whiteSpace: 'nowrap', letterSpacing: '0.03em' }}
      >
        {buttonText}
      </Link>
    </section>
  )
}
