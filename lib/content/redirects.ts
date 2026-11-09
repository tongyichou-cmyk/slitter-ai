import { LOCALES, registry as defaultRegistry, type Registry } from '@/lib/content/registry'
import type { Locale } from '@/lib/i18n'

// 舊代稱 → 最終代稱（不含語系）。兩個語系共用，某語系沒有目標頁面時，該舊網址回應 404。
export const RENAMES: Record<string, string> = {
  '/wiki/slitter-knife-guide': '/wiki/slitter-knife',
  '/wiki/metal-slitting-machine': '/wiki/slitting-machine',
  '/wiki/slitting-clearance-guide': '/wiki/slitting-clearance',
  '/wiki/slitting-defects-diagnosis': '/wiki/slitting-defects',
  '/wiki/arbor-spacer-guide': '/wiki/arbor-spacers',
  '/wiki/lightweight-vs-standard-spacers': '/wiki/lightweight-spacers',
  '/wiki/stripper-rings-guide': '/wiki/stripper-rings',
  '/wiki/hydraulic-nut-guide': '/wiki/hydraulic-nut',
  '/wiki/knife-regrinding-guide': '/wiki/knife-regrinding',
  '/wiki/tooling-installation-guide': '/wiki/tooling-installation',
  '/wiki/coil-slitting-process': '/wiki/slitting-process',
  '/wiki/slitting-machine-troubleshooting': '/wiki/slitting-defects',
  '/wiki/precision-spacer-specifications': '/wiki/arbor-spacers',
  '/wiki/slitter-knife-material-comparison': '/wiki/slitter-knife-materials',
  '/wiki/slitting-machine-selection-guide': '/wiki/slitting-machine-selection',
  '/guide/slitting-line-changeover-guide': '/guide/slitting-line-changeover',
}

const RETIRED_LOCALE = 'zh-CN'
const RETIRED_TARGET: Locale = 'zh-TW'

export type RedirectRule = { from: string; to: string }

export function buildRedirectList(reg: Registry): RedirectRule[] {
  const rules: RedirectRule[] = []
  for (const locale of LOCALES) {
    for (const [oldPath, newPath] of Object.entries(RENAMES)) {
      if (reg.getPage(locale, oldPath)) continue
      if (reg.getPage(locale, newPath)) rules.push({ from: `/${locale}${oldPath}`, to: `/${locale}${newPath}` })
    }
  }
  return rules
}

export const REDIRECTS: RedirectRule[] = buildRedirectList(defaultRegistry)

export type RedirectResult = { status: 301; to: string } | { status: 404 } | null

function splitLocale(url: string): { locale: string; rest: string } | null {
  const m = url.match(/^\/([A-Za-z-]+)(\/.*)?$/)
  if (!m) return null
  return { locale: m[1], rest: m[2] ?? '' }
}

export function resolveRedirect(url: string, reg: Registry = defaultRegistry): RedirectResult {
  const parts = splitLocale(url.replace(/\/$/, '') || '/')
  if (!parts) return null
  const { locale, rest } = parts

  if (locale === RETIRED_LOCALE) {
    const target = RENAMES[rest] ?? rest
    return reg.getPage(RETIRED_TARGET, target) ? { status: 301, to: `/${RETIRED_TARGET}${target}` } : { status: 404 }
  }

  if (!(LOCALES as readonly string[]).includes(locale)) return null
  const loc = locale as Locale
  if (reg.getPage(loc, rest)) return null

  const renamed = RENAMES[rest]
  if (renamed) {
    return reg.getPage(loc, renamed) ? { status: 301, to: `/${loc}${renamed}` } : { status: 404 }
  }
  return null
}

// 給 next.config.mjs 的 redirects() 使用
export function buildNextRedirects(reg: Registry = defaultRegistry) {
  const rules = buildRedirectList(reg).map(r => ({ source: r.from, destination: r.to, permanent: true }))

  const retired = new Map<string, string>()
  for (const page of reg.listPages(RETIRED_TARGET)) retired.set(page.path, page.path)
  for (const [oldPath, newPath] of Object.entries(RENAMES)) {
    if (reg.getPage(RETIRED_TARGET, newPath)) retired.set(oldPath, newPath)
  }
  for (const [from, to] of retired) {
    rules.push({ source: `/${RETIRED_LOCALE}${from}`, destination: `/${RETIRED_TARGET}${to}`, permanent: true })
  }
  return rules
}
