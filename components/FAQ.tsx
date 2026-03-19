import SchemaScript from './SchemaScript'
import { buildFAQSchema } from '@/lib/schema'

interface FAQItem {
  q: string
  a: string
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  if (!items || items.length === 0) return null
  return (
    <>
      <SchemaScript schemas={[buildFAQSchema(items)]} />
      <section className="my-10">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {items.map((item, i) => (
            <details key={i} className="group border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                {item.q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
