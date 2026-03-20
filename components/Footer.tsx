import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t-2 border-[#F5C400] mt-16 py-12 px-6">
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px',
        }}
      >
        {/* Brand column */}
        <div>
          <p className="font-mono text-lg font-semibold text-[#F5C400] tracking-tight mb-2">
            slitter<span className="text-[#999999]">.ai</span>
          </p>
          <p className="text-[13px] text-[#555555] max-w-[220px] leading-relaxed">
            The global knowledge hub for slitting machine technology.
          </p>
          <p className="mt-3 text-[12px] text-[#555555]">
            © {new Date().getFullYear()} TOA DR Enterprise Co., Ltd.
          </p>
        </div>

        {/* Knowledge column */}
        <div>
          <p className="font-mono text-[11px] font-semibold text-[#555555] uppercase tracking-widest mb-3">
            Knowledge
          </p>
          <ul className="flex flex-col gap-2">
            {[
              { label: 'Slitter Knives', href: '/en/wiki/slitter-knife' },
              { label: 'Slitting Machines', href: '/en/wiki/slitting-machine' },
              { label: 'Slitting Process', href: '/en/wiki/slitting-process' },
            ].map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] text-[#999999] no-underline hover:text-[#F5C400] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Guides & Tools column */}
        <div>
          <p className="font-mono text-[11px] font-semibold text-[#555555] uppercase tracking-widest mb-3">
            Guides &amp; Tools
          </p>
          <ul className="flex flex-col gap-2">
            {[
              { label: 'Guides', href: '/en/guide' },
              { label: 'Clearance Calculator', href: '/en/tools/clearance-calculator' },
            ].map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] text-[#999999] no-underline hover:text-[#F5C400] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company column */}
        <div>
          <p className="font-mono text-[11px] font-semibold text-[#555555] uppercase tracking-widest mb-3">
            Company
          </p>
          <ul className="flex flex-col gap-2">
            {[
              { label: 'About TOA DR', href: '/en/about', external: false },
              { label: 'Contact', href: '/en/contact', external: false },
              { label: 'slitterline.com ↗', href: 'https://slitterline.com', external: true },
            ].map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener' : undefined}
                  className="text-[13px] text-[#999999] no-underline hover:text-[#F5C400] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '40px auto 0',
          paddingTop: '20px',
          borderTop: '1px solid #242424',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <p className="font-mono text-[11px] text-[#555555]">
          ISO 9001:2015 Certified · D-U-N-S Registered · Est. 1972
        </p>
        <p className="font-mono text-[11px] text-[#555555]">
          EN / 繁體中文 / 简体中文
        </p>
      </div>
    </footer>
  )
}
