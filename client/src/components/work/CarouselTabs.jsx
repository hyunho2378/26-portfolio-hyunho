import { useRef } from 'react'
import { color, type as typeToken, space, layout } from '../../tokens.js'

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'UX', value: 'ux' },
  { label: 'Visual', value: 'visual' },
  { label: 'Vibe Coding', value: 'dev' },
]

export default function CarouselTabs({ activeTab, onChange }) {
  const tabRefs = useRef([])

  function handleKeyDown(e, idx) {
    let next = null
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      next = (idx - 1 + TABS.length) % TABS.length
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      next = (idx + 1) % TABS.length
    } else {
      return
    }
    tabRefs.current[next]?.focus()
    onChange(TABS[next].value)
  }

  return (
    <div
      role="tablist"
      aria-label="프로젝트 타입 필터"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: space[1],
        padding: `0 clamp(${layout.pagePadX.base}, 5vw, ${layout.pagePadX.xl})`,
      }}
    >
      {TABS.map(({ label, value }, idx) => {
        const isActive = activeTab === value
        return (
          <button
            key={value}
            ref={(el) => { tabRefs.current[idx] = el }}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: `${space[2]} ${space[3]}`,
              fontSize: typeToken.label.size,
              fontWeight: typeToken.label.weight,
              fontFamily: 'Pretendard, sans-serif',
              letterSpacing: typeToken.label.ls,
              color: isActive ? color.accent : color.muted,
              transition: 'color 200ms ease',
              outline: 'none',
              whiteSpace: 'nowrap',
              lineHeight: 1.4,
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = color.paper }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = color.muted }}
            onFocus={(e) => {
              if (!isActive) {
                e.currentTarget.style.outline = `2px solid ${color.accent}`
                e.currentTarget.style.outlineOffset = '2px'
              }
            }}
            onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
