import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { color, type as typeToken, space, layout, font, motion, tracking } from '../../tokens.js'
import { profile } from '../../data/profile.js'
import { useLayer } from '../../lib/useLayer.js'
import IconButton from '../ui/IconButton.jsx'
import { ProfilePage, ListPage } from './AboutPages.jsx'

const DUR = 400
const SWIPE_MIN = 50

// 한 화면에 한 섹션. 넘겨가며 본다.
const PAGES = [
  { id: 'profile', label: 'PROFILE', render: () => <ProfilePage /> },
  { id: 'award', label: 'AWARD', count: profile.awards.length, render: () => <ListPage label="AWARD" items={profile.awards} cols={{ md: 2, xl: 2 }} /> },
  { id: 'activities', label: 'ACTIVITIES', count: profile.activities.length, render: () => <ListPage label="LEADERSHIP & ACTIVITIES" items={profile.activities} cols={{ md: 2, xl: 2 }} /> },
  { id: 'experience', label: 'EXPERIENCE', count: profile.experience.length, render: () => <ListPage label="EXPERIENCE" items={profile.experience} cols={{ md: 2, xl: 3 }} /> },
]

// 큰 화면(1440x900 초과)에서는 레이어 전체를 비율대로 키워 한 화면을 채운다.
const BASE_W = 1440
const BASE_H = 900
const MAX_ZOOM = 2.5
function calcZoom() {
  if (typeof window === 'undefined' || window.innerWidth < BASE_W) return 1
  return Math.min(MAX_ZOOM, Math.max(1, Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H)))
}

const padX = `clamp(${layout.pagePadX.base}, 5vw, ${layout.pagePadX.xl})`

export default function AboutLayer({ open, onClose }) {
  const [page, setPage] = useState(0)
  const touchRef = useRef(null)
  const [zoom, setZoom] = useState(calcZoom)

  useEffect(() => {
    function onResize() { setZoom(calcZoom()) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const { mounted, shown, reduced, ref } = useLayer({ open, onClose, dur: DUR, onExited: () => setPage(0) })

  useEffect(() => {
    if (!open) return undefined
    function onKey(e) {
      if (e.key === 'ArrowRight') setPage((p) => Math.min(p + 1, PAGES.length - 1))
      if (e.key === 'ArrowLeft') setPage((p) => Math.max(p - 1, 0))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!mounted) return null

  const last = PAGES.length - 1
  const current = PAGES[page]

  function onTouchStart(e) {
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY }
  }
  function onTouchEnd(e) {
    const s = touchRef.current
    touchRef.current = null
    if (!s) return
    const t = e.changedTouches[0]
    const dx = t.clientX - s.x
    const dy = t.clientY - s.y
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy)) return
    setPage((p) => (dx < 0 ? Math.min(p + 1, last) : Math.max(p - 1, 0)))
  }

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="About"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        zoom,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: color.overlay.strong,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        opacity: shown ? 1 : 0,
        transition: reduced ? 'none' : `opacity ${DUR}ms ease`,
      }}
    >
      {/* 상단: 섹션 탭 + 닫기 */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: space[4],
          flexShrink: 0,
          padding: `${space[4]} ${padX}`,
        }}
      >
        <div role="tablist" aria-label="About 섹션" className="about-tabs" style={{ display: 'flex', gap: space[2] }}>
          {PAGES.map((p, i) => {
            const active = i === page
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`about-tab-${p.id}`}
                aria-selected={active}
                aria-controls="about-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setPage(i)}
                className="hover:opacity-70"
                style={{
                  minHeight: layout.touch,
                  padding: `0 ${space[3]}`,
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${active ? color.accent : 'transparent'}`,
                  cursor: 'pointer',
                  fontSize: typeToken.label.size,
                  fontWeight: typeToken.label.weight,
                  fontFamily: font.body,
                  letterSpacing: tracking.xl,
                  color: active ? color.accent : color.muted,
                  transition: `color ${motion.fast} ease, border-color ${motion.fast} ease`,
                }}
              >
                {p.label}
              </button>
            )
          })}
        </div>
        <span className="about-current" aria-hidden="true" style={{ fontSize: typeToken.label.size, fontWeight: typeToken.label.weight, fontFamily: font.body, letterSpacing: tracking.xl, color: color.accent }}>
          {current.label}{current.count ? ' ' + current.count : ''}
        </span>
        <IconButton label="닫기" onClick={onClose} data-autofocus>
          <X size={18} aria-hidden="true" />
        </IconButton>
      </header>

      {/* 본문: 한 화면 */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ flex: 1, minHeight: 0, position: 'relative' }}
      >
        <div
          key={current.id}
          id="about-panel"
          role="tabpanel"
          aria-labelledby={`about-tab-${current.id}`}
          className="about-page"
          style={{
            height: '100%',
            overflowY: 'auto',
            padding: `${space[4]} ${padX} ${space[6]}`,
            animation: reduced ? 'none' : `page-in ${motion.base} ${motion.ease}`,
          }}
        >
          {current.render()}
        </div>
      </div>

      {/* 하단: 이전 / 현재 위치 / 다음 */}
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: space[6],
          flexShrink: 0,
          padding: `${space[3]} ${padX} calc(${space[3]} + env(safe-area-inset-bottom))`,
        }}
      >
        <IconButton label="이전 섹션" onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
          <ChevronLeft size={18} aria-hidden="true" />
        </IconButton>
        <span
          role="status"
          aria-live="polite"
          style={{ minWidth: space[16], textAlign: 'center', fontSize: typeToken.small.size, fontFamily: font.body, color: color.muted }}
        >
          {String(page + 1).padStart(2, '0')} / {String(PAGES.length).padStart(2, '0')}
        </span>
        <IconButton label="다음 섹션" onClick={() => setPage((p) => Math.min(p + 1, last))} disabled={page === last}>
          <ChevronRight size={18} aria-hidden="true" />
        </IconButton>
      </footer>

      <style>{`
        .about-current { display: inline; }
        .about-list-head { display: none !important; }
        .about-tabs { display: none !important; }
        .about-profile { display: grid; gap: ${space[8]}; grid-template-columns: minmax(0, 1fr); align-content: start; }
        .about-cols { column-count: 1; column-gap: ${space[12]}; }
        @media (min-width: ${layout.breakpoints.md}px) {
          .about-current { display: none; }
          .about-list-head { display: flex !important; }
          .about-tabs { display: flex !important; }
          .about-profile { grid-template-columns: auto minmax(0, 1fr); gap: ${space[10]}; }
          .about-profile-tools { grid-column: 2; }
          .about-cols { column-count: var(--cols-md); }
        }
        @media (min-width: ${layout.breakpoints.lg}px) {
          .about-profile { grid-template-columns: auto minmax(0, 1.1fr) minmax(0, 1fr); gap: ${space[12]}; }
          .about-profile-tools { grid-column: auto; }
        }
        @media (min-width: ${layout.breakpoints.xl}px) {
          .about-cols { column-count: var(--cols-xl); }
        }
      `}</style>
    </div>
  )
}
