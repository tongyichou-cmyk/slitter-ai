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
    <aside
      style={{
        background: '#141414',
        border: '1px solid #242424',
        borderTop: '3px solid #F5C400',
        borderRadius: '4px',
        overflow: 'hidden',
        fontSize: '13px',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: '#1A1A1A',
          padding: '10px 14px',
          borderBottom: '1px solid #242424',
        }}
      >
        <p
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '12px',
            fontWeight: 600,
            color: '#E8E8E8',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {title}
        </p>
      </div>

      {/* Table rows */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{ borderBottom: i < rows.length - 1 ? '1px solid #242424' : 'none' }}
            >
              <td
                style={{
                  padding: '8px 14px',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '11px',
                  color: '#555555',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  verticalAlign: 'top',
                  whiteSpace: 'nowrap',
                  width: '40%',
                }}
              >
                {row.label}
              </td>
              <td style={{ padding: '8px 14px 8px 4px', color: '#E8E8E8', verticalAlign: 'top' }}>
                {Array.isArray(row.value) ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {row.value.map((v, j) => (
                      <span
                        key={j}
                        style={{
                          background: '#1A1A1A',
                          border: '1px solid #2E2E2E',
                          borderRadius: '2px',
                          padding: '2px 6px',
                          fontSize: '11px',
                          fontFamily: '"IBM Plex Mono", monospace',
                          color: '#E8E8E8',
                        }}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span style={{ fontSize: '13px' }}>{row.value}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  )
}
