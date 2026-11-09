import { describe, it, expect } from 'vitest'
import { SLITTING_DATA, getClearance, assertPublishable, type SlittingData } from '@/data/slitting'
import { calculateClearance } from '@/lib/calculator'
import { SITE, getContacts, officialLink } from '@/data/site'

describe('權威數據：間隙', () => {
  it('每一列都有來源類型', () => {
    for (const row of SLITTING_DATA.clearance) {
      expect(['company-practice', 'standard', 'publication']).toContain(row.source.type)
    }
  })

  it('範圍有效：最小值不大於最大值', () => {
    for (const row of SLITTING_DATA.clearance) {
      expect(row.thicknessMm[0]).toBeLessThan(row.thicknessMm[1])
      expect(row.clearancePct[0]).toBeLessThanOrEqual(row.clearancePct[1])
    }
  })

  it('同一材料的厚度區間不重疊', () => {
    const byMaterial = new Map<string, [number, number][]>()
    for (const row of SLITTING_DATA.clearance) {
      byMaterial.set(row.material, [...(byMaterial.get(row.material) ?? []), row.thicknessMm])
    }
    for (const [material, ranges] of byMaterial) {
      const sorted = [...ranges].sort((a, b) => a[0] - b[0])
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i][0], `${material} 厚度區間重疊`).toBeGreaterThanOrEqual(sorted[i - 1][1])
      }
    }
  })

  it('依材料與厚度查到唯一的一列', () => {
    const row = SLITTING_DATA.clearance[0]
    const mid = (row.thicknessMm[0] + row.thicknessMm[1]) / 2
    expect(getClearance(row.material, mid)).toMatchObject({
      min: row.clearancePct[0],
      max: row.clearancePct[1],
      source: row.source,
    })
  })

  it('超出資料範圍時回傳 null，不自行推估', () => {
    expect(getClearance('mild-steel', 999)).toBeNull()
  })
})

describe('計算機與數據表一致', () => {
  it('每一列的計算結果都等於數據表', () => {
    for (const row of SLITTING_DATA.clearance) {
      const t = (row.thicknessMm[0] + row.thicknessMm[1]) / 2
      const result = calculateClearance(row.material, t)
      expect(result).not.toBeNull()
      expect(result!.pctMin).toBe(row.clearancePct[0])
      expect(result!.pctMax).toBe(row.clearancePct[1])
      expect(result!.mmMin).toBeCloseTo((t * row.clearancePct[0]) / 100, 6)
      expect(result!.mmMax).toBeCloseTo((t * row.clearancePct[1]) / 100, 6)
      expect(result!.source).toEqual(row.source)
    }
  })
})

describe('未經審核的數據不能正式上線', () => {
  const draft: SlittingData = { ...SLITTING_DATA, reviewedAt: null, reviewer: null }
  const reviewed: SlittingData = { ...SLITTING_DATA, reviewedAt: '2026-11-20', reviewer: 'engineer-a' }

  it('審核日期是空的時候擋下', () => {
    expect(() => assertPublishable(draft)).toThrow(/審核/)
  })

  it('有審核日期與審核人時通過', () => {
    expect(() => assertPublishable(reviewed)).not.toThrow()
  })
})

describe('公司事實與聯絡方式', () => {
  it('公司規格與官網一致', () => {
    expect(SITE.knifeSpecs.thicknessTolerance).toBe('±0.001 mm')
    expect(SITE.knifeSpecs.parallelism).toBe('≤ 0.005 mm')
    expect(SITE.spacerSpecs.thicknessTolerance).toBe('±0.001 mm')
  })

  it('繁中提供 LINE，不提供 WhatsApp', () => {
    const c = getContacts('zh-TW')
    expect(c.line?.id).toBe('@vup7881u')
    expect(c.whatsapp).toBeUndefined()
    expect(c.email).toBe('sales@slitterline.com')
  })

  it('英文提供 WhatsApp，不提供 LINE', () => {
    const c = getContacts('en')
    expect(c.whatsapp?.url).toBe('https://wa.me/886921068952')
    expect(c.line).toBeUndefined()
  })

  it('不再出現舊的 LINE ID', () => {
    expect(JSON.stringify(SITE)).not.toContain('256nfmzx')
  })

  it('官網連結依語系指向對應語言的頁面', () => {
    expect(officialLink('en', 'knives')).toMatch(/^https:\/\/www\.slitterline\.com\/en-US\//)
    expect(officialLink('zh-TW', 'knives')).toMatch(/^https:\/\/www\.slitterline\.com\/zh-TW\//)
    expect(officialLink('en', 'inquiry')).toBe('https://www.slitterline.com/en-US/inquiry')
    expect(officialLink('zh-TW', 'inquiry')).toBe('https://www.slitterline.com/zh-TW/inquiry')
  })
})
