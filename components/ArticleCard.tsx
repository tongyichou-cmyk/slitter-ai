import Link from 'next/link'
import type { PageEntry } from '@/lib/content/registry'

export default function ArticleCard({ page, href, dateLabel }: { page: PageEntry; href: string; dateLabel: string }) {
  return (
    <Link href={href} className="block p-6 border border-gray-200 rounded-xl hover:border-brand-500 hover:shadow-sm transition-all group">
      <h2 className="font-semibold text-lg text-gray-900 group-hover:text-brand-700 transition-colors">{page.title}</h2>
      <p className="mt-2 text-gray-600 text-sm line-clamp-2">{page.description}</p>
      <p className="mt-3 text-xs text-gray-400">
        {dateLabel} <time dateTime={page.updatedAt}>{page.updatedAt}</time>
      </p>
    </Link>
  )
}
