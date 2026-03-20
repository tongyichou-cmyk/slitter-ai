'use client'

interface DataTableProps {
  headers: string[]
  rows: (string | number)[][]
  caption?: string
}

function downloadCSV(headers: string[], rows: (string | number)[][], caption?: string) {
  const filename = (caption ?? 'data').toLowerCase().replace(/\s+/g, '-') + '.csv'
  const lines = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function DataTable({ headers, rows, caption }: DataTableProps) {
  return (
    <div style={{ margin: '24px 0' }}>
      {/* Table header with CSV button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0',
        }}
      >
        {caption && (
          <p
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '12px',
              color: '#555555',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '8px',
            }}
          >
            {caption}
          </p>
        )}
        <button
          onClick={() => downloadCSV(headers, rows, caption)}
          style={{
            marginLeft: 'auto',
            marginBottom: '8px',
            padding: '4px 10px',
            background: 'transparent',
            border: '1px solid #2E2E2E',
            borderRadius: '3px',
            color: '#999999',
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '11px',
            cursor: 'pointer',
          }}
        >
          ↓ CSV
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
            border: '1px solid #242424',
          }}
        >
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  style={{
                    background: '#F5C400',
                    color: '#080808',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '10px 14px',
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderRight: i < headers.length - 1 ? '1px solid #D4A800' : 'none',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                style={{
                  background: ri % 2 === 0 ? '#141414' : '#1A1A1A',
                  transition: 'background 0.12s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.background = '#242424')}
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLTableRowElement).style.background =
                    ri % 2 === 0 ? '#141414' : '#1A1A1A')
                }
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      padding: '9px 14px',
                      color: '#E8E8E8',
                      borderBottom: '1px solid #242424',
                      borderRight: ci < row.length - 1 ? '1px solid #242424' : 'none',
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
