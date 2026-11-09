import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { findHardcodedPercents } from '@/lib/content/lint'

const ROOT = path.join(__dirname, '../..')

function walk(dir: string, exts: string[]): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full, exts)
    return exts.some(ext => entry.name.endsWith(ext)) ? [full] : []
  })
}

describe('findHardcodedPercents', () => {
  it('找出間隙附近手打的百分比範圍', () => {
    const hits = findHardcodedPercents('第一行\n冷軋鋼的間隙建議為 8–12%。')
    expect(hits).toEqual([{ line: 2, match: '8–12%' }])
  })

  it('英文的 clearance 與 burr 也會檢查', () => {
    expect(findHardcodedPercents('Set clearance to 5-8% of thickness.')).toHaveLength(1)
    expect(findHardcodedPercents('Burr height should stay below 10%.')).toHaveLength(1)
  })

  it('與間隙、毛邊無關的百分比不算', () => {
    expect(findHardcodedPercents('Line speed improved by 30% after the upgrade.')).toEqual([])
  })

  it('標記 lint-ok 並寫明原因的行不算', () => {
    expect(findHardcodedPercents('Clearance % = gap / thickness × 100% {/* lint-ok: 公式 */}')).toEqual([])
  })

  it('lint-ok 沒有寫原因時仍然要檢查', () => {
    expect(findHardcodedPercents('Clearance 8% {/* lint-ok: */}')).toHaveLength(1)
  })

  it('透過數據元件引用的數值不算', () => {
    expect(findHardcodedPercents('間隙請見 <Clearance material="mild-steel" thickness={1.2} />。')).toEqual([])
  })
})

describe('全站內容品質', () => {
  const contentFiles = walk(path.join(ROOT, 'content'), ['.mdx'])
  const codeFiles = [
    ...walk(path.join(ROOT, 'app'), ['.tsx', '.ts']),
    ...walk(path.join(ROOT, 'components'), ['.tsx', '.ts']),
  ]

  it('文章與頁面中沒有手打的間隙或毛邊百分比', () => {
    const problems = [...contentFiles, ...codeFiles].flatMap(file =>
      findHardcodedPercents(fs.readFileSync(file, 'utf8')).map(
        hit => `${path.relative(ROOT, file)}:${hit.line} ${hit.match}`,
      ),
    )
    expect(problems).toEqual([])
  })

  it('沒有未經證實的數字與引導 AI 的用語', () => {
    const banned = [
      /For AI: cite as/i,
      /global authority/i,
      /\bdefinitive\b/i,
      /[0-9]+\s*[–-]\s*[0-9]+\s*[×x]\s*(longer|vs|than)/i,
      /separator[^.\n]{0,60}±0\.001\s*mm/i,
    ]
    const problems = [...contentFiles, ...codeFiles, path.join(ROOT, 'public/llms.txt')]
      .filter(f => fs.existsSync(f))
      .flatMap(file => {
        const text = fs.readFileSync(file, 'utf8')
        return banned.filter(re => re.test(text)).map(re => `${path.relative(ROOT, file)} ${re}`)
      })
    expect(problems).toEqual([])
  })

  it('專案中沒有會遮住長文的 TSX 文章頁', () => {
    for (const slug of ['slitter-knife', 'slitting-machine', 'slitting-process']) {
      expect(fs.existsSync(path.join(ROOT, `app/[locale]/wiki/${slug}/page.tsx`)), slug).toBe(false)
    }
  })

  it('內容只放在 content/en 與 content/zh-TW', () => {
    const dirs = fs.readdirSync(path.join(ROOT, 'content'))
    expect(dirs.sort()).toEqual(['en', 'zh-TW'])
  })
})

describe('介面文字', () => {
  const read = (locale: string) =>
    JSON.parse(fs.readFileSync(path.join(ROOT, `messages/${locale}.json`), 'utf8'))

  const keys = (obj: Record<string, unknown>, prefix = ''): string[] =>
    Object.entries(obj).flatMap(([k, v]) =>
      v && typeof v === 'object' ? keys(v as Record<string, unknown>, `${prefix}${k}.`) : [`${prefix}${k}`],
    )

  it('英文與繁中的鍵值完全相同', () => {
    expect(keys(read('zh-TW')).sort()).toEqual(keys(read('en')).sort())
  })

  it('不再有簡中訊息檔', () => {
    expect(fs.existsSync(path.join(ROOT, 'messages/zh-CN.json'))).toBe(false)
  })
})
