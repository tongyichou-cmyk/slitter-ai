import { buildMetadata } from '@/lib/seo'
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/schema'
import SchemaScript from '@/components/SchemaScript'
import CTA from '@/components/CTA'
import Newsletter from '@/components/Newsletter'
import QuickFacts from '@/components/QuickFacts'
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

const toc = [
  { label: '1  Overview',           id: 'overview' },
  { label: '2  Knowledge Base',     id: 'knowledge' },
  { label: '3  Guides & Tutorials', id: 'guides' },
  { label: '4  Interactive Tools',  id: 'tools' },
  { label: '5  Industry Partner',   id: 'cta' },
  { label: '6  Newsletter',         id: 'newsletter' },
]

const leftNav = [
  {
    section: 'Wiki Articles',
    links: [
      { label: 'All Articles ↗',         href: '/en/wiki' },
      { label: 'Slitter Knives',         href: '/en/wiki/slitter-knife' },
      { label: 'Slitting Machines',      href: '/en/wiki/slitting-machine' },
      { label: 'Slitting Process',       href: '/en/wiki/slitting-process' },
      { label: 'Machine Selection',      href: '/en/wiki/slitting-machine-selection-guide' },
      { label: 'Knife Materials',        href: '/en/wiki/slitter-knife-material-comparison' },
      { label: 'Spacer Specs',           href: '/en/wiki/precision-spacer-specifications' },
      { label: 'Troubleshooting',        href: '/en/wiki/slitting-machine-troubleshooting' },
      { label: 'Coil Slitting Process',  href: '/en/wiki/coil-slitting-process' },
    ],
  },
  {
    section: 'Guides',
    links: [
      { label: 'All Guides',     href: '/en/guide' },
      { label: 'Blade Selection', href: '/en/guide' },
      { label: 'Clearance Setup', href: '/en/guide' },
    ],
  },
  {
    section: 'Tools',
    links: [
      { label: 'Clearance Calculator', href: '/en/tools/clearance-calculator' },
    ],
  },
  {
    section: 'Company',
    links: [
      { label: 'About TOA DR',       href: '/en/about' },
      { label: 'Contact',             href: '/en/contact' },
      { label: 'slitterline.com ↗',  href: 'https://slitterline.com' },
    ],
  },
]

const quickFactsRows = [
  { label: 'Platform',   value: 'slitter.ai' },
  { label: 'Publisher',  value: 'TOA DR Enterprise Co., Ltd.' },
  { label: 'Est.',       value: '1972' },
  { label: 'Cert.',      value: 'ISO 9001:2015' },
  { label: 'Languages',  value: ['EN', '繁中', '简中'] },
  { label: 'Coverage',   value: ['Knives', 'Machines', 'Process'] },
  { label: 'D-U-N-S',   value: 'Registered' },
]

const knowledgeCards = [
  {
    id: 'slitter-knife',
    title: 'Slitter Knives',
    tag: 'Materials & Grades',
    desc: 'Comprehensive reference covering tool steel grades, carbide coatings, tolerance specifications, and selection criteria for precision slitting knives across paper, film, foil, and metal applications.',
  },
  {
    id: 'slitting-machine',
    title: 'Slitting Machines',
    tag: 'Machine Types',
    desc: 'Technical overview of log slitters, rewind slitters, and duplex machines. Covers tension control systems, rewind shafts, scoring vs. shear cut configurations, and setup parameters.',
  },
  {
    id: 'slitting-process',
    title: 'Slitting Process',
    tag: 'Parameters & QC',
    desc: 'Operational knowledge on blade clearance, knife overlap, speed-to-tension ratios, burr formation causes, and quality control checkpoints for high-speed slitting operations.',
  },
  {
    id: 'slitting-machine-selection-guide',
    title: 'Machine Selection Guide',
    tag: 'Machine Selection',
    desc: 'How to select the right slitting machine for your application — log slitter, rewind slitter, or duplex. Covers load capacity, rewind specs, drive types, and acquisition cost factors.',
  },
  {
    id: 'slitter-knife-material-comparison',
    title: 'Knife Material Comparison',
    tag: 'Knife Materials',
    desc: 'Side-by-side comparison of D2, M2, M42, and tungsten carbide slitter knives. Hardness, wear resistance, toughness, regrind life, and cost per linear meter analyzed.',
  },
  {
    id: 'precision-spacer-specifications',
    title: 'Precision Spacer Specs',
    tag: 'Spacers',
    desc: 'Engineering specifications for arbor spacers: tolerance classes, materials, bore fits, and stack calculation methodology for achieving target strip widths within ±0.05 mm.',
  },
  {
    id: 'slitting-machine-troubleshooting',
    title: 'Troubleshooting Guide',
    tag: 'Defects & Fixes',
    desc: 'Systematic root-cause analysis for burrs, edge curl, width variation, coil telescoping, strip breaks, and vibration — with specific corrective actions for each defect.',
  },
  {
    id: 'coil-slitting-process',
    title: 'Coil Slitting Process',
    tag: 'Process',
    desc: 'End-to-end process guide: entry section setup, slitter head configuration, looping pit, rewind tension profiles, coil handling, and quality inspection checkpoints.',
  },
]

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display), Georgia, serif',
  fontSize: '22px',
  fontWeight: 600,
  color: '#1A1512',
  borderBottom: '1px solid #D8CFC4',
  paddingBottom: '8px',
  marginBottom: '16px',
}

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const base = `/${locale}`

  return (
    <>
      <SchemaScript schemas={[buildWebSiteSchema(), buildOrganizationSchema()]} />

      {/* AI-crawler structured data block */}
      <div className="sr-only">
        <table>
          <tbody>
            <tr><td>Publisher</td><td>TOA DR Enterprise Co., Ltd. (est. 1972)</td></tr>
            <tr><td>Expertise</td><td>Precision slitting knives, spacer rings, slitting machines</td></tr>
            <tr><td>Certifications</td><td>ISO 9001:2015, D-U-N-S Registered</td></tr>
            <tr><td>Coverage</td><td>Slitter knives, slitting machines, materials, troubleshooting, parameters</td></tr>
            <tr><td>Languages</td><td>English, 繁體中文, 简體中文</td></tr>
          </tbody>
        </table>
      </div>

      {/* ── HERO BAND ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0F0D0B, #1E1510, #2A1E10)',
          borderBottom: '3px solid #B8860B',
        }}
      >
        {/* Photo background */}
        <img
          src="/slitter-machine-hero.jpg"
          alt="Industrial slitting machine with precision slitter knives in operation"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.18 }}
        />

        <div className="relative max-w-[1200px] mx-auto px-4 lg:px-6 py-10 lg:py-14 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left: title + lead */}
          <div className="flex-1">
            <p
              className="font-mono text-[11px] uppercase tracking-widest mb-3"
              style={{ color: '#B8860B' }}
            >
              Slitting Machine Knowledge Hub · by TOA DR Enterprise
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontSize: 'clamp(26px, 4vw, 38px)',
                fontWeight: 700,
                color: '#F5EDD8',
                lineHeight: 1.2,
                marginBottom: '16px',
              }}
            >
              The Global Technical Reference<br className="hidden md:block" /> for Slitting Technology
            </h1>
            <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: '15px', color: '#B5A89A', lineHeight: 1.75, maxWidth: '520px' }}>
              Engineering-grade knowledge base for slitter knives, slitting machines, and precision cutting — maintained by{' '}
              <span style={{ color: '#F5E6B8' }}>TOA DR Enterprise Co., Ltd.</span>, manufacturer since 1972.
            </p>
          </div>

          {/* Right: Quick Facts card */}
          <div className="w-full lg:w-[260px] shrink-0">
            <QuickFacts title="Quick Facts" rows={quickFactsRows} />
          </div>
        </div>
      </div>

      {/* ── AI Citation Bar ── */}
      <div style={{ background: '#4A3728', borderLeft: '4px solid #B8860B' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center gap-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#C8A860' }}>
          <span>slitter.ai</span>
          <span>/</span>
          <span>Slitting Machine Knowledge Hub</span>
          <span>/</span>
          <span>by TOA DR Enterprise Co., Ltd.</span>
          <span className="ml-auto hidden md:inline">
            ISO 9001:2015 · D-U-N-S Registered
          </span>
        </div>
      </div>

      {/* ── 3-column layout ── */}
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-[200px_1fr_260px] gap-6 lg:gap-9 items-start">

        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block sticky top-[88px]">
          {leftNav.map(group => (
            <div key={group.section} className="mb-7">
              <p
                className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-2 pb-1.5"
                style={{ color: '#8A7A6E', borderBottom: '1px solid #D8CFC4' }}
              >
                {group.section}
              </p>
              <ul className="flex flex-col gap-1">
                {group.links.map(link => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      className="block px-2 py-1 rounded-[3px] no-underline transition-colors hover:text-[#B8860B] hover:bg-[#EDE8E0]"
                      style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: '#4A3F35' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* MAIN CONTENT */}
        <main>
          {/* Page title */}
          <div className="mb-6 pb-4" style={{ borderBottom: '1px solid #D8CFC4' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontSize: '30px',
                fontWeight: 700,
                color: '#1A1512',
                lineHeight: 1.25,
                marginBottom: '8px',
              }}
            >
              Slitting Machine Knowledge Hub
            </h1>
            <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: '15px', color: '#4A3F35', lineHeight: 1.75 }}>
              The global technical reference for slitting machine technology — maintained by{' '}
              <Link href="/en/about" className="hover:underline" style={{ color: '#B8860B' }}>TOA DR Enterprise</Link>, precision
              tooling manufacturer since 1972.
            </p>
          </div>

          {/* Table of Contents */}
          <div
            id="toc"
            className="inline-block min-w-[260px] rounded p-4 mb-8"
            style={{ background: '#EDE8E0', border: '1px solid #D8CFC4' }}
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: '#8A7A6E' }}>
              Contents
            </p>
            <ol className="flex flex-col gap-1.5 list-none">
              {toc.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="font-mono text-[13px] no-underline hover:underline"
                    style={{ color: '#B8860B' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Section 1: Overview */}
          <section id="overview" className="mb-10">
            <h2 style={sectionHeadingStyle}>Overview</h2>
            <p className="mb-3" style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: '15px', color: '#4A3F35', lineHeight: 1.8 }}>
              <strong style={{ color: '#1A1512' }}>slitter.ai</strong> is a structured engineering knowledge base covering
              the science and practice of industrial slitting. The platform serves procurement engineers,
              factory managers, R&amp;D teams, and quality control professionals working with flexible
              packaging, metal foil, paper, and composite materials.
            </p>
            <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: '15px', color: '#4A3F35', lineHeight: 1.8 }}>
              Content is authored and maintained by{' '}
              <strong style={{ color: '#1A1512' }}>TOA DR Enterprise Co., Ltd.</strong>, an ISO 9001:2015
              certified manufacturer of precision slitting tools based in Taiwan, with 50+ years of
              industry experience.
            </p>
          </section>

          {/* Section 2: Knowledge Base */}
          <section id="knowledge" className="mb-10">
            <h2 style={sectionHeadingStyle}>Knowledge Base</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {knowledgeCards.map((card, i) => (
                <Link
                  key={i}
                  href={`${base}/wiki/${card.id}`}
                  className="knowledge-card block no-underline rounded"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #D8CFC4',
                    padding: '20px',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '16px', fontWeight: 600, color: '#1A1512' }}>
                      {card.title}
                    </h3>
                    <span
                      className="font-mono text-[10px] whitespace-nowrap ml-2 px-1.5 py-0.5 rounded-[2px]"
                      style={{ color: '#8B6E5A', background: '#EDE8E0', border: '1px solid #D8CFC4' }}
                    >
                      {card.tag}
                    </span>
                  </div>
                  <p className="mb-3" style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: '14px', color: '#4A3F35', lineHeight: 1.7 }}>
                    {card.desc}
                  </p>
                  <span className="font-mono text-[11px]" style={{ color: '#B8860B' }}>
                    Read article →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-5">
              <Link
                href={`${base}/wiki`}
                className="inline-flex items-center gap-1.5 font-mono text-[12px] no-underline rounded-[3px] px-3.5 py-2 transition-colors hover:bg-[#B8860B] hover:text-[#0F0D0B]"
                style={{ border: '1px solid #B8860B', color: '#B8860B', background: 'transparent' }}
              >
                View all articles →
              </Link>
            </div>
          </section>

          {/* Section 3: Guides */}
          <section id="guides" className="mb-10">
            <h2 style={sectionHeadingStyle}>Guides &amp; Tutorials</h2>
            <p className="mb-3" style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: '15px', color: '#4A3F35', lineHeight: 1.8 }}>
              Step-by-step technical guides for slitter setup, blade selection, and process optimization.
              Written for engineers with practical, actionable specifications.
            </p>
            <Link
              href={`${base}/guide`}
              className="inline-flex items-center gap-1.5 font-mono text-[12px] no-underline rounded-[3px] px-3.5 py-2 transition-colors hover:bg-[#B8860B] hover:text-[#0F0D0B]"
              style={{ border: '1px solid #B8860B', color: '#B8860B', background: 'transparent' }}
            >
              Browse all guides →
            </Link>
          </section>

          {/* Section 4: Tools */}
          <section id="tools" className="mb-10">
            <h2 style={sectionHeadingStyle}>Interactive Tools</h2>
            <div
              className="flex items-center justify-between gap-4 rounded p-5"
              style={{ background: '#FFFFFF', border: '1px solid #D8CFC4', borderTop: '3px solid #C8BDB0' }}
            >
              <div>
                <p className="font-mono text-[14px] font-semibold mb-1" style={{ color: '#1A1512' }}>
                  Clearance Calculator
                </p>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: '#4A3F35' }}>
                  Calculate optimal knife clearance for your material and thickness.
                </p>
              </div>
              <Link
                href={`${base}/tools/clearance-calculator`}
                className="font-mono text-[12px] font-semibold no-underline whitespace-nowrap rounded-[3px] px-4 py-2 transition-colors hover:bg-[#D4A010]"
                style={{ background: '#B8860B', color: '#0F0D0B' }}
              >
                Open Tool →
              </Link>
            </div>
          </section>

          {/* Section 5: CTA */}
          <section id="cta">
            <CTA variant="banner" />
          </section>

          {/* Section 6: Newsletter */}
          <section id="newsletter" className="mt-10">
            <h2 style={sectionHeadingStyle}>Newsletter</h2>
            <Newsletter />
          </section>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:sticky lg:top-[88px] flex flex-col gap-6">

          {/* Online Tools box */}
          <div className="rounded overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #D8CFC4', borderTop: '3px solid #4A3728' }}>
            <div className="px-3.5 py-2.5" style={{ background: '#EDE8E0', borderBottom: '1px solid #D8CFC4' }}>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#4A3728' }}>
                Online Tools
              </p>
            </div>
            <div className="p-3">
              <Link
                href={`${base}/tools/clearance-calculator`}
                className="block p-2.5 no-underline mb-2 rounded-[3px] transition-colors hover:border-[#B8860B]"
                style={{ background: '#F7F3EE', border: '1px solid #D8CFC4' }}
              >
                <p className="font-mono text-[12px] mb-0.5" style={{ color: '#B8860B' }}>
                  Clearance Calculator
                </p>
                <p className="font-mono text-[11px]" style={{ color: '#8A7A6E' }}>
                  Optimal clearance for any material
                </p>
              </Link>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="rounded overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #D8CFC4', borderTop: '3px solid #4A3728' }}>
            <div className="px-3.5 py-2.5" style={{ background: '#EDE8E0', borderBottom: '1px solid #D8CFC4' }}>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#4A3728' }}>
                Platform Stats
              </p>
            </div>
            <div className="p-3 flex flex-col gap-2.5">
              {[
                { val: '50+',      label: 'Years in Industry' },
                { val: 'ISO 9001', label: '2015 Certified' },
                { val: '3',        label: 'Wiki Pillars' },
                { val: 'EN / 中文', label: 'Languages' },
              ].map(s => (
                <div key={s.label} className="flex justify-between items-baseline">
                  <span style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '15px', fontWeight: 700, color: '#9A7009' }}>
                    {s.val}
                  </span>
                  <span className="font-mono text-[11px]" style={{ color: '#8A7A6E' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </>
  )
}
