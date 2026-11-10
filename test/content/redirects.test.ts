import { describe, it, expect } from 'vitest'
import { registry, type Registry } from '@/lib/content/registry'
import { REDIRECTS, resolveRedirect, buildNextRedirects } from '@/lib/content/redirects'

describe('REDIRECTS 對照表', () => {
  it('沒有轉址鏈：每個目標都不是另一筆轉址的來源', () => {
    const sources = new Set(REDIRECTS.map(r => r.from))
    for (const r of REDIRECTS) {
      expect(sources.has(r.to), `${r.from} -> ${r.to} 形成轉址鏈`).toBe(false)
    }
  })

  it('每個目標都存在於內容登錄表', () => {
    for (const r of REDIRECTS) {
      const [, locale, ...rest] = r.to.split('/')
      const page = registry.getPage(locale as 'en' | 'zh-TW', '/' + rest.join('/'))
      expect(page, `${r.from} 的目標 ${r.to} 不存在`).not.toBeNull()
    }
  })

  it('來源不重複', () => {
    const froms = REDIRECTS.map(r => r.from)
    expect(new Set(froms).size).toBe(froms.length)
  })
})

describe('resolveRedirect', () => {
  it.each([
    ['/zh-TW/wiki/slitter-knife-guide', '/zh-TW/wiki/slitter-knife'],
    ['/zh-TW/wiki/metal-slitting-machine', '/zh-TW/wiki/slitting-machine'],
    ['/zh-TW/wiki/slitting-clearance-guide', '/zh-TW/wiki/slitting-clearance'],
    ['/zh-TW/wiki/slitting-defects-diagnosis', '/zh-TW/wiki/slitting-defects'],
    ['/zh-TW/wiki/arbor-spacer-guide', '/zh-TW/wiki/arbor-spacers'],
    ['/en/wiki/coil-slitting-process', '/en/wiki/slitting-process'],
    ['/en/wiki/slitting-machine-troubleshooting', '/en/wiki/slitting-defects'],
    ['/en/wiki/precision-spacer-specifications', '/en/wiki/arbor-spacers'],
    ['/en/wiki/slitter-knife-material-comparison', '/en/wiki/slitter-knife-materials'],
    ['/en/wiki/slitting-machine-selection-guide', '/en/wiki/slitting-machine-selection'],
    ['/en/guide/slitting-line-changeover-guide', '/en/guide/slitting-line-changeover'],
    ['/zh-TW/guide/slitting-line-changeover-guide', '/zh-TW/guide/slitting-line-changeover'],
  ])('%s 以 301 轉到 %s', (from, to) => {
    expect(resolveRedirect(from, registry)).toEqual({ status: 301, to })
  })

  it('簡中網址有對應繁中頁面時轉到繁中', () => {
    expect(resolveRedirect('/zh-CN/wiki', registry)).toEqual({ status: 301, to: '/zh-TW/wiki' })
    expect(resolveRedirect('/zh-CN', registry)).toEqual({ status: 301, to: '/zh-TW' })
  })

  it('簡中網址的舊代稱先換成最終代稱，再轉到繁中，且只轉一次', () => {
    expect(resolveRedirect('/zh-CN/wiki/slitting-machine-troubleshooting', registry))
      .toEqual({ status: 301, to: '/zh-TW/wiki/slitting-defects' })
  })

  // 模擬某篇英文文章還沒有繁中版的情況
  const withoutZh = (path: string): Registry => ({
    ...registry,
    getPage: (locale, p) => (locale === 'zh-TW' && p === path ? null : registry.getPage(locale, p)),
  })

  it('簡中網址沒有對應繁中頁面時回應 404', () => {
    const reg = withoutZh('/wiki/slitter-knife-materials')
    expect(resolveRedirect('/zh-CN/wiki/slitter-knife-materials', reg)).toEqual({ status: 404 })
  })

  it('繁中網址下沒有繁中版的英文文章回應 404', () => {
    const reg = withoutZh('/wiki/slitting-machine-selection')
    expect(resolveRedirect('/zh-TW/wiki/slitting-machine-selection-guide', reg)).toEqual({ status: 404 })
  })

  it('繁中版存在時，舊的繁中網址轉到新網址', () => {
    expect(resolveRedirect('/zh-TW/wiki/slitting-machine-selection-guide', registry)).toEqual({
      status: 301,
      to: '/zh-TW/wiki/slitting-machine-selection',
    })
  })

  it('現行有效網址不轉址', () => {
    expect(resolveRedirect('/en/wiki/slitter-knife', registry)).toBeNull()
    expect(resolveRedirect('/zh-TW/wiki/hydraulic-nut', registry)).toBeNull()
  })
})

describe('buildNextRedirects', () => {
  it('產生永久轉址，且每一筆都只轉一次', () => {
    const rules = buildNextRedirects(registry)
    const sources = new Set(rules.map(r => r.source))
    for (const r of rules) {
      expect(r.permanent).toBe(true)
      expect(sources.has(r.destination), `${r.source} -> ${r.destination} 形成轉址鏈`).toBe(false)
    }
  })
})
