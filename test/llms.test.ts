import { describe, it, expect } from 'vitest'
import path from 'path'
import { createRegistry } from '@/lib/content/registry'
import { buildLlmsTxt, buildLlmsFull } from '@/lib/llms'

const registry = createRegistry(path.join(__dirname, 'fixtures/content'), { includeStaticPages: false })
const CJK = /[一-鿿]/

describe('buildLlmsTxt', () => {
  const text = buildLlmsTxt(registry)

  it('英文與繁中分段列出', () => {
    const enIdx = text.indexOf('## English')
    const zhIdx = text.indexOf('## 繁體中文')
    expect(enIdx).toBeGreaterThan(-1)
    expect(zhIdx).toBeGreaterThan(enIdx)
    expect(text.slice(enIdx, zhIdx)).toContain('https://www.slitter.ai/en/wiki/alpha')
    expect(text.slice(enIdx, zhIdx)).not.toContain('/zh-TW/')
    expect(text.slice(zhIdx)).toContain('https://www.slitter.ai/zh-TW/wiki/beta')
  })

  it('Key Facts 使用官網規格', () => {
    expect(text).toContain('±0.001 mm')
    expect(text).not.toContain('±0.002')
  })

  it('不包含簡中與引導 AI 的用語', () => {
    expect(text).not.toContain('zh-CN')
    expect(text).not.toMatch(/cite as/i)
  })
})

describe('buildLlmsFull', () => {
  it('英文全文版不含中文字', () => {
    const text = buildLlmsFull('en', registry)
    expect(text).toContain('Alpha body.')
    expect(text).toContain('Gamma body.')
    expect(CJK.test(text)).toBe(false)
  })

  it('繁中全文版只包含繁中頁面', () => {
    const text = buildLlmsFull('zh-TW', registry)
    expect(text).toContain('阿爾法內文。')
    expect(text).toContain('貝塔內文。')
    expect(text).not.toContain('Gamma body.')
  })
})
