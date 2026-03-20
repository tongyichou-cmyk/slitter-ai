interface QuickFactsRow {
  label: string
  value: string | string[]
}

interface QuickFactsProps {
  title: string
  rows: QuickFactsRow[]
}

export default function QuickFacts({ title, rows }: QuickFactsProps) {
  return (
    <aside style={{ background: '#1A1410', border: '1px solid #2A2018', borderTop: '3px solid #B8860B', borderRadius: '4px', overflow: 'hidden' }}>
      {/* Title bar */}
      <div style={{ background: '#120E0A', padding: '10px 14px', borderBottom: '1px solid #2A2018' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, color: '#B8860B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {title}
        </p>
      </div>

      {/* Table rows */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid #2A2018' : 'none' }}>
              <td style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: '#6A5A48', textTransform: 'uppercase', letterSpacing: '0.05em', verticalAlign: 'top', whiteSpace: 'nowrap', width: '40%' }}>
                {row.label}
              </td>
              <td style={{ padding: '8px 14px 8px 4px', verticalAlign: 'top' }}>
                {Array.isArray(row.value) ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {row.value.map((v, j) => (
                      <span key={j} style={{ background: '#1A1410', border: '1px solid #2A2018', borderRadius: '2px', padding: '2px 6px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#C8B89A' }}>
                        {v}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#C8B89A' }}>{row.value}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  )
}
