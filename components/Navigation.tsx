import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

export default function Navigation({ locale }: { locale: Locale }) {
  const base = `/${locale}`
  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={base} className="font-bold text-xl text-brand-700 no-underline">
          slitter.ai
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href={`${base}/wiki/slitter-knife`} className="hover:text-brand-700 no-underline">Knowledge Base</Link>
          <Link href={`${base}/guide`} className="hover:text-brand-700 no-underline">Guides</Link>
          <Link href={`${base}/tools/clearance-calculator`} className="hover:text-brand-700 no-underline">Tools</Link>
          <Link href={`${base}/about`} className="hover:text-brand-700 no-underline">About</Link>
          <Link
            href="https://slitterline.com"
            target="_blank"
            rel="noopener"
            className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 no-underline transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </nav>
    </header>
  )
}
