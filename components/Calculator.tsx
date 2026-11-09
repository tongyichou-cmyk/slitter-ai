'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { MATERIALS, clearanceRows, type MaterialKey } from '@/data/slitting'
import { calculateClearance, type ClearanceResult } from '@/lib/calculator'

const fmt = (n: number) => Number(n.toFixed(4)).toString()

export default function Calculator() {
  const t = useTranslations('calculator')
  const tm = useTranslations('materials')
  const locale = useLocale()
  const [material, setMaterial] = useState<MaterialKey | ''>('')
  const [thickness, setThickness] = useState('')
  const [result, setResult] = useState<ClearanceResult | null>(null)
  const [error, setError] = useState('')

  function calculate() {
    setResult(null)
    if (!material || !thickness) return setError(t('errorMissing'))
    const value = parseFloat(thickness)
    if (!Number.isFinite(value) || value <= 0) return setError(t('errorInvalid'))
    const res = calculateClearance(material, value)
    if (!res) {
      const rows = clearanceRows(material)
      const min = Math.min(...rows.map(r => r.thicknessMm[0]))
      const max = Math.max(...rows.map(r => r.thicknessMm[1]))
      return setError(t('outOfRange', { min, max }))
    }
    setError('')
    setResult(res)
  }

  const disabled = !material || !thickness
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: '#1A1512', marginBottom: '6px', fontFamily: 'var(--font-mono)' } as const
  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #D8CFC4', borderRadius: '6px', fontSize: '14px', color: '#1A1512', background: '#F7F3EE', outline: 'none', boxSizing: 'border-box' } as const

  return (
    <div style={{ maxWidth: '520px', padding: '28px', border: '1px solid #D8CFC4', borderRadius: '8px', background: '#FFFFFF' }}>
      <div className="space-y-5">
        <div>
          <label htmlFor="calc-material" style={labelStyle}>{t('material')}</label>
          <select
            id="calc-material"
            value={material}
            onChange={e => { setMaterial(e.target.value as MaterialKey | ''); setResult(null); setError('') }}
            style={inputStyle}
          >
            <option value="">{t('selectMaterial')}</option>
            {MATERIALS.map(m => <option key={m} value={m}>{tm(m)}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="calc-thickness" style={labelStyle}>{t('thickness')}</label>
          <input
            id="calc-thickness"
            type="number"
            step="0.01"
            min="0.001"
            value={thickness}
            onChange={e => { setThickness(e.target.value); setResult(null); setError('') }}
            placeholder={t('placeholder')}
            style={inputStyle}
          />
        </div>

        {error && <p role="alert" style={{ fontSize: '13px', color: '#B91C1C', margin: 0 }}>{error}</p>}

        <button
          type="button"
          onClick={calculate}
          disabled={disabled}
          style={{
            width: '100%', padding: '10px', fontWeight: 600, fontSize: '14px', border: 'none', borderRadius: '6px',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.02em', transition: 'background 0.15s',
            background: disabled ? '#D8CFC4' : '#B8860B', color: disabled ? '#8A7A6E' : '#FFFFFF', cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {t('calculate')}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '24px', padding: '20px', background: '#F0F7F0', border: '1px solid #86C67A', borderRadius: '8px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: '#2D6A27', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
            {t('result')}
          </p>
          <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '32px', fontWeight: 700, color: '#1A4A1A', margin: '6px 0 0' }}>
            {fmt(result.mmMin)} – {fmt(result.mmMax)} <span style={{ fontSize: '18px' }}>mm</span>
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4A7A44', margin: '4px 0 0' }}>
            {t('pctOfThickness', { min: result.pctMin, max: result.pctMax })}
          </p>
          <p style={{ fontSize: '13px', color: '#2D4A2D', marginTop: '12px', lineHeight: 1.6 }}>
            {t('basis', { min: result.thicknessRangeMm[0], max: result.thicknessRangeMm[1] })}{' '}
            <Link href={`/${locale}/data/slitting-clearance`} style={{ textDecoration: 'underline' }}>{t('seeData')}</Link>
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#6A8A64', marginTop: '12px' }}>{t('disclaimer')}</p>
        </div>
      )}
    </div>
  )
}
