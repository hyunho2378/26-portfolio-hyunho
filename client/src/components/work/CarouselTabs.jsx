import { useRef } from 'react'
import { color, type as typeToken, space, layout, font, motion, ios } from '../../tokens.js'

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'UX', value: 'ux' },
  { label: 'Visual', value: 'visual' },
  { label: 'Vibe Coding', value: 'dev' },
]

export default function CarouselTabs({ activeTab, onChange }) {
  const tabRefs = useRef([])

  function handleKeyDown(e, idx) {
    let next
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
      className="carousel-tabs"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: space[1],
        padding: `0 calc(clamp(${ios.margin}, 5vw, ${layout.pagePadX.xl}) - ${space[3]})`,
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
              minHeight: layout.touch,
              minWidth: layout.touch,
              padding: `0 ${space[3]}`,
              fontSize: typeToken.labelLg.size,
              fontWeight: typeToken.labelLg.weight,
              fontFamily: font.body,
              letterSpacing: typeToken.labelLg.ls,
              color: isActive ? color.accent : color.muted,
              transition: `color ${motion.base} ease`,
              whiteSpace: 'nowrap',
              lineHeight: 1.4,
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = color.paper }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = color.muted }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
