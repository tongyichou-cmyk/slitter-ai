import Link from 'next/link'
import SchemaScript from './SchemaScript'
import { buildBreadcrumbSchema } from '@/lib/schema'

interface BreadcrumbItem {
  name: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = items.map(item => ({
    name: item.name,
    url: item.href ? `https://slitter.ai${item.href}` : 'https://slitter.ai',
  }))

  return (
    <>
      <SchemaScript schemas={[buildBreadcrumbSchema(schemaItems)]} />
      <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex flex-wrap gap-1 text-sm text-gray-500">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span>/</span>}
              {item.href && i < items.length - 1 ? (
                <Link href={item.href} className="hover:text-brand-600 transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className={i === items.length - 1 ? 'text-gray-900 font-medium' : ''}>
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
