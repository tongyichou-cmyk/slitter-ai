import { describe, it, expect } from 'vitest'
import { SLITTING_DATA, getClearance, getRule } from '@/data/slitting'
import { resolveDataTokens, renderDataComponents } from '@/lib/content/data-text'
import { mdxToText } from '@/lib/llms'

const mild = getClearance('mild-steel', 1.0)!
const general = SLITTING_DATA.burrLimits.find(l => l.application === 'general')!.maxPct
const ahss = getRule('ahss')!

describe('FAQ 文字中的數據代號', () => {
  it('間隙代號換成數據表的範圍', () => {
    expect(resolveDataTokens('建議 {{clearance:mild-steel:1.0}}。')).toBe(`建議 ${mild.min}–${mild.max}%。`)
  })

  it('毛邊與規則代號換成數據表的數值', () => {
    expect(resolveDataTokens('{{burr:general}}')).toBe(`${general}%`)
    expect(resolveDataTokens('{{rule:ahss}}')).toBe(`+${ahss.deltaPct![0]}–${ahss.deltaPct![1]}%`)
  })

  it('查不到數據時直接報錯，不留下代號', () => {
    expect(() => resolveDataTokens('{{clearance:mild-steel:99}}')).toThrow(/mild-steel/)
    expect(() => resolveDataTokens('{{burr:other}}')).toThrow(/other/)
    expect(() => resolveDataTokens('{{rule:other}}')).toThrow(/other/)
  })
})

describe('llms 全文版保留數據元件的數值', () => {
  it('Clearance、ClearanceRule 與 BurrLimit 換成文字', () => {
    const text = renderDataComponents(
      'A <Clearance material="mild-steel" thickness="1.0" /> B <BurrLimit application="general" /> C <ClearanceRule material="ahss" />',
      'en',
    )
    expect(text).toBe(`A ${mild.min}–${mild.max}% B ${general}% C +${ahss.deltaPct![0]}–${ahss.deltaPct![1]}%`)
  })

  it('BurrTable 換成依語系的表格', () => {
    const zh = renderDataComponents('<BurrTable />', 'zh-TW')
    expect(zh.split('\n').filter(l => l.startsWith('|')).length).toBe(SLITTING_DATA.burrLimits.length + 2)
    expect(zh).toContain(`${general}%`)
  })

  it('ClearanceTable 換成依語系的表格', () => {
    const zh = renderDataComponents('<ClearanceTable materials="copper" />', 'zh-TW')
    expect(zh).toContain('銅與黃銅')
    expect(zh).not.toContain('Low carbon')
    const en = renderDataComponents('<ClearanceTable />', 'en')
    expect(en).toContain('Mild steel (cold rolled)')
    expect(en.split('\n').filter(l => l.startsWith('|')).length).toBe(
      SLITTING_DATA.clearance.length + SLITTING_DATA.clearanceRules.length + 2,
    )
  })

  it('mdxToText 不再丟掉數值，也移除 lint-ok 註記', () => {
    const text = mdxToText('Use <Clearance material="mild-steel" thickness="1.0" />. 5% {/* lint-ok: example */}', 'en')
    expect(text).toContain(`${mild.min}–${mild.max}%`)
    expect(text).not.toContain('lint-ok')
  })
})
