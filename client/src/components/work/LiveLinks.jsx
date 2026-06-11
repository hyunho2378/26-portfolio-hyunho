import { ExternalLink } from 'lucide-react'
import { color, type as typeToken, space, layout } from '../../tokens.js'

export default function LiveLinks({ links }) {
  if (!links || links.length === 0) return null

  const isSingle = links.length === 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
      {links.map(({ label, url }) => {
        if (!url) return null
        return (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: space[2],
              padding: isSingle ? `${space[4]} ${space[6]}` : `${space[3]} ${space[5]}`,
              border: `1px solid ${isSingle ? color.accent : color.line}`,
              borderRadius: layout.radius.md,
              color: isSingle ? color.accent : color.paper,
              fontSize: isSingle ? typeToken.body.size : typeToken.small.size,
              fontWeight: 600,
              fontFamily: 'Pretendard, sans-serif',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'opacity 150ms ease, border-color 150ms ease, color 150ms ease',
              outline: 'none',
              alignSelf: 'flex-start',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `2px solid ${color.accent}`
              e.currentTarget.style.outlineOffset = '3px'
            }}
            onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
          >
            <ExternalLink size={16} aria-hidden="true" />
            {label}
          </a>
        )
      })}
    </div>
  )
}
