import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { locales, type Locale } from '@/lib/i18n'
import { resolveDataTokens } from './data-text'

export const LOCALES = locales

export type Section = 'home' | 'index' | 'wiki' | 'guide' | 'data' | 'tool' | 'company'

export type FaqItem = { q: string; a: string }

export type PageEntry = {
  locale: Locale
  section: Section
  slug: string
  // 不含語系前綴，例如 '/wiki/slitter-knife'；首頁是 ''
  path: string
  title: string
  description: string
  publishedAt: string
  updatedAt: string
  reviewedAt?: string
  reviewer?: string
  keywords?: string[]
  faqs?: FaqItem[]
  // MDX 內文；TSX 頁面沒有
  body?: string
}

export type Registry = {
  listPages(locale: Locale): PageEntry[]
  getPage(locale: Locale, pagePath: string): PageEntry | null
  getAlternates(pagePath: string): { locale: Locale; path: string }[]
}

// TSX 頁面：每個語系都提供，標題與描述來自 messages/<locale>.json 的 pages.<key>
const STATIC_PAGES: { key: string; section: Section; path: string; updatedAt: string }[] = [
  { key: 'home', section: 'home', path: '', updatedAt: '2026-11-09' },
  { key: 'wiki', section: 'index', path: '/wiki', updatedAt: '2026-11-09' },
  { key: 'guide', section: 'index', path: '/guide', updatedAt: '2026-11-09' },
  { key: 'tools', section: 'index', path: '/tools', updatedAt: '2026-11-09' },
  { key: 'calculator', section: 'tool', path: '/tools/clearance-calculator', updatedAt: '2026-11-09' },
  { key: 'clearanceData', section: 'data', path: '/data/slitting-clearance', updatedAt: '2026-11-09' },
  { key: 'about', section: 'company', path: '/about', updatedAt: '2026-11-09' },
  { key: 'contact', section: 'company', path: '/contact', updatedAt: '2026-11-09' },
]

const CONTENT_SECTIONS = ['wiki', 'guide'] as const
const REQUIRED = ['title', 'description', 'publishedAt', 'updatedAt'] as const
const DATE = /^\d{4}-\d{2}-\d{2}$/

function readMdxPages(rootDir: string, locale: Locale): PageEntry[] {
  const pages: PageEntry[] = []
  for (const section of CONTENT_SECTIONS) {
    const dir = path.join(rootDir, locale, section)
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).sort()) {
      const full = path.join(dir, file)
      const { data, content } = matter(fs.readFileSync(full, 'utf8'))
      for (const field of REQUIRED) {
        if (!data[field]) throw new Error(`${full}: frontmatter 缺少 ${field}`)
      }
      for (const field of ['publishedAt', 'updatedAt'] as const) {
        if (!DATE.test(String(data[field]))) throw new Error(`${full}: ${field} 必須是 YYYY-MM-DD`)
      }
      const slug = file.replace(/\.mdx$/, '')
      pages.push({
        locale,
        section,
        slug,
        path: `/${section}/${slug}`,
        title: String(data.title),
        description: String(data.description),
        publishedAt: String(data.publishedAt),
        updatedAt: String(data.updatedAt),
        reviewedAt: data.reviewedAt ? String(data.reviewedAt) : undefined,
        reviewer: data.reviewer ? String(data.reviewer) : undefined,
        keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : undefined,
        faqs: Array.isArray(data.faqs)
          ? (data.faqs as FaqItem[]).map(f => ({ q: resolveDataTokens(f.q), a: resolveDataTokens(f.a) }))
          : undefined,
        body: content,
      })
    }
  }
  return pages
}

function readStaticPages(messagesDir: string, locale: Locale): PageEntry[] {
  const messages = JSON.parse(fs.readFileSync(path.join(messagesDir, `${locale}.json`), 'utf8'))
  return STATIC_PAGES.map(({ key, section, path: pagePath, updatedAt }) => {
    const meta = messages.pages?.[key]
    if (!meta?.title || !meta?.description) {
      throw new Error(`messages/${locale}.json: 缺少 pages.${key}.title 或 description`)
    }
    return {
      locale,
      section,
      slug: key,
      path: pagePath,
      title: meta.title,
      description: meta.description,
      publishedAt: '2026-03-01',
      updatedAt,
    }
  })
}

export function createRegistry(
  rootDir: string,
  options: { includeStaticPages?: boolean; messagesDir?: string } = {},
): Registry {
  const { includeStaticPages = true, messagesDir = path.join(rootDir, '..', 'messages') } = options
  const byLocale = new Map<Locale, PageEntry[]>()
  for (const locale of LOCALES) {
    const pages = [...(includeStaticPages ? readStaticPages(messagesDir, locale) : []), ...readMdxPages(rootDir, locale)]
    byLocale.set(locale, pages)
  }

  return {
    listPages: locale => byLocale.get(locale) ?? [],
    getPage: (locale, pagePath) => byLocale.get(locale)?.find(p => p.path === pagePath) ?? null,
    getAlternates: pagePath =>
      LOCALES.filter(locale => byLocale.get(locale)?.some(p => p.path === pagePath)).map(locale => ({
        locale,
        path: pagePath,
      })),
  }
}

export const registry: Registry = createRegistry(path.join(process.cwd(), 'content'))
