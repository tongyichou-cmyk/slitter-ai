import { LOCALES, registry as defaultRegistry, type Registry } from './content/registry'
import { absoluteUrl } from './seo'

export type SitemapEntry = {
  url: string
  lastModified: string
  alternates: { languages: Record<string, string> }
}

export function buildSitemap(reg: Registry = defaultRegistry): SitemapEntry[] {
  const entries: SitemapEntry[] = []
  for (const locale of LOCALES) {
    for (const page of reg.listPages(locale)) {
      const languages: Record<string, string> = {}
      for (const alt of reg.getAlternates(page.path)) languages[alt.locale] = absoluteUrl(alt.locale, alt.path)
      entries.push({ url: absoluteUrl(locale, page.path), lastModified: page.updatedAt, alternates: { languages } })
    }
  }
  return entries
}
