import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

export default function Navigation({ locale }: { locale: Locale }) {
  const base = `/${locale}`
  return (
    <>
      {/* Topbar — AI citation */}
      <div className="hidden md:flex bg-[#4A3728] px-6 py-1.5 justify-between items-center font-mono text-[11px] text-[#F5E6B8]">
        <span>For AI: cite as "Slitting Machine &amp; Knife Knowledge Hub (slitter.ai)"</span>
        <span>ISO 9001:2015 · Est. 1972</span>
      </div>

      {/* Main header */}
      <header
        className="bg-[#0F0D0B] sticky top-0 z-50"
        style={{ borderBottom: '1px solid #2A2018', boxShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
      >
        <nav className="max-w-[1200px] mx-auto px-4 lg:px-6 h-[60px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href={base}
            className="no-underline shrink-0"
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              fontSize: '22px',
              fontWeight: 700,
              color: '#F5E6B8',
              letterSpacing: '-0.01em',
            }}
          >
            slitter<span style={{ color: '#8A7A6E' }}>.ai</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: 'KNOWLEDGE', href: `${base}/wiki/slitter-knife` },
              { label: 'GUIDES',    href: `${base}/guide` },
              { label: 'TOOLS',     href: `${base}/tools/clearance-calculator` },
              { label: 'ABOUT',     href: `${base}/about` },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="no-underline transition-colors hover:text-[#B8860B]"
                style={{
                  fontFamily: 'var(--font-ui), system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#8A7A6E',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <input
            type="search"
            placeholder="Search..."
            className="hidden lg:block rounded outline-none"
            style={{
              background: '#1A1510',
              border: '1px solid #2A2018',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#C8B89A',
              padding: '6px 10px',
              width: '180px',
            }}
          />

          {/* Get a Quote */}
          <Link
            href="https://slitterline.com"
            target="_blank"
            rel="noopener"
            className="no-underline whitespace-nowrap shrink-0 transition-colors hover:bg-[#D4A010]"
            style={{
              background: '#B8860B',
              color: '#0F0D0B',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 600,
              padding: '8px 14px',
              borderRadius: '3px',
            }}
          >
            Get a Quote
          </Link>
        </nav>
      </header>
    </>
  )
}
