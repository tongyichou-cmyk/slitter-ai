import Link from 'next/link'
import type { Article } from '@/lib/data'

export default function ArticleCard({ article, href }: { article: Article; href: string }) {
  return (
    <Link href={href} className="block p-6 border border-gray-200 rounded-xl hover:border-brand-500 hover:shadow-sm transition-all group">
      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-700 transition-colors">
        {article.title}
      </h3>
      <p className="mt-2 text-gray-600 text-sm line-clamp-2">{article.description}</p>
      <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
        <time dateTime={article.publishedAt}>
          {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
        {article.tags?.slice(0, 2).map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded-full">{tag}</span>
        ))}
      </div>
    </Link>
  )
}
