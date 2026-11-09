import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { locales, localeNames, type Locale } from '@/lib/i18n'
import { registry } from '@/lib/content/registry'
import { officialLink } from '@/data/site'
import LocaleSwitcher, { type LocaleOption } from './LocaleSwitcher'

const SHORT_LABELS: Record<Locale, string> = { en: 'EN', 'zh-TW': '繁中' }

export default async function Navigation({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'nav' })
  const base = `/${locale}`

  const navLinks = [
    { label: t('wiki'), href: `${base}/wiki` },
    { label: t('guide'), href: `${base}/guide` },
    { label: t('tools'), href: `${base}/tools` },
    { label: t('data'), href: `${base}/data/slitting-clearance` },
    { label: t('about'), href: `${base}/about` },
  ]

  const options: LocaleOption[] = locales.map(code => ({
    code,
    label: SHORT_LABELS[code],
    homeLabel: t('homeOf', { language: localeNames[code] }),
    paths: registry.listPages(code).map(p => p.path),
  }))

  return (
    <header
      className="bg-[#0F0D0B] sticky top-0 z-50"
      style={{ borderBottom: '1px solid #2A2018', boxShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
    >
      <nav className="max-w-[1200px] mx-auto px-4 lg:px-6 h-[60px] flex items-center justify-between gap-4">
        <Link
          href={base}
          className="no-underline shrink-0"
          style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#F5E6B8', letterSpacing: '-0.01em' }}
        >
          slitter<span style={{ color: '#8A7A6E' }}>.ai</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="no-underline transition-colors hover:text-[#B8860B]"
              style={{ fontFamily: 'var(--font-ui), system-ui, sans-serif', fontSize: '12px', fontWeight: 500, color: '#8A7A6E', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <LocaleSwitcher locale={locale} options={options} />
          <Link
            href={officialLink(locale, 'inquiry')}
            target="_blank"
            rel="noopener"
            className="no-underline whitespace-nowrap shrink-0 transition-colors hover:bg-[#D4A010]"
            style={{ background: '#B8860B', color: '#0F0D0B', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, padding: '8px 14px', borderRadius: '3px' }}
          >
            {t('quote')}
          </Link>
        </div>
      </nav>
    </header>
  )
}
