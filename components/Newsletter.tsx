'use client'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      style={{
        padding: '24px',
        background: '#141414',
        border: '1px solid #2E2E2E',
        borderRadius: '6px',
      }}
    >
      <h3
        style={{
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontWeight: 600,
          fontSize: '15px',
          color: '#E8E8E8',
          marginBottom: '4px',
        }}
      >
        Industry Insights, Delivered
      </h3>
      <p style={{ fontSize: '13px', color: '#999999', marginBottom: '0' }}>
        Get technical updates on slitting technology.
      </p>

      {status === 'success' ? (
        <p style={{ marginTop: '16px', fontSize: '13px', color: '#F5C400', fontWeight: 500 }}>
          Thank you! You&apos;re subscribed.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '13px',
              fontFamily: '"IBM Plex Sans", sans-serif',
              background: '#0E0E0E',
              border: '1px solid #2E2E2E',
              borderRadius: '3px',
              color: '#E8E8E8',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '8px 16px',
              background: '#F5C400',
              color: '#080808',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: '"IBM Plex Mono", monospace',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              opacity: status === 'loading' ? 0.6 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#ff6b6b' }}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}
