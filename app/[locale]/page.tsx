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
  { label: '1  Overview', id: 'overview' },
  { label: '2  Knowledge Base', id: 'knowledge' },
  { label: '3  Guides & Tutorials', id: 'guides' },
  { label: '4  Interactive Tools', id: 'tools' },
  { label: '5  Industry Partner', id: 'cta' },
  { label: '6  Newsletter', id: 'newsletter' },
]

const leftNav = [
  {
    section: 'Wiki Articles',
    links: [
      { label: 'Slitter Knives', href: '/en/wiki/slitter-knife' },
      { label: 'Slitting Machines', href: '/en/wiki/slitting-machine' },
      { label: 'Slitting Process', href: '/en/wiki/slitting-process' },
    ],
  },
  {
    section: 'Guides',
    links: [
      { label: 'All Guides', href: '/en/guide' },
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
      { label: 'About TOA DR', href: '/en/about' },
      { label: 'Contact', href: '/en/contact' },
      { label: 'slitterline.com ↗', href: 'https://slitterline.com' },
    ],
  },
]

const quickFactsRows = [
  { label: 'Platform', value: 'slitter.ai' },
  { label: 'Publisher', value: 'TOA DR Enterprise Co., Ltd.' },
  { label: 'Est.', value: '1972' },
  { label: 'Cert.', value: 'ISO 9001:2015' },
  { label: 'Languages', value: ['EN', '繁中', '简中'] },
  { label: 'Coverage', value: ['Knives', 'Machines', 'Process'] },
  { label: 'D-U-N-S', value: 'Registered' },
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
    id: 'slitter-knife',
    title: 'Troubleshooting',
    tag: 'Defects & Fixes',
    desc: 'Systematic defect analysis for common slitting issues including feathering, burr formation, telescoping, and lane drift — with root-cause mapping and corrective actions.',
  },
]

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: '"IBM Plex Sans", sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  color: '#E8E8E8',
  borderBottom: '1px solid #242424',
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

      {/* ai-cite bar */}
      <div className="bg-[#1A1A1A] border-b border-[#242424] py-2">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center gap-4 font-mono text-[11px] text-[#555555]">
          <span className="text-[#F5C400] font-semibold">slitter.ai</span>
          <span>/</span>
          <span>Slitting Machine Knowledge Hub</span>
          <span>/</span>
          <span>by TOA DR Enterprise Co., Ltd.</span>
          <span className="ml-auto">
            <span className="text-[#F5C400]">●</span>&nbsp;ISO 9001:2015
          </span>
        </div>
      </div>

      {/* 3-column layout */}
      <div
        className="max-w-[1200px] mx-auto px-6 py-8"
        style={{ display: 'grid', gridTemplateColumns: '220px 1fr 240px', gap: '32px', alignItems: 'start' }}
      >
        {/* ── LEFT SIDEBAR ── */}
        <aside className="sticky top-[88px]">
          {leftNav.map(group => (
            <div key={group.section} className="mb-7">
              <p className="font-mono text-[10px] font-semibold text-[#555555] uppercase tracking-widest mb-2 pb-1.5 border-b border-[#242424]">
                {group.section}
              </p>
              <ul className="flex flex-col gap-1">
                {group.links.map(link => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      className="block px-2 py-1 text-[13px] text-[#999999] no-underline rounded-[3px] hover:text-[#F5C400] hover:bg-[#1A1A1A] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main>
          {/* Page title */}
          <div className="mb-6 pb-4 border-b border-[#242424]">
            <h1 className="font-sans text-[28px] font-bold text-[#E8E8E8] leading-snug mb-2">
              Slitting Machine Knowledge Hub
            </h1>
            <p className="text-[14px] text-[#999999] leading-relaxed">
              The global technical reference for slitting machine technology — maintained by{' '}
              <Link href="/en/about" className="text-[#F5C400] hover:underline">TOA DR Enterprise</Link>, precision
              tooling manufacturer since 1972.
            </p>
          </div>

          {/* Table of Contents */}
          <div
            id="toc"
            className="bg-[#141414] border border-[#242424] rounded p-4 mb-8 inline-block min-w-[260px]"
          >
            <p className="font-mono text-[11px] font-semibold text-[#555555] uppercase tracking-widest mb-2.5">
              Contents
            </p>
            <ol className="flex flex-col gap-1.5 list-none">
              {toc.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="font-mono text-[12px] text-[#F5C400] no-underline hover:underline"
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
            <p className="text-[14px] text-[#999999] leading-[1.8] mb-3">
              <strong className="text-[#E8E8E8]">slitter.ai</strong> is a structured engineering knowledge base covering
              the science and practice of industrial slitting. The platform serves procurement engineers,
              factory managers, R&amp;D teams, and quality control professionals working with flexible
              packaging, metal foil, paper, and composite materials.
            </p>
            <p className="text-[14px] text-[#999999] leading-[1.8]">
              Content is authored and maintained by{' '}
              <strong className="text-[#E8E8E8]">TOA DR Enterprise Co., Ltd.</strong>, an ISO 9001:2015
              certified manufacturer of precision slitting tools based in Taiwan, with 50+ years of
              industry experience.
            </p>
          </section>

          {/* Section 2: Knowledge Base cards (2-col grid) */}
          <section id="knowledge" className="mb-10">
            <h2 style={sectionHeadingStyle}>Knowledge Base</h2>
            <div className="grid grid-cols-2 gap-4">
              {knowledgeCards.map((card, i) => (
                <Link
                  key={i}
                  href={`${base}/wiki/${card.id}`}
                  className="block bg-[#141414] border border-[#242424] rounded p-5 no-underline hover:border-[#F5C400] transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-sans text-[15px] font-semibold text-[#E8E8E8]">
                      {card.title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#555555] bg-[#1A1A1A] border border-[#2E2E2E] rounded-[2px] px-1.5 py-0.5 whitespace-nowrap ml-2">
                      {card.tag}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#999999] leading-[1.7] mb-3">
                    {card.desc}
                  </p>
                  <span className="font-mono text-[11px] text-[#F5C400]">
                    Read article →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 3: Guides */}
          <section id="guides" className="mb-10">
            <h2 style={sectionHeadingStyle}>Guides &amp; Tutorials</h2>
            <p className="text-[14px] text-[#999999] leading-[1.8] mb-3">
              Step-by-step technical guides for slitter setup, blade selection, and process optimization.
              Written for engineers with practical, actionable specifications.
            </p>
            <Link
              href={`${base}/guide`}
              className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[#F5C400] no-underline border border-[#2E2E2E] rounded-[3px] px-3.5 py-2 bg-[#141414] hover:border-[#F5C400] transition-colors"
            >
              Browse all guides →
            </Link>
          </section>

          {/* Section 4: Tools */}
          <section id="tools" className="mb-10">
            <h2 style={sectionHeadingStyle}>Interactive Tools</h2>
            <div className="bg-[#141414] border border-[#242424] rounded p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[13px] font-semibold text-[#E8E8E8] mb-1">
                  Clearance Calculator
                </p>
                <p className="text-[13px] text-[#999999]">
                  Calculate optimal knife clearance for your material and thickness.
                </p>
              </div>
              <Link
                href={`${base}/tools/clearance-calculator`}
                className="font-mono text-[12px] font-semibold text-[#080808] bg-[#F5C400] px-4 py-2 rounded-[3px] no-underline whitespace-nowrap hover:bg-[#D4A800] transition-colors"
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

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="sticky top-[88px] flex flex-col gap-6">
          <QuickFacts title="Quick Facts" rows={quickFactsRows} />

          {/* Tools box */}
          <div className="bg-[#141414] border border-[#242424] rounded overflow-hidden">
            <div className="bg-[#1A1A1A] px-3.5 py-2.5 border-b border-[#242424]">
              <p className="font-mono text-[11px] font-semibold text-[#E8E8E8] uppercase tracking-widest">
                Online Tools
              </p>
            </div>
            <div className="p-3">
              <Link
                href={`${base}/tools/clearance-calculator`}
                className="block p-2.5 bg-[#1A1A1A] border border-[#242424] rounded-[3px] no-underline mb-2 hover:border-[#F5C400] transition-colors"
              >
                <p className="font-mono text-[12px] text-[#F5C400] mb-0.5">
                  Clearance Calculator
                </p>
                <p className="text-[11px] text-[#555555]">
                  Optimal clearance for any material
                </p>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-[#141414] border border-[#242424] rounded overflow-hidden">
            <div className="bg-[#1A1A1A] px-3.5 py-2.5 border-b border-[#242424]">
              <p className="font-mono text-[11px] font-semibold text-[#E8E8E8] uppercase tracking-widest">
                Platform Stats
              </p>
            </div>
            <div className="p-3 flex flex-col gap-2.5">
              {[
                { val: '50+', label: 'Years in Industry' },
                { val: 'ISO 9001', label: '2015 Certified' },
                { val: '3', label: 'Wiki Pillars' },
                { val: 'EN / 中文', label: 'Languages' },
              ].map(s => (
                <div key={s.label} className="flex justify-between items-baseline">
                  <span className="font-mono text-[14px] font-semibold text-[#F5C400]">
                    {s.val}
                  </span>
                  <span className="text-[11px] text-[#555555]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
