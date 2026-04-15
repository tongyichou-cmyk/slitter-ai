import type { MetadataRoute } from 'next'
import { getAllWikiSlugs } from '@/lib/wiki'

const BASE_URL = 'https://www.slitter.ai'
const locales = ['en', 'zh-TW', 'zh-CN'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Homepage per locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    })
  }

  // Static pages per locale
  const staticPaths = ['/guide', '/tools/clearance-calculator', '/about', '/contact', '/wiki']
  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  // All wiki articles per locale (dynamic)
  for (const locale of locales) {
    const slugs = getAllWikiSlugs(locale)
    for (const slug of slugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/wiki/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: locale === 'en' ? 0.9 : 0.7,
      })
    }
  }

  return entries
}
