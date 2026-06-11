import { useState } from 'react'
import { color, type as typeToken, space } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'

const PREVIEW = 4

function Row({ year, text, tier, accent, forceWhite }) {
  let textColor = color.paper
  if (!forceWhite) {
    if (tier === 'faint') textColor = color.muted
    if (accent) textColor = color.accent
  }

  return (
    <li
      style={{
        display: 'flex',
        gap: space[4],
        paddingTop: '7px',
        paddingBottom: '7px',
      }}
    >
      <span
        style={{
          width: '36px',
          flexShrink: 0,
          paddingTop: '2px',
          fontSize: '12px',
          fontFamily: 'Pretendard, sans-serif',
          color: color.muted,
          letterSpacing: '0.02em',
        }}
      >
        {year}
      </span>
      <span
        style={{
          fontSize: typeToken.small.size,
          fontFamily: 'Pretendard, sans-serif',
          lineHeight: 1.55,
          color: textColor,
        }}
      >
        {text}
      </span>
    </li>
  )
}

export default function CollapsibleList({ label, items, collapsible = false, forceWhite = false }) {
  const [expanded, setExpanded] = useState(false)

  if (!items || items.length === 0) return null

  const sorted = [...items].sort((a, b) => parseInt(b.year) - parseInt(a.year))
  const visible = collapsible && !expanded ? sorted.slice(0, PREVIEW) : sorted
  const hasMore = collapsible && sorted.length > PREVIEW

  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <ul
        style={{
          marginTop: space[4],
          listStyle: 'none',
          padding: 0,
        }}
      >
        {visible.map((item, i) => (
          <Row
            key={`${item.year}-${i}`}
            year={item.year}
            text={item.text}
            tier={item.tier}
            accent={item.accent}
            forceWhite={forceWhite}
          />
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setExpanded((e) => !e)}
          style={{
            marginTop: space[3],
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
            fontSize: '12px',
            fontFamily: 'Pretendard, sans-serif',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: color.muted,
            transition: 'color 150ms ease',
            outline: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = color.paper }}
          onMouseLeave={(e) => { e.currentTarget.style.color = color.muted }}
          onFocus={(e) => {
            e.currentTarget.style.outline = `2px solid ${color.accent}`
            e.currentTarget.style.outlineOffset = '2px'
          }}
          onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
        >
          {expanded ? '접기' : `+${sorted.length - PREVIEW}개 더보기`}
        </button>
      )}
    </div>
  )
}