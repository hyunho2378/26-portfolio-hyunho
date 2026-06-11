import { useRef } from 'react'
import { color, type as typeToken } from '../../tokens.js'

const TABS = [
  { label: 'UX', value: 'ux' },
  { label: 'Visual Design', value: 'visual' },
  { label: 'Vibe Coding', value: 'dev' },
]

export default function TypeTabs({ active, onChange }) {
  const tabRefs = useRef([])

  function handleKeyDown(e, index) {
    let next = index
    if (e.key === 'ArrowRight') next = (index + 1) % TABS.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + TABS.length) % TABS.length
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onChange(TABS[index].value)
      return
    } else return

    e.preventDefault()
    onChange(TABS[next].value)
    tabRefs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label="프로젝트 타입 선택"
      style={{
        display: 'flex',
        gap: '32px',
        borderBottom: `1px solid ${color.line}`,
      }}
    >
      {TABS.map(({ label, value }, i) => {
        const isActive = active === value
        return (
          <button
            key={value}
            ref={(el) => { tabRefs.current[i] = el }}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: isActive ? `2px solid ${color.accent}` : '2px solid transparent',
              marginBottom: '-1px',
              cursor: 'pointer',
              padding: '12px 0',
              fontSize: typeToken.body.size,
              fontWeight: isActive ? 600 : 400,
              fontFamily: 'Pretendard, sans-serif',
              color: isActive ? color.accent : color.muted,
              letterSpacing: '0',
              transition: 'color 150ms ease, border-color 150ms ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.color = color.paper
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.color = color.muted
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 2px ${color.accent}`
              e.currentTarget.style.borderRadius = '2px'
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
