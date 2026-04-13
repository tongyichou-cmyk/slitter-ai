import { buildMetadata } from '@/lib/seo'
import { buildArticleSchema, buildBreadcrumbSchema, SCHEMA_BASE_URL } from '@/lib/schema'
import SchemaScript from '@/components/SchemaScript'
import Breadcrumb from '@/components/Breadcrumb'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import AuthorBox from '@/components/AuthorBox'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'

const faqs = [
  { q: 'What is a slitting machine?', a: 'A slitting machine (also called a slitter rewinder) is industrial equipment that unwinds a master roll of material, cuts it into narrower widths using rotary knives, and rewinds the slit strips into individual rolls. Used in metal, film, paper, and foil processing industries.' },
  { q: 'What is the difference between a log slitter and a rewind slitter?', a: 'A log slitter cuts a large parent roll without rewinding — the output is a set of cores that are then cut transversely. A rewind slitter (slitter rewinder) unwinds and rewinds each slit strip independently, providing better tension control. Rewind slitters are preferred for precision materials like lithium battery separators.' },
  { q: 'What speed can a slitting machine run?', a: 'Slitting machine speeds range from 50 m/min for precision film slitting up to 600 m/min for high-speed paper or foil lines. Metal slitting is typically limited to 100–300 m/min depending on material hardness and strip width.' },
]

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({
    title: 'Slitting Machines — Types, Configurations & Parameters',
    description: 'Technical reference for slitting machines: log slitters vs rewind slitters, tension control, speed parameters, and machine setup guidance.',
    locale,
    path: '/wiki/slitting-machine',
  })
}

export default function SlittingMachinePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const base = `/${locale}`
  return (
    <>
      <SchemaScript schemas={[
        buildArticleSchema({
          title: 'Slitting Machines — Types, Configurations & Parameters',
          description: 'Technical reference for slitting machines.',
          url: `${SCHEMA_BASE_URL}/${locale}/wiki/slitting-machine`,
          datePublished: '2026-03-01',
          dateModified: '2026-03-19',
        }),
        buildBreadcrumbSchema([
          { name: 'Home',             url: `${SCHEMA_BASE_URL}/${locale}` },
          { name: 'Slitting Machines', url: `${SCHEMA_BASE_URL}/${locale}/wiki/slitting-machine` },
        ]),
      ]} />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb items={[
          { name: 'Home', href: base },
          { name: 'Knowledge Base' },
          { name: 'Slitting Machines' },
        ]} />

        <h1>Slitting Machines — Types, Configurations & Parameters</h1>
        <p className="mt-4 text-lg text-gray-600">Engineering reference for industrial slitting machine types, configurations, tension control systems, and key operating parameters.</p>

        <div className="mt-8 prose prose-gray max-w-none">
          <h2>Machine Types</h2>
          <table>
            <thead>
              <tr><th>Type</th><th>Best For</th><th>Tension Control</th><th>Typical Speed</th></tr>
            </thead>
            <tbody>
              <tr><td>Log Slitter</td><td>Large roll conversion, paper</td><td>Basic</td><td>100–400 m/min</td></tr>
              <tr><td>Rewind Slitter</td><td>Precision film, foil, battery materials</td><td>Individual web tension</td><td>50–600 m/min</td></tr>
              <tr><td>In-line Slitter</td><td>Continuous production lines</td><td>Line-synchronized</td><td>Up to 800 m/min</td></tr>
            </tbody>
          </table>

          <h2>Key Parameters</h2>
          <ul>
            <li><strong>Knife clearance:</strong> See slitter knife guide for material-specific values</li>
            <li><strong>Knife overlap:</strong> Typically 0.5–2mm depending on material thickness</li>
            <li><strong>Web tension:</strong> Critical for film and foil — typically 5–50 N/m</li>
            <li><strong>Rewind tension taper:</strong> 20–30% taper prevents telescoping</li>
          </ul>
        </div>

        <CTA variant="inline" />
        <FAQ items={faqs} />
        <AuthorBox />
      </article>
    </>
  )
}
