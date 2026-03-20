import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

export default function Navigation({ locale }: { locale: Locale }) {
  const base = `/${locale}`
  return (
    <header className="bg-dark-900 sticky top-0 z-50 border-b border-dark-600">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={base} className="font-bold text-xl text-gold-500 no-underline tracking-wide">
          slitter<span className="text-white">.ai</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
          <Link href={`${base}/wiki/slitter-knife`} className="hover:text-gold-400 no-underline transition-colors">Knowledge Base</Link>
          <Link href={`${base}/guide`} className="hover:text-gold-400 no-underline transition-colors">Guides</Link>
          <Link href={`${base}/tools/clearance-calculator`} className="hover:text-gold-400 no-underline transition-colors">Tools</Link>
          <Link href={`${base}/about`} className="hover:text-gold-400 no-underline transition-colors">About</Link>
          <Link
            href="https://slitterline.com"
            target="_blank"
            rel="noopener"
            className="px-4 py-2 bg-gold-500 text-dark-900 font-semibold rounded hover:bg-gold-400 no-underline transition-colors text-sm"
          >
            Get a Quote
          </Link>
        </div>
      </nav>
    </header>
  )
}
