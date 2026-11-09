import { getClearance, type MaterialKey, type Source } from '@/data/slitting'

export type ClearanceResult = {
  pctMin: number
  pctMax: number
  mmMin: number
  mmMax: number
  thicknessRangeMm: [number, number]
  source: Source
}

export function calculateClearance(material: MaterialKey, thicknessMm: number): ClearanceResult | null {
  if (!Number.isFinite(thicknessMm) || thicknessMm <= 0) return null
  const row = getClearance(material, thicknessMm)
  if (!row) return null
  return {
    pctMin: row.min,
    pctMax: row.max,
    mmMin: (thicknessMm * row.min) / 100,
    mmMax: (thicknessMm * row.max) / 100,
    thicknessRangeMm: row.thicknessMm,
    source: row.source,
  }
}
