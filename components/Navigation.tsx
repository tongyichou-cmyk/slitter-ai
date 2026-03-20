import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

export default function Navigation({ locale }: { locale: Locale }) {
  const base = `/${locale}`
  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#080808] border-b border-[#242424] px-6 py-1.5 flex justify-between items-center font-mono text-[11px] text-[#555555]">
        <span>Slitting Machine Knowledge Hub · by TOA DR Enterprise</span>
        <span>ISO 9001:2015 Certified</span>
      </div>

      {/* Main header */}
      <header className="bg-[#080808] border-b-2 border-[#F5C400] sticky top-0 z-50 h-14 flex items-center">
        <nav className="max-w-[1200px] mx-auto px-6 w-full flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            href={base}
            className="font-mono text-xl font-semibold text-[#F5C400] no-underline tracking-tight"
          >
            slitter<span className="text-[#999999]">.ai</span>
          </Link>

          {/* Nav links + search + CTA */}
          <div className="flex items-center gap-6">
            {[
              { label: 'KNOWLEDGE BASE', href: `${base}/wiki/slitter-knife` },
              { label: 'GUIDES', href: `${base}/guide` },
              { label: 'TOOLS', href: `${base}/tools/clearance-calculator` },
              { label: 'ABOUT', href: `${base}/about` },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[12px] font-medium text-[#999999] no-underline tracking-widest uppercase hover:text-[#F5C400] transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* Search box */}
            <input
              type="search"
              placeholder="Search knowledge base..."
              className="bg-[#141414] border border-[#2E2E2E] rounded px-2.5 py-1.5 text-[12px] font-mono text-[#E8E8E8] w-[220px] outline-none placeholder:text-[#555555]"
            />

            {/* Get a Quote */}
            <Link
              href="https://slitterline.com"
              target="_blank"
              rel="noopener"
              className="bg-[#F5C400] text-[#080808] font-mono text-[12px] font-semibold px-4 py-2 rounded-[3px] no-underline tracking-wider whitespace-nowrap hover:bg-[#D4A800] transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}
