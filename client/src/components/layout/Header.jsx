import { useEffect, useState } from 'react'
import { color, layout } from '../../tokens.js'

const NAV_ITEMS = [
  { label: 'ABOUT', id: 'about' },
  { label: 'WORK', id: 'work' },
  { label: 'CONTACT', id: 'contact' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(24,24,24,0.80)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 200ms cubic-bezier(0.22,1,0.36,1), backdrop-filter 200ms cubic-bezier(0.22,1,0.36,1)',
        borderBottom: scrolled ? `1px solid ${color.line}` : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: layout.containerSite,
          margin: '0 auto',
          padding: `0 clamp(${layout.pagePadX.base}, 5vw, ${layout.pagePadX.xl})`,
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* 로고 */}
        <button
          onClick={scrollToTop}
          aria-label="홈으로 이동"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            minWidth: '44px',
            minHeight: '44px',
            borderRadius: layout.radius.sm,
          }}
          className="focus-visible-accent"
          onFocus={(e) => {
            e.currentTarget.style.outline = `2px solid ${color.accent}`
            e.currentTarget.style.outlineOffset = '2px'
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none'
          }}
        >
          <img
            src="/logo-ho.svg"
            alt="HO 로고"
            style={{ height: '28px', width: 'auto', display: 'block' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'block'
            }}
          />
          <span
            style={{
              display: 'none',
              fontWeight: 700,
              fontSize: '18px',
              color: color.paper,
              letterSpacing: '-0.02em',
            }}
          >
            HO
          </span>
        </button>

        {/* 앵커 네비 */}
        <nav aria-label="페이지 내 이동">
          <ul
            style={{
              display: 'flex',
              gap: '32px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {NAV_ITEMS.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 4px',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: color.muted,
                    fontFamily: 'Pretendard, sans-serif',
                    transition: `color 150ms ease`,
                    borderRadius: layout.radius.sm,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = color.paper }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = color.muted }}
                  onFocus={(e) => {
                    e.currentTarget.style.color = color.paper
                    e.currentTarget.style.outline = `2px solid ${color.accent}`
                    e.currentTarget.style.outlineOffset = '2px'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.color = color.muted
                    e.currentTarget.style.outline = 'none'
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
