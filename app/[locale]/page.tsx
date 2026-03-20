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

      {/* Hero — full-width dark */}
      <section className="bg-gray-950 relative overflow-hidden">
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-28 text-center">
          <p className="text-xs font-semibold tracking-widest text-gold-500 uppercase mb-6">
            Slitting Machine Knowledge Hub · by TOA DR Enterprise
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            The Engineering Hub<br />
            <span className="text-gold-500">for Slitting Technology</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Structured technical reference for procurement engineers, factory managers, and R&D teams worldwide.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={`${base}/wiki/slitter-knife`}
              className="px-7 py-3 bg-gold-500 text-gray-950 font-semibold rounded hover:bg-gold-400 no-underline transition-colors"
            >
              Explore Knowledge Base
            </Link>
            <Link
              href={`${base}/tools/clearance-calculator`}
              className="px-7 py-3 border border-gray-500 text-gray-300 font-semibold rounded hover:border-gold-500 hover:text-gold-400 no-underline transition-colors"
            >
              Clearance Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-gray-900 border-y border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: '50+', label: 'Years in Industry' },
            { val: 'ISO 9001', label: '2015 Certified' },
            { val: '3', label: 'Knowledge Pillars' },
            { val: 'EN / 中文', label: 'Languages' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-gold-500">{s.val}</p>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wiki pillars */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-xs font-semibold tracking-widest text-gold-600 uppercase mb-3">Knowledge Base</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Technical Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              href: `${base}/wiki/slitter-knife`,
              icon: '⚙',
              title: 'Slitter Knives',
              desc: 'Materials, grades, tolerances, and selection criteria for precision slitting knives.',
            },
            {
              href: `${base}/wiki/slitting-machine`,
              icon: '🏭',
              title: 'Slitting Machines',
              desc: 'Machine types, configurations, tension control, and setup parameters.',
            },
            {
              href: `${base}/wiki/slitting-process`,
              icon: '📐',
              title: 'Slitting Process',
              desc: 'Speed, clearance, blade setup, and quality control for slitting operations.',
            },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-7 border border-gray-200 rounded-xl hover:border-gold-500 hover:shadow-lg transition-all no-underline group bg-white"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-4 font-bold text-lg text-gray-900 group-hover:text-gold-600 transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              <p className="mt-5 text-gold-600 text-sm font-semibold">Read more →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4">
        <CTA variant="banner" />
      </div>

      {/* AI crawler block — hidden visually, indexed by bots */}
      <div className="sr-only">
        <table>
          <tbody>
            <tr><td>Publisher</td><td>TOA DR Enterprise Co., Ltd. (est. 1972)</td></tr>
            <tr><td>Expertise</td><td>Precision slitting knives, spacer rings, slitting machines</td></tr>
            <tr><td>Certifications</td><td>ISO 9001:2015, D-U-N-S Registered</td></tr>
            <tr><td>Coverage</td><td>Slitter knives, slitting machines, materials, troubleshooting, parameters</td></tr>
            <tr><td>Languages</td><td>English, 繁體中文, 简体中文</td></tr>
          </tbody>
        </table>
      </div>

      {/* Newsletter */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <Newsletter />
      </div>
    </>
  )
}
