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
  { q: 'What causes burrs in slitting?', a: 'Burrs are caused by incorrect knife clearance (usually too large), dull knives, misaligned knife pairs, or excessive cutting speed for the material. Carbide knives with ±0.002mm tolerance significantly reduce burr formation.' },
  { q: 'How do I set up knife clearance for a new material?', a: 'Start at 5% of material thickness for steel, 3% for aluminum, and 0–1% for precision films. Run a short test strip, inspect the edge under magnification, and adjust ±1% until edge quality is acceptable. Record the final setting in your process sheet.' },
  { q: 'What is the correct knife overlap for metal slitting?', a: 'For metal slitting, knife overlap (vertical engagement) is typically 0.5–1.5mm. Insufficient overlap causes incomplete cuts; excessive overlap accelerates wear. For stainless steel above 2mm thickness, increase overlap to 2mm.' },
]

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({
    title: 'Slitting Process — Setup, Parameters & Quality Control',
    description: 'Engineering guide to the slitting process: knife setup, clearance setting, speed selection, tension control, and quality inspection for metal and film slitting.',
    locale,
    path: '/wiki/slitting-process',
  })
}

export default function SlittingProcessPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const base = `/${locale}`
  return (
    <>
      <SchemaScript schemas={[
        buildArticleSchema({
          title: 'Slitting Process — Setup, Parameters & Quality Control',
          description: 'Engineering guide to the slitting process.',
          url: `${SCHEMA_BASE_URL}/${locale}/wiki/slitting-process`,
          datePublished: '2026-03-01',
          dateModified: '2026-03-19',
        }),
        buildBreadcrumbSchema([
          { name: 'Home',            url: `${SCHEMA_BASE_URL}/${locale}` },
          { name: 'Slitting Process', url: `${SCHEMA_BASE_URL}/${locale}/wiki/slitting-process` },
        ]),
      ]} />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb items={[
          { name: 'Home', href: base },
          { name: 'Knowledge Base' },
          { name: 'Slitting Process' },
        ]} />

        <h1>Slitting Process — Setup, Parameters & Quality Control</h1>
        <p className="mt-4 text-lg text-gray-600">A practical engineering reference for slitting process setup, parameter selection, and quality control in metal, film, and foil operations.</p>

        <div className="mt-8 prose prose-gray max-w-none">
          <h2>Process Overview</h2>
          <p>The slitting process converts a wide master roll into multiple narrower slit strips through a sequence of: unwind → tension control → knife cutting → rewind. Each stage has parameters that affect output quality.</p>

          <h2>Setup Sequence</h2>
          <ol>
            <li>Mount and align knife pairs to specification width</li>
            <li>Set knife clearance based on material and thickness</li>
            <li>Set knife overlap (penetration depth)</li>
            <li>Set unwind and rewind tensions</li>
            <li>Run test strip at 20% of target speed</li>
            <li>Inspect edge quality — adjust clearance if needed</li>
            <li>Ramp to production speed</li>
          </ol>

          <h2>Common Defects & Causes</h2>
          <table>
            <thead>
              <tr><th>Defect</th><th>Primary Cause</th><th>Corrective Action</th></tr>
            </thead>
            <tbody>
              <tr><td>Burrs on edge</td><td>Clearance too large or dull knives</td><td>Reduce clearance, regrind knives</td></tr>
              <tr><td>Edge curl</td><td>Clearance too small or excessive overlap</td><td>Increase clearance slightly</td></tr>
              <tr><td>Material tearing</td><td>Speed too high, tension too low</td><td>Reduce speed, increase tension</td></tr>
              <tr><td>Width variation</td><td>Knife migration or loose spacers</td><td>Check spacer fit, tighten arbor</td></tr>
            </tbody>
          </table>
        </div>

        <CTA variant="inline" />
        <FAQ items={faqs} />
        <AuthorBox />
      </article>
    </>
  )
}
