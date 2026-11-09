// 找出「間隙、毛邊」附近手打的百分比，這些數值應改用數據元件引用 data/slitting.ts。
// 表格列以表頭判斷，因為「| 鋁合金 | 5–8% |」這種列本身不會出現關鍵字。
// 公式、算例等不是建議值的百分比，在同一行加上 {/* lint-ok: 原因 */} 標記為已審核的例外。
const EXEMPT = /\{\/\*\s*lint-ok:\s*[^*\s][^*]*\*\/\}/
const KEYWORDS = /clearance|burr|間隙|毛邊/i
const PERCENT = /\d+(?:\.\d+)?(?:\s*[–-]\s*\d+(?:\.\d+)?)?\s*%/g
const WINDOW = 60

export function findHardcodedPercents(text: string): { line: number; match: string }[] {
  const hits: { line: number; match: string }[] = []
  const lines = text.split('\n')
  // 表格列本身通常沒有關鍵字，改看所屬表格的表頭
  let tableHeader = ''
  lines.forEach((line, i) => {
    const isRow = line.trimStart().startsWith('|')
    if (!isRow) tableHeader = ''
    else if (!tableHeader) tableHeader = line
    if (EXEMPT.test(line)) return
    for (const m of line.matchAll(PERCENT)) {
      const start = Math.max(0, m.index! - WINDOW)
      const context = line.slice(start, m.index! + m[0].length + WINDOW)
      if (KEYWORDS.test(context) || (isRow && KEYWORDS.test(tableHeader))) hits.push({ line: i + 1, match: m[0] })
    }
  })
  return hits
}
