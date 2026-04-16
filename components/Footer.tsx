import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

export default function Footer({ locale = 'en' }: { locale?: Locale }) {
  const base = `/${locale}`
  const isZh = locale === 'zh-TW' || locale === 'zh-CN'

  const knowledgeLinks = isZh ? [
    { label: '金屬分條機',   href: `${base}/wiki/metal-slitting-machine` },
    { label: '分條刀具指南', href: `${base}/wiki/slitter-knife-guide` },
    { label: '間隙設定指南', href: `${base}/wiki/slitting-clearance-guide` },
    { label: '問題診斷',     href: `${base}/wiki/slitting-defects-diagnosis` },
  ] : [
    { label: 'Slitter Knives',    href: `${base}/wiki/slitter-knife` },
    { label: 'Slitting Machines', href: `${base}/wiki/slitting-machine` },
    { label: 'Slitting Process',  href: `${base}/wiki/slitting-process` },
    { label: 'Troubleshooting',   href: `${base}/wiki/slitting-machine-troubleshooting` },
  ]

  const toolLinks = [
    { label: isZh ? '所有指南' : 'Guides',               href: `${base}/guide` },
    { label: isZh ? '間隙計算機' : 'Clearance Calculator', href: `${base}/tools/clearance-calculator` },
  ]

  const companyLinks = [
    { label: isZh ? '關於道德煜' : 'About TOA DR', href: `${base}/about`,          external: false },
    { label: isZh ? '聯絡我們' : 'Contact',         href: `${base}/contact`,         external: false },
    { label: 'slitterline.com ↗',                   href: 'https://slitterline.com', external: true  },
  ]

  return (
    <footer style={{ background: '#0F0D0B', borderTop: '3px solid #B8860B', marginTop: '64px', padding: '48px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px' }}>

        {/* Brand */}
        <div>
          <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#F5E6B8', marginBottom: '8px', letterSpacing: '-0.01em' }}>
            slitter<span style={{ color: '#8A7A6E' }}>.ai</span>
          </p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#8A7A6E', maxWidth: '220px', lineHeight: 1.6, marginBottom: '12px' }}>
            {isZh ? '分條機技術全球知識平台。' : 'The global knowledge hub for slitting machine technology.'}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4A3A28' }}>
            © {new Date().getFullYear()} TOA DR Enterprise Co., Ltd.
          </p>
        </div>

        {/* Knowledge */}
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, color: '#6A5A48', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
            {isZh ? '知識庫' : 'Knowledge'}
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {knowledgeLinks.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-[#F5E6B8]"
                  style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#8A7A6E', textDecoration: 'none' }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Guides & Tools */}
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, color: '#6A5A48', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
            {isZh ? '指南與工具' : 'Guides & Tools'}
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {toolLinks.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-[#F5E6B8]"
                  style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#8A7A6E', textDecoration: 'none' }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, color: '#6A5A48', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
            {isZh ? '公司' : 'Company'}
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {companyLinks.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener' : undefined}
                  className="transition-colors hover:text-[#F5E6B8]"
                  style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#8A7A6E', textDecoration: 'none' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '20px 24px 0', borderTop: '1px solid #2A2018', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4A3A28' }}>
          ISO 9001:2015 Certified · D-U-N-S Registered · Est. 1972
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4A3A28' }}>
          EN / 繁體中文 / 简体中文
        </p>
      </div>
    </footer>
  )
}
