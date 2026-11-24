import { describe, it, expect } from 'vitest'
import zh from '@/messages/zh-TW.json'
import en from '@/messages/en.json'
import { buildDatasetSchema, DATASET_LICENSE } from '@/lib/schema'

const base = { path: '/data/slitting-clearance', version: '2026-11', updatedAt: '2026-11-09' }

describe('Dataset 結構化資料', () => {
  it('帶 license、inLanguage、url、dateModified 與 creator', () => {
    const s = buildDatasetSchema({ ...base, locale: 'en', name: 'X', description: en.pages.clearanceData.datasetDescription })
    expect(s.license).toBe(DATASET_LICENSE)
    expect(s.inLanguage).toBe('en')
    expect(s.url).toBe('https://www.slitter.ai/en/data/slitting-clearance')
    expect(s.dateModified).toBe('2026-11-09')
    expect(s.creator).toMatchObject({ '@type': 'Organization' })
  })

  it('description 少於 50 字元時直接報錯，避免建置出不合格的資料頁', () => {
    expect(() => buildDatasetSchema({ ...base, locale: 'zh-TW', name: 'X', description: '太短的說明' })).toThrow(/50/)
  })

  it.each([['zh-TW', zh], ['en', en]] as const)('%s 的 datasetDescription 在 50–5000 字元之間', (_l, m) => {
    const n = [...m.pages.clearanceData.datasetDescription].length
    expect(n).toBeGreaterThanOrEqual(50)
    expect(n).toBeLessThanOrEqual(5000)
  })
})
