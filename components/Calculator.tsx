'use client'
import { useState } from 'react'

const MATERIALS: Record<string, { hardness: string; recommendedClearance: string; notes: string }> = {
  'steel-mild': { hardness: '120–180 HB', recommendedClearance: '5–8%', notes: 'Suitable for standard HSS or carbide knives.' },
  'steel-stainless': { hardness: '180–240 HB', recommendedClearance: '6–10%', notes: 'Use carbide knives. Higher clearance reduces edge chipping.' },
  'aluminum': { hardness: '40–100 HB', recommendedClearance: '3–5%', notes: 'Low clearance maintains edge quality. Use coated knives.' },
  'copper-foil': { hardness: '40–80 HB', recommendedClearance: '2–4%', notes: 'Ultra-low clearance for burr-free edges. Precision grind required.' },
  'pet-film': { hardness: 'N/A', recommendedClearance: '0–2%', notes: 'Near-zero clearance. Shear angle critical.' },
  'lithium-separator': { hardness: 'N/A', recommendedClearance: '0–1%', notes: 'Precision carbide knives mandatory. Zero tolerance for burrs.' },
  'paper': { hardness: 'N/A', recommendedClearance: '3–6%', notes: 'Standard HSS acceptable for low volumes.' },
}

export default function Calculator() {
  const [material, setMaterial] = useState('')
  const [thickness, setThickness] = useState('')
  const [result, setResult] = useState<{ min: number; max: number; notes: string } | null>(null)

  function calculate() {
    if (!material || !thickness) return
    const t = parseFloat(thickness)
    if (isNaN(t) || t <= 0) return
    const mat = MATERIALS[material]
    const [minPct, maxPct] = mat.recommendedClearance.split('–').map(s => parseFloat(s) / 100)
    setResult({ min: parseFloat((t * minPct).toFixed(4)), max: parseFloat((t * maxPct).toFixed(4)), notes: mat.notes })
  }

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">Slitter Clearance Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
          <select
            value={material}
            onChange={e => { setMaterial(e.target.value); setResult(null) }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Select material...</option>
            <option value="steel-mild">Mild Steel</option>
            <option value="steel-stainless">Stainless Steel</option>
            <option value="aluminum">Aluminum</option>
            <option value="copper-foil">Copper Foil</option>
            <option value="pet-film">PET Film</option>
            <option value="lithium-separator">Lithium Battery Separator</option>
            <option value="paper">Paper / Cardboard</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Material Thickness (mm)</label>
          <input
            type="number"
            step="0.01"
            min="0.001"
            value={thickness}
            onChange={e => { setThickness(e.target.value); setResult(null) }}
            placeholder="e.g. 0.5"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <button
          onClick={calculate}
          disabled={!material || !thickness}
          className="w-full py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 disabled:opacity-40 transition-colors"
        >
          Calculate Clearance
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="font-semibold text-green-900">Recommended Clearance</p>
          <p className="text-2xl font-bold text-green-700 mt-1">
            {result.min} – {result.max} mm
          </p>
          <p className="text-sm text-gray-600 mt-2">{result.notes}</p>
          <p className="text-xs text-gray-400 mt-3">
            These are engineering guidelines. Actual clearance may vary based on machine geometry and knife condition.
          </p>
        </div>
      )}
    </div>
  )
}
