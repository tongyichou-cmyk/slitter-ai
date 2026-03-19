import type { MetadataRoute } from 'next'

const BASE_URL = 'https://slitter.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/wiki/slitter-knife',
    '/wiki/slitting-machine',
    '/wiki/slitting-process',
    '/guide',
    '/tools/clearance-calculator',
    '/about',
    '/contact',
  ]

  return staticPages.map(path => ({
    url: `${BASE_URL}/en${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))
}
