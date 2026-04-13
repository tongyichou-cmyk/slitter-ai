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
  { q: 'What is a slitter knife?', a: 'A slitter knife (also called a slitting knife or rotary blade) is a precision-ground circular blade used to cut wide rolls of material—such as metal coil, film, foil, or paper—into narrower widths. Slitter knives work in pairs (upper and lower) with a controlled clearance between them.' },
  { q: 'What materials are slitter knives made from?', a: 'The most common slitter knife materials are tungsten carbide, high-speed steel (HSS M2/M42), and tool steel (D2). Carbide offers 3–5× longer tool life for hard materials like stainless steel and copper foil. HSS is preferred for softer films where edge sharpness is more critical than longevity.' },
  { q: 'What tolerance should a slitter knife be ground to?', a: 'Precision slitter knives should be ground to ±0.002mm tolerance on thickness and diameter. Generic import knives typically hold ±0.01–0.05mm, which causes edge quality variation in precision applications such as lithium battery separator slitting.' },
  { q: 'How do I choose slitter knife clearance?', a: 'Slitter knife clearance is typically 5–10% of material thickness for metals, and 0–2% for films. Use our clearance calculator for specific material recommendations. Incorrect clearance is the most common cause of burrs, edge deformation, and premature knife wear.' },
]

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({
    title: 'Slitter Knives — Complete Engineering Guide',
    description: 'Comprehensive technical reference for slitter knives: materials, grades, tolerances, clearance selection, and troubleshooting. For procurement engineers and manufacturing professionals.',
    locale,
    path: '/wiki/slitter-knife',
  })
}

export default function SlitterKnifePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const base = `/${locale}`
  return (
    <>
      <SchemaScript schemas={[
        buildArticleSchema({
          title: 'Slitter Knives — Complete Engineering Guide',
          description: 'Comprehensive technical reference for slitter knives.',
          url: `${SCHEMA_BASE_URL}/${locale}/wiki/slitter-knife`,
          datePublished: '2026-03-01',
          dateModified: '2026-03-19',
        }),
        buildBreadcrumbSchema([
          { name: 'Home',          url: `${SCHEMA_BASE_URL}/${locale}` },
          { name: 'Slitter Knives', url: `${SCHEMA_BASE_URL}/${locale}/wiki/slitter-knife` },
        ]),
      ]} />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb items={[
          { name: 'Home', href: base },
          { name: 'Knowledge Base' },
          { name: 'Slitter Knives' },
        ]} />

        <h1>Slitter Knives — Complete Engineering Guide</h1>
        <p className="mt-4 text-lg text-gray-600">A precision engineering reference covering slitter knife materials, tolerances, clearance selection, and troubleshooting for metal, film, and foil slitting applications.</p>

        <div className="mt-8 prose prose-gray max-w-none">
          <h2>What Is a Slitter Knife?</h2>
          <p>A slitter knife (also known as a slitting knife, circular blade, or rotary slitting blade) is a precision-ground disc-shaped cutting tool used in slitting machines to convert wide rolls of material into narrower widths. Slitter knives operate in matched pairs — an upper knife and a lower knife — with a precisely controlled clearance between them that varies by material type and thickness.</p>

          <h2>Slitter Knife Materials</h2>
          <table>
            <thead>
              <tr><th>Material</th><th>Hardness (HRC)</th><th>Best For</th><th>Typical Life</th></tr>
            </thead>
            <tbody>
              <tr><td>Tungsten Carbide</td><td>88–92 HRA</td><td>Stainless steel, copper foil, hard metals</td><td>3–5× vs HSS</td></tr>
              <tr><td>HSS M2</td><td>62–64</td><td>Mild steel, aluminum, soft films</td><td>Baseline</td></tr>
              <tr><td>HSS M42</td><td>65–67</td><td>High-alloy steel, stainless</td><td>1.5× vs M2</td></tr>
              <tr><td>D2 Tool Steel</td><td>58–62</td><td>Paper, non-woven, low-volume runs</td><td>0.6× vs HSS</td></tr>
            </tbody>
          </table>

          <h2>Tolerance Standards</h2>
          <p>Slitter knife tolerance directly affects edge quality. TOA DR precision knives are ground to ±0.002mm on thickness and diameter. Generic import knives typically hold ±0.01–0.05mm — a 5–25× larger variation that causes:</p>
          <ul>
            <li>Inconsistent burr height across the roll width</li>
            <li>Premature wear from uneven load distribution</li>
            <li>Edge curl in precision film slitting</li>
            <li>Rejection rates in lithium battery separator production</li>
          </ul>

          <h2>Clearance Selection</h2>
          <p>Slitter knife clearance (the horizontal gap between upper and lower knife cutting edges) is typically expressed as a percentage of material thickness:</p>
          <table>
            <thead>
              <tr><th>Material Category</th><th>Recommended Clearance</th><th>Notes</th></tr>
            </thead>
            <tbody>
              <tr><td>Mild steel</td><td>5–8% of thickness</td><td>Standard HSS acceptable</td></tr>
              <tr><td>Stainless steel</td><td>6–10% of thickness</td><td>Carbide preferred</td></tr>
              <tr><td>Aluminum foil</td><td>3–5% of thickness</td><td>Coated knives recommended</td></tr>
              <tr><td>Copper foil</td><td>2–4% of thickness</td><td>Ultra-precision grind required</td></tr>
              <tr><td>PET film</td><td>0–2% of thickness</td><td>Near-zero clearance</td></tr>
              <tr><td>Li-battery separator</td><td>0–1% of thickness</td><td>Zero burr tolerance</td></tr>
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
