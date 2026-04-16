'use client'
import { useState } from 'react'

const MATERIALS: Record<string, { hardness: string; recommendedClearance: string; notes: string }> = {
  'steel-mild':        { hardness: '120–180 HB', recommendedClearance: '5–8%',  notes: 'HSS M2 works well for general runs. Carbide extends tool life on high-volume lines. Start at the lower end of the range and increase if burr appears on the bottom edge.' },
  'steel-stainless':   { hardness: '180–240 HB', recommendedClearance: '6–10%', notes: 'Stainless work-hardens quickly during cutting. Higher clearance (toward 10%) reduces edge stress on harder grades (316, 2205). Lower clearance (toward 6%) suits thin gauges where edge finish matters. HSS M42 is a cost-effective option for moderate volumes; carbide preferred for continuous high-speed running.' },
  'steel-hsla':        { hardness: '200–280 HB', recommendedClearance: '7–11%', notes: 'Higher yield strength means more springback — clearance should be 1–2% above what you would use for the same thickness in mild steel. Verify edge quality by checking that the fracture zone is clean, not torn.' },
  'steel-ahss':        { hardness: '280–450 HB', recommendedClearance: '9–14%', notes: 'Advanced high-strength steels (DP, CP, Martensitic) have significant springback after cutting. Insufficient clearance causes the cut edge to press back against the knife, leading to rapid wear or chipping. Start at 11–12% and adjust based on edge inspection. Knife grade selection depends on your volume and budget — consult your knife supplier.' },
  'aluminum':          { hardness: '40–100 HB',  recommendedClearance: '6–10%', notes: 'Softer alloys (1xxx, 3xxx) are forgiving — mid-range clearance works well. Harder alloys (5xxx, 6xxx) need tighter clearance to control rollover. TiN-coated knives reduce built-up edge (BUE) if aluminum sticks to the knife face.' },
  'copper-foil':       { hardness: '40–80 HB',   recommendedClearance: '5–8%',  notes: 'Copper is ductile and prone to rollover at the top edge. Keep clearance tight and verify knife runout (TIR ≤ 0.01mm) — any wobble shows directly in the slit edge. Freshly ground knives make a measurable difference.' },
  'silicon-steel':     { hardness: '160–200 HB', recommendedClearance: '4–6%',  notes: 'Silicon particles in the material are highly abrasive. Tight clearance is needed to minimise edge stress concentration, which causes microcracks that propagate during downstream stamping. Knife wear rate will be higher than for carbon steel — factor this into your regrind schedule.' },
  'pet-film':          { hardness: 'N/A',         recommendedClearance: '0–2%',  notes: 'Film slitting requires near-zero clearance and precise shear angle. Clearance above 2% produces a rough edge and possible film tearing. Knife sharpness has more influence on edge quality than clearance alone — inspect knife edge condition before each run.' },
  'lithium-separator': { hardness: 'N/A',         recommendedClearance: '0–1%',  notes: 'Extremely tight tolerance application. Even small burrs or particles cause cell short circuits. Knife flatness, TIR, and surface finish are as critical as clearance. This application typically requires dedicated knife sets that are tracked, logged, and replaced on a fixed interval regardless of apparent condition.' },
  'paper':             { hardness: 'N/A',         recommendedClearance: '3–6%',  notes: 'Paper is forgiving on clearance. Edge quality is more sensitive to knife sharpness and moisture content of the paper than to precise clearance setting. Wider clearance (toward 6%) reduces dust generation on coated stocks.' },
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
