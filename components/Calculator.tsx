'use client'
import { useState } from 'react'

const MATERIALS: Record<string, { hardness: string; recommendedClearance: string; notes: string }> = {
  'steel-mild':        { hardness: '120–180 HB', recommendedClearance: '5–8%',  notes: 'Suitable for standard HSS or carbide knives.' },
  'steel-stainless':   { hardness: '180–240 HB', recommendedClearance: '6–10%', notes: 'Use carbide knives. Higher clearance reduces edge chipping.' },
  'steel-hsla':        { hardness: '200–280 HB', recommendedClearance: '7–11%', notes: 'High-strength steel — add 1–2% vs mild steel baseline.' },
  'steel-ahss':        { hardness: '280–450 HB', recommendedClearance: '9–14%', notes: 'AHSS springback requires extra clearance. Carbide mandatory.' },
  'aluminum':          { hardness: '40–100 HB',  recommendedClearance: '6–10%', notes: 'Low clearance maintains edge quality. Use coated knives.' },
  'copper-foil':       { hardness: '40–80 HB',   recommendedClearance: '5–8%',  notes: 'Ultra-low clearance for burr-free edges. Precision grind required.' },
  'silicon-steel':     { hardness: '160–200 HB', recommendedClearance: '4–6%',  notes: 'Abrasive material — carbide knives mandatory. Tight clearance minimises edge stress.' },
  'pet-film':          { hardness: 'N/A',         recommendedClearance: '0–2%',  notes: 'Near-zero clearance. Shear angle critical.' },
  'lithium-separator': { hardness: 'N/A',         recommendedClearance: '0–1%',  notes: 'Precision carbide knives mandatory. Zero tolerance for burrs.' },
  'paper':             { hardness: 'N/A',         recommendedClearance: '3–6%',  notes: 'Standard HSS acceptable for low volumes.' },
}

export default function Calculator() {
  const [material, setMaterial] = useState('')
  const [thickness, setThickness] = useState('')
  const [result, setResult] = useState<{ min: number; max: number; pctMin: number; pctMax: number; notes: string } | null>(null)
  const [error, setError] = useState('')

  function calculate() {
    setError('')
    if (!material || !thickness) { setError('Please select a material and enter thickness.'); return }
    const t = parseFloat(thickness)
    if (isNaN(t) || t <= 0) { setError('Please enter a valid thickness greater than 0.'); return }
    const mat = MATERIALS[material]
    const parts = mat.recommendedClearance.replace(/%/g, '').split('–')
    const minPct = parseFloat(parts[0]) / 100
    const maxPct = parseFloat(parts[1]) / 100
    setResult({
      min: parseFloat((t * minPct).toFixed(4)),
      max: parseFloat((t * maxPct).toFixed(4)),
      pctMin: parseFloat(parts[0]),
      pctMax: parseFloat(parts[1]),
      notes: mat.notes,
    })
  }

  return (
    <div style={{ maxWidth: '520px', padding: '28px', border: '1px solid #D8CFC4', borderRadius: '8px', background: '#FFFFFF' }}>
      <div className="space-y-5">

        {/* Material */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1A1512', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
            Material Type
          </label>
          <select
            value={material}
            onChange={e => { setMaterial(e.target.value); setResult(null); setError('') }}
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #D8CFC4', borderRadius: '6px', fontSize: '14px', color: '#1A1512', background: '#F7F3EE', outline: 'none' }}
          >
            <option value="">Select material…</option>
            <option value="steel-mild">Mild Steel (SPCC / Q235)</option>
            <option value="steel-stainless">Stainless Steel (304 / 316)</option>
            <option value="steel-hsla">High-Strength Steel (HSLA)</option>
            <option value="steel-ahss">Advanced High-Strength Steel (AHSS / DP)</option>
            <option value="aluminum">Aluminum (1xxx–5xxx)</option>
            <option value="copper-foil">Copper / Brass Foil</option>
            <option value="silicon-steel">Silicon Steel (Electrical / Motor)</option>
            <option value="pet-film">PET Film / Plastic Film</option>
            <option value="lithium-separator">Lithium Battery Separator</option>
            <option value="paper">Paper / Cardboard</option>
          </select>
        </div>

        {/* Thickness */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1A1512', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
            Material Thickness (mm)
          </label>
          <input
            type="number"
            step="0.01"
            min="0.001"
            value={thickness}
            onChange={e => { setThickness(e.target.value); setResult(null); setError('') }}
            placeholder="e.g. 0.5"
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #D8CFC4', borderRadius: '6px', fontSize: '14px', color: '#1A1512', background: '#F7F3EE', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Error */}
        {error && (
          <p style={{ fontSize: '13px', color: '#B91C1C', margin: 0 }}>{error}</p>
        )}

        {/* Button */}
        <button
          onClick={calculate}
          disabled={!material || !thickness}
          style={{
            width: '100%',
            padding: '10px',
            background: (!material || !thickness) ? '#D8CFC4' : '#B8860B',
            color: (!material || !thickness) ? '#8A7A6E' : '#FFFFFF',
            fontWeight: 600,
            fontSize: '14px',
            border: 'none',
            borderRadius: '6px',
            cursor: (!material || !thickness) ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.02em',
            transition: 'background 0.15s',
          }}
        >
          Calculate Clearance
        </button>
      </div>

      {/* Result */}
      {result && (
        <div style={{ marginTop: '24px', padding: '20px', background: '#F0F7F0', border: '1px solid #86C67A', borderRadius: '8px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: '#2D6A27', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
            Recommended Clearance
          </p>
          <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '32px', fontWeight: 700, color: '#1A4A1A', margin: '6px 0 0' }}>
            {result.min} – {result.max} <span style={{ fontSize: '18px' }}>mm</span>
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4A7A44', margin: '4px 0 0' }}>
            ({result.pctMin}–{result.pctMax}% of material thickness)
          </p>
          <p style={{ fontSize: '13px', color: '#2D4A2D', marginTop: '12px', lineHeight: 1.6 }}>
            {result.notes}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8AAA84', marginTop: '12px' }}>
            Engineering guideline only. Actual clearance may vary by machine geometry and knife condition.
          </p>
        </div>
      )}
    </div>
  )
}
