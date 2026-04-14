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

function buildLeftNav(base: string, isZh: boolean) {
  return [
    {
      section: isZh ? '知識庫文章' : 'Wiki Articles',
      links: isZh ? [
        { label: '所有文章 ↗',    href: `${base}/wiki` },
        { label: '金屬分條機',    href: `${base}/wiki/metal-slitting-machine` },
        { label: '分條刀指南',    href: `${base}/wiki/slitter-knife-guide` },
        { label: '間隙設定',      href: `${base}/wiki/slitting-clearance-guide` },
        { label: '間隔環指南',    href: `${base}/wiki/arbor-spacer-guide` },
        { label: '輕量vs標準間隔環', href: `${base}/wiki/lightweight-vs-standard-spacers` },
        { label: '剪切環指南',    href: `${base}/wiki/stripper-rings-guide` },
        { label: '液壓螺母',      href: `${base}/wiki/hydraulic-nut-guide` },
        { label: '研磨服務',      href: `${base}/wiki/knife-regrinding-guide` },
        { label: '問題診斷',      href: `${base}/wiki/slitting-defects-diagnosis` },
        { label: '刀具安裝',      href: `${base}/wiki/tooling-installation-guide` },
      ] : [
        { label: 'All Articles ↗',        href: `${base}/wiki` },
        { label: 'Slitter Knives',        href: `${base}/wiki/slitter-knife` },
        { label: 'Slitting Machines',     href: `${base}/wiki/slitting-machine` },
        { label: 'Slitting Process',      href: `${base}/wiki/slitting-process` },
        { label: 'Machine Selection',     href: `${base}/wiki/slitting-machine-selection-guide` },
        { label: 'Knife Materials',       href: `${base}/wiki/slitter-knife-material-comparison` },
        { label: 'Spacer Specs',          href: `${base}/wiki/precision-spacer-specifications` },
        { label: 'Troubleshooting',       href: `${base}/wiki/slitting-machine-troubleshooting` },
        { label: 'Coil Slitting Process', href: `${base}/wiki/coil-slitting-process` },
      ],
    },
    {
      section: isZh ? '指南' : 'Guides',
      links: [
        { label: isZh ? '所有指南' : 'All Guides', href: `${base}/guide` },
      ],
    },
    {
      section: isZh ? '工具' : 'Tools',
      links: [
        { label: isZh ? '間隙計算機' : 'Clearance Calculator', href: `${base}/tools/clearance-calculator` },
      ],
    },
    {
      section: isZh ? '公司' : 'Company',
      links: [
        { label: isZh ? '關於道德煜' : 'About TOA DR', href: `${base}/about` },
        { label: isZh ? '聯絡我們' : 'Contact',        href: `${base}/contact` },
        { label: 'slitterline.com ↗',                  href: 'https://slitterline.com' },
      ],
    },
  ]
}

const quickFactsRows = [
  { label: 'Platform',   value: 'slitter.ai' },
  { label: 'Publisher',  value: 'TOA DR Enterprise Co., Ltd.' },
  { label: 'Est.',       value: '1972' },
  { label: 'Cert.',      value: 'ISO 9001:2015' },
  { label: 'Languages',  value: ['EN', '繁中', '简中'] },
  { label: 'Coverage',   value: ['Knives', 'Machines', 'Process'] },
  { label: 'D-U-N-S',   value: 'Registered' },
]

const enKnowledgeCards = [
  {
    id: 'slitter-knife',
    title: 'Slitter Knives',
    tag: 'Materials & Grades',
    desc: 'Comprehensive reference covering tool steel grades, carbide coatings, tolerance specifications, and selection criteria for precision slitting knives.',
  },
  {
    id: 'slitting-machine',
    title: 'Slitting Machines',
    tag: 'Machine Types',
    desc: 'Technical overview of log slitters, rewind slitters, and duplex machines. Covers tension control, rewind shafts, scoring vs. shear cut configurations.',
  },
  {
    id: 'slitting-machine-selection-guide',
    title: 'Machine Selection Guide',
    tag: 'Machine Selection',
    desc: 'How to select the right slitting machine — log slitter, rewind slitter, or duplex. Covers load capacity, rewind specs, drive types, and cost factors.',
  },
  {
    id: 'slitter-knife-material-comparison',
    title: 'Knife Material Comparison',
    tag: 'Knife Materials',
    desc: 'Side-by-side comparison of D2, M2, M42, and carbide slitter knives: hardness, wear resistance, regrind life, and cost per linear meter.',
  },
  {
    id: 'precision-spacer-specifications',
    title: 'Precision Spacer Specs',
    tag: 'Spacers',
    desc: 'Engineering specs for arbor spacers: tolerance classes, materials, bore fits, and stack calculation for achieving strip widths within ±0.05 mm.',
  },
  {
    id: 'slitting-machine-troubleshooting',
    title: 'Troubleshooting Guide',
    tag: 'Defects & Fixes',
    desc: 'Root-cause analysis for burrs, edge curl, width variation, coil telescoping, strip breaks, and vibration — with corrective actions.',
  },
  {
    id: 'coil-slitting-process',
    title: 'Coil Slitting Process',
    tag: 'Process',
    desc: 'End-to-end process guide: entry setup, slitter head config, looping pit, rewind tension profiles, coil handling, and quality checkpoints.',
  },
  {
    id: 'slitting-process',
    title: 'Slitting Process Parameters',
    tag: 'Parameters & QC',
    desc: 'Blade clearance, knife overlap, speed-to-tension ratios, burr formation causes, and quality control checkpoints for high-speed slitting.',
  },
]

const zhKnowledgeCards = [
  {
    id: 'metal-slitting-machine',
    title: '金屬分條機完全指南',
    tag: '分條機',
    desc: '金屬分條機類型、規格選型、驅動系統、張力控制，以及設備採購評估完整技術參考。',
  },
  {
    id: 'slitter-knife-guide',
    title: '分條刀完全指南',
    tag: '分條刀',
    desc: '分條刀材質、硬度等級、公差規格、使用壽命與選型建議，涵蓋鋼材、不鏽鋼、鋁箔等材料。',
  },
  {
    id: 'slitting-clearance-guide',
    title: '分條刀間隙設定指南',
    tag: '間隙設定',
    desc: '各材質間隙百分比計算、間隙對毛邊與邊緣品質的影響，以及現場快速調整方法。',
  },
  {
    id: 'arbor-spacer-guide',
    title: '刀軸間隔環指南',
    tag: '間隔環',
    desc: '間隔環規格、公差等級、材質選擇，以及刀軸堆疊計算確保分條寬度精度。',
  },
  {
    id: 'lightweight-vs-standard-spacers',
    title: '輕量 vs 標準間隔環比較',
    tag: '間隔環比較',
    desc: '輕量化間隔環與標準間隔環在重量、剛性、熱膨脹與成本上的完整比較分析。',
  },
  {
    id: 'stripper-rings-guide',
    title: '分條機剪切環指南',
    tag: '剪切環',
    desc: '剪切環功能、材質選擇、安裝規範，以及常見問題診斷與更換週期建議。',
  },
  {
    id: 'hydraulic-nut-guide',
    title: '刀軸液壓螺母指南',
    tag: '液壓螺母',
    desc: '液壓螺母操作原理、壓力設定、安裝程序，以及與傳統機械螺母的比較。',
  },
  {
    id: 'knife-regrinding-guide',
    title: '分條刀研磨服務指南',
    tag: '研磨服務',
    desc: '分條刀研磨標準、研磨次數管理、送磨時機判斷，以及研磨品質驗收規範。',
  },
  {
    id: 'slitting-defects-diagnosis',
    title: '分條加工問題診斷',
    tag: '問題診斷',
    desc: '毛邊、邊緣捲曲、寬度偏差、捲料望遠鏡效應、斷帶等常見缺陷的根本原因與解決方案。',
  },
  {
    id: 'tooling-installation-guide',
    title: '分條線刀具組裝實務',
    tag: '刀具安裝',
    desc: '刀具組裝順序、刀軸鎖緊扭矩、重疊量設定，以及組裝後品質確認檢查要點。',
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
  const isZh = locale === 'zh-TW' || locale === 'zh-CN'
  const leftNav = buildLeftNav(base, isZh)
  const knowledgeCards = isZh ? zhKnowledgeCards : enKnowledgeCards

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
