// 分條間隙等技術數值的唯一來源。文章、FAQ、計算機都從這裡讀取，不在別處手打數字。
// 目前是草案：數值取自英文間隙指南原有的厚度分級表，正式上線前必須由工程師審核並填入 reviewedAt、reviewer。

export type MaterialKey =
  | 'mild-steel'
  | 'stainless-steel'
  | 'aluminum'
  | 'copper'

export type Source =
  | { type: 'company-practice'; note: string }
  | { type: 'standard'; ref: string }
  | { type: 'publication'; ref: string; url?: string }

export type ClearanceRow = {
  material: MaterialKey
  // 左閉右開：[min, max)
  thicknessMm: [number, number]
  // 每側間隙，占材料厚度的百分比
  clearancePct: [number, number]
  source: Source
}

export type SlittingData = {
  version: string
  reviewedAt: string | null
  reviewer: string | null
  clearance: ClearanceRow[]
}

const DRAFT: Source = {
  type: 'company-practice',
  note: 'Draft from the existing slitter.ai clearance guide; pending engineer review.',
}

export const SLITTING_DATA: SlittingData = {
  version: '2026-11-draft',
  reviewedAt: null,
  reviewer: null,
  clearance: [
    { material: 'mild-steel', thicknessMm: [0.3, 0.8], clearancePct: [5, 8], source: DRAFT },
    { material: 'mild-steel', thicknessMm: [0.8, 2.0], clearancePct: [7, 10], source: DRAFT },
    { material: 'mild-steel', thicknessMm: [2.0, 4.0], clearancePct: [9, 12], source: DRAFT },
    { material: 'stainless-steel', thicknessMm: [0.3, 1.5], clearancePct: [4, 7], source: DRAFT },
    { material: 'stainless-steel', thicknessMm: [1.5, 4.0], clearancePct: [6, 9], source: DRAFT },
    { material: 'aluminum', thicknessMm: [0.5, 2.0], clearancePct: [6, 10], source: DRAFT },
    { material: 'copper', thicknessMm: [0.3, 1.5], clearancePct: [5, 8], source: DRAFT },
  ],
}

export const MATERIALS: MaterialKey[] = ['mild-steel', 'stainless-steel', 'aluminum', 'copper']

export function getClearance(
  material: MaterialKey,
  thicknessMm: number,
  data: SlittingData = SLITTING_DATA,
): { min: number; max: number; thicknessMm: [number, number]; source: Source } | null {
  const row = data.clearance.find(
    r => r.material === material && thicknessMm >= r.thicknessMm[0] && thicknessMm < r.thicknessMm[1],
  )
  if (!row) return null
  return { min: row.clearancePct[0], max: row.clearancePct[1], thicknessMm: row.thicknessMm, source: row.source }
}

export function clearanceRows(material: MaterialKey, data: SlittingData = SLITTING_DATA): ClearanceRow[] {
  return data.clearance.filter(r => r.material === material)
}

export function isReviewed(data: SlittingData = SLITTING_DATA): boolean {
  return Boolean(data.reviewedAt && data.reviewer)
}

export function assertPublishable(data: SlittingData = SLITTING_DATA): void {
  if (!isReviewed(data)) {
    throw new Error('分條數據尚未經工程師審核：請在 data/slitting.ts 填入 reviewedAt 與 reviewer 後再正式上線。')
  }
}
