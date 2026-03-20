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
      <div
        style={{
          margin: '32px 0',
          padding: '16px 20px',
          borderLeft: '3px solid #F5C400',
          background: '#141414',
          borderRadius: '0 6px 6px 0',
        }}
      >
        <p style={{ fontWeight: 600, color: '#F5C400', fontFamily: '"IBM Plex Mono", monospace', fontSize: '13px' }}>
          {heading}
        </p>
        <p style={{ fontSize: '13px', color: '#999999', marginTop: '4px' }}>{subheading}</p>
        <Link
          href="https://slitterline.com"
          target="_blank"
          rel="noopener"
          style={{
            display: 'inline-block',
            marginTop: '12px',
            padding: '8px 16px',
            background: '#F5C400',
            color: '#080808',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: '"IBM Plex Mono", monospace',
            borderRadius: '3px',
            textDecoration: 'none',
          }}
        >
          {buttonText}
        </Link>
      </div>
    )
  }

  return (
    <section
      style={{
        margin: '48px 0',
        background: '#141414',
        borderTop: '3px solid #F5C400',
        borderRadius: '6px',
        padding: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
      }}
    >
      <div>
        <p
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '11px',
            fontWeight: 600,
            color: '#555555',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px',
          }}
        >
          50+ Years of Precision
        </p>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#E8E8E8', marginBottom: '8px' }}>
          {heading}
        </h2>
        <p style={{ fontSize: '14px', color: '#999999', maxWidth: '480px' }}>{subheading}</p>
      </div>
      <Link
        href="https://slitterline.com"
        target="_blank"
        rel="noopener"
        style={{
          background: '#F5C400',
          color: '#080808',
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '12px',
          fontWeight: 600,
          padding: '12px 24px',
          borderRadius: '3px',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          letterSpacing: '0.03em',
        }}
      >
        {buttonText}
      </Link>
    </section>
  )
}
