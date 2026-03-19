import type { SchemaObject } from '@/lib/schema'

export default function SchemaScript({ schemas }: { schemas: SchemaObject[] }) {
  const json = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)
    .replace(/</g, '\\u003c')
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
