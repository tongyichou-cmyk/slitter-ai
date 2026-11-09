// 找出「間隙、毛邊」附近手打的百分比，這些數值應改用數據元件引用 data/slitting.ts。
// 公式、算例等不是建議值的百分比，在同一行加上 {/* lint-ok: 原因 */} 標記為已審核的例外。
const EXEMPT = /\{\/\*\s*lint-ok:\s*[^*\s][^*]*\*\/\}/
const KEYWORDS = /clearance|burr|間隙|毛邊/i
const PERCENT = /\d+(?:\.\d+)?(?:\s*[–-]\s*\d+(?:\.\d+)?)?\s*%/g
const WINDOW = 60

export function findHardcodedPercents(text: string): { line: number; match: string }[] {
  const hits: { line: number; match: string }[] = []
  text.split('\n').forEach((line, i) => {
    if (EXEMPT.test(line)) return
    for (const m of line.matchAll(PERCENT)) {
      const start = Math.max(0, m.index! - WINDOW)
      const context = line.slice(start, m.index! + m[0].length + WINDOW)
      if (KEYWORDS.test(context)) hits.push({ line: i + 1, match: m[0] })
    }
  })
  return hits
}
