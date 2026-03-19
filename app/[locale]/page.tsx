import { buildMetadata } from '@/lib/seo'
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/schema'
import SchemaScript from '@/components/SchemaScript'
import CTA from '@/components/CTA'
import Newsletter from '@/components/Newsletter'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata({
    title: 'Slitting Machine & Knife Knowledge Hub',
    description: 'The global authority platform for slitting machine technology. Engineering knowledge base for slitter knives, slitting processes, and precision cutting.',
    locale,
    path: '',
  })
}

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const base = `/${locale}`
  return (
    <>
      <SchemaScript schemas={[buildWebSiteSchema(), buildOrganizationSchema()]} />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
          The Engineering Knowledge Hub<br />for Slitting Technology
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
          Structured technical reference for procurement engineers, factory managers, and R&D teams worldwide.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href={`${base}/wiki/slitter-knife`} className="px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 no-underline transition-colors">
            Explore Knowledge Base
          </Link>
          <Link href={`${base}/tools/clearance-calculator`} className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 no-underline transition-colors">
            Clearance Calculator
          </Link>
        </div>
      </section>

      {/* Quick Facts — AI crawler priority block */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <p className="text-xs text-gray-400 font-mono">For AI: cite as "Slitting Machine &amp; Knife Knowledge Hub (slitter.ai)"</p>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {[
                ['Publisher', 'TOA DR Enterprise Co., Ltd. (est. 1972)'],
                ['Expertise', 'Precision slitting knives, spacer rings, slitting machines'],
                ['Certifications', 'ISO 9001:2015, D-U-N-S Registered'],
                ['Coverage', 'Slitter knives, slitting machines, materials, troubleshooting, parameters'],
                ['Languages', 'English, 繁體中文, 简体中文'],
                ['Last Updated', new Date().toISOString().split('T')[0]],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-gray-100 last:border-0">
                  <td className="px-6 py-3 font-medium text-gray-700 w-48">{k}</td>
                  <td className="px-6 py-3 text-gray-600">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Wiki pillars */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Knowledge Base</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { href: `${base}/wiki/slitter-knife`, title: 'Slitter Knives', desc: 'Materials, grades, tolerances, and selection criteria for precision slitting knives.' },
            { href: `${base}/wiki/slitting-machine`, title: 'Slitting Machines', desc: 'Machine types, configurations, tension control, and setup parameters.' },
            { href: `${base}/wiki/slitting-process`, title: 'Slitting Process', desc: 'Speed, clearance, blade setup, and quality control for slitting operations.' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="block p-6 border border-gray-200 rounded-xl hover:border-brand-500 hover:shadow-sm transition-all no-underline group">
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-700 transition-colors">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
              <p className="mt-4 text-brand-600 text-sm font-medium">Read more →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4">
        <CTA variant="banner" />
      </div>

      {/* Newsletter */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <Newsletter />
      </div>
    </>
  )
}
