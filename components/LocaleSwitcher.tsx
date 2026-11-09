'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export type LocaleOption = {
  code: string
  label: string
  // 對應語系沒有本頁時，連到該語系首頁，並用這段文字說明
  homeLabel: string
  // 該語系實際存在的頁面路徑（不含語系前綴）
  paths: string[]
}

export default function LocaleSwitcher({ locale, options }: { locale: string; options: LocaleOption[] }) {
  const pathname = usePathname()
  const rest = pathname.replace(/^\/[^/]+/, '')

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {options.map(({ code, label, homeLabel, paths }, i) => {
        const exists = paths.includes(rest)
        const href = exists ? `/${code}${rest}` : `/${code}`
        return (
          <span key={code} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && <span style={{ color: '#3A2E22', marginRight: '2px', fontSize: '11px' }}>·</span>}
            {code === locale ? (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#B8860B', letterSpacing: '0.05em' }}>
                {label}
              </span>
            ) : (
              <Link
                href={href}
                hrefLang={code}
                title={exists ? undefined : homeLabel}
                className="hover:text-[#B8860B]"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#6A5A48', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.15s' }}
              >
                {exists ? label : homeLabel}
              </Link>
            )}
          </span>
        )
      })}
    </div>
  )
}
