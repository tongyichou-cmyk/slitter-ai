import { describe, it, expect } from 'vitest'
import path from 'path'
import { createRegistry } from '@/lib/content/registry'
import { buildAlternates, ogLocale } from '@/lib/seo'
import { buildSitemap } from '@/lib/sitemap'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema'

const registry = createRegistry(path.join(__dirname, 'fixtures/content'), { includeStaticPages: false })
const BASE = 'https://www.slitter.ai'

describe('buildAlternates', () => {
  it('有中英文時輸出兩個語系與 x-default', () => {
    expect(buildAlternates('zh-TW', '/wiki/alpha', registry)).toEqual({
      canonical: `${BASE}/zh-TW/wiki/alpha`,
      languages: {
        en: `${BASE}/en/wiki/alpha`,
        'zh-TW': `${BASE}/zh-TW/wiki/alpha`,
        'x-default': `${BASE}/en/wiki/alpha`,
      },
    })
  })

  it('只有繁中時只輸出繁中，沒有 x-default', () => {
    expect(buildAlternates('zh-TW', '/wiki/beta', registry)).toEqual({
      canonical: `${BASE}/zh-TW/wiki/beta`,
      languages: { 'zh-TW': `${BASE}/zh-TW/wiki/beta` },
    })
  })

  it('不輸出 zh-CN', () => {
    const { languages } = buildAlternates('en', '/wiki/alpha', registry)
    expect(Object.keys(languages)).not.toContain('zh-CN')
  })
})

describe('ogLocale', () => {
  it('英文是 en_US，繁中是 zh_TW', () => {
    expect(ogLocale('en')).toBe('en_US')
    expect(ogLocale('zh-TW')).toBe('zh_TW')
  })
})

describe('buildSitemap', () => {
  const entries = buildSitemap(registry)

  it('只收錄實際存在的頁面', () => {
    expect(entries.map(e => e.url).sort()).toEqual([
      `${BASE}/en/guide/gamma`,
      `${BASE}/en/wiki/alpha`,
      `${BASE}/zh-TW/wiki/alpha`,
      `${BASE}/zh-TW/wiki/beta`,
    ])
  })

  it('日期是內容的 updatedAt，重複產生結果相同', () => {
    const zhAlpha = entries.find(e => e.url === `${BASE}/zh-TW/wiki/alpha`)
    expect(zhAlpha?.lastModified).toBe('2026-05-01')
    expect(buildSitemap(registry)).toEqual(entries)
  })

  it('包含語系對應', () => {
    const enAlpha = entries.find(e => e.url === `${BASE}/en/wiki/alpha`)
    expect(enAlpha?.alternates?.languages).toEqual({
      en: `${BASE}/en/wiki/alpha`,
      'zh-TW': `${BASE}/zh-TW/wiki/alpha`,
    })
    const beta = entries.find(e => e.url === `${BASE}/zh-TW/wiki/beta`)
    expect(beta?.alternates?.languages).toEqual({ 'zh-TW': `${BASE}/zh-TW/wiki/beta` })
  })
})

describe('結構化資料', () => {
  it('Article 的作者是組織，並帶入日期', () => {
    const schema = buildArticleSchema({
      locale: 'en',
      title: 'Alpha',
      description: 'Alpha in English.',
      path: '/wiki/alpha',
      publishedAt: '2026-03-01',
      updatedAt: '2026-04-01',
    }) as Record<string, any>
    expect(schema.author['@type']).toBe('Organization')
    expect(schema.datePublished).toBe('2026-03-01')
    expect(schema.dateModified).toBe('2026-04-01')
    expect(schema.inLanguage).toBe('en')
  })

  it('Breadcrumb 網址一律使用 www.slitter.ai', () => {
    const schema = buildBreadcrumbSchema([
      { name: '首頁', path: '/zh-TW' },
      { name: '阿爾法', path: '/zh-TW/wiki/alpha' },
    ]) as Record<string, any>
    for (const item of schema.itemListElement) {
      expect(item.item.startsWith(`${BASE}/`)).toBe(true)
    }
  })
})
