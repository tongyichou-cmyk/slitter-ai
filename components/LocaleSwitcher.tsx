'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const LOCALES = [
  { code: 'en',    label: 'EN' },
  { code: 'zh-TW', label: '繁中' },
  { code: 'zh-CN', label: '简中' },
] as const

export default function LocaleSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname()

  function buildHref(targetLocale: string) {
    // pathname is like /en/wiki/slitter-knife → replace first segment with targetLocale
    const segments = pathname.split('/')
    segments[1] = targetLocale
    return segments.join('/')
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {LOCALES.map(({ code, label }, i) => (
        <span key={code} style={{ display: 'flex', alignItems: 'center' }}>
          {i > 0 && (
            <span style={{ color: '#3A2E22', marginRight: '2px', fontSize: '11px' }}>·</span>
          )}
          {code === locale ? (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              color: '#B8860B',
              letterSpacing: '0.05em',
            }}>
              {label}
            </span>
          ) : (
            <Link
              href={buildHref(code)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 400,
                color: '#6A5A48',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.15s',
              }}
              className="hover:text-[#B8860B]"
            >
              {label}
            </Link>
          )}
        </span>
      ))}
    </div>
  )
}
