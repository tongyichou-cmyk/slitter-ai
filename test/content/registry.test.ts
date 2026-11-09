import { describe, it, expect } from 'vitest'
import path from 'path'
import { createRegistry, LOCALES } from '@/lib/content/registry'

const FIXTURES = path.join(__dirname, '../fixtures/content')
const BROKEN = path.join(__dirname, '../fixtures/broken')

describe('LOCALES', () => {
  it('只有英文與繁中，沒有簡中', () => {
    expect([...LOCALES]).toEqual(['en', 'zh-TW'])
  })
})

describe('createRegistry', () => {
  const registry = createRegistry(FIXTURES, { includeStaticPages: false })

  it('列表只包含該語系的檔案', () => {
    const zh = registry.listPages('zh-TW').map(p => p.path)
    expect(zh).toEqual(expect.arrayContaining(['/wiki/alpha', '/wiki/beta']))
    expect(zh).not.toContain('/guide/gamma')

    const en = registry.listPages('en').map(p => p.path)
    expect(en).toEqual(expect.arrayContaining(['/wiki/alpha', '/guide/gamma']))
    expect(en).not.toContain('/wiki/beta')
  })

  it('沒有對應檔案時不以其他語系頂替', () => {
    expect(registry.getPage('en', '/wiki/beta')).toBeNull()
    expect(registry.getPage('zh-TW', '/guide/gamma')).toBeNull()
  })

  it('從 frontmatter 讀出頁面資料', () => {
    const page = registry.getPage('zh-TW', '/wiki/alpha')
    expect(page).toMatchObject({
      locale: 'zh-TW',
      section: 'wiki',
      slug: 'alpha',
      title: '阿爾法',
      publishedAt: '2026-03-01',
      updatedAt: '2026-05-01',
    })
  })

  it('相同代稱的中英文頁面互為翻譯', () => {
    expect(registry.getAlternates('/wiki/alpha')).toEqual([
      { locale: 'en', path: '/wiki/alpha' },
      { locale: 'zh-TW', path: '/wiki/alpha' },
    ])
  })

  it('單一語系的頁面只有自己', () => {
    expect(registry.getAlternates('/wiki/beta')).toEqual([
      { locale: 'zh-TW', path: '/wiki/beta' },
    ])
  })

  it('frontmatter 缺少必填欄位時，錯誤訊息包含檔名', () => {
    expect(() => createRegistry(BROKEN, { includeStaticPages: false })).toThrow(/no-title\.mdx/)
  })
})
