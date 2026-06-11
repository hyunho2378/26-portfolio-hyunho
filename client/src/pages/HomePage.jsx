import { useMemo, useRef, useState } from 'react'
import { projects } from '../data/projects.js'
import Splash from '../components/intro/Splash.jsx'
import AboutLayer from '../components/about/AboutLayer.jsx'
import ContactLayer from '../components/about/ContactLayer.jsx'
import CarouselTabs from '../components/work/CarouselTabs.jsx'
import StackCarousel from '../components/work/StackCarousel.jsx'
import ProjectDetail from '../components/work/ProjectDetail.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import { color, type as typeToken, space, layout } from '../tokens.js'
import { profile } from '../data/profile.js'

// 타입별 번호 맵(타입 내 1-based) — All 탭에서도 타입별 번호 유지
const TYPE_ORDER = ['ux', 'dev', 'visual']
const ordered = TYPE_ORDER.flatMap((t) => projects.filter((p) => p.type === t))
const numberMap = {}
ordered.forEach((p, i) => { numberMap[p.id] = i + 1 })

function NavButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: `${space[3]} ${space[4]}`,
        fontSize: typeToken.label.size,
        fontWeight: typeToken.label.weight,
        fontFamily: 'Pretendard, sans-serif',
        letterSpacing: typeToken.label.ls,
        color: color.paper,
        position: 'relative',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        const ul = e.currentTarget.querySelector('.nav-ul')
        if (ul) ul.style.width = `calc(100% - ${space[8]})`
      }}
      onMouseLeave={(e) => {
        const ul = e.currentTarget.querySelector('.nav-ul')
        if (ul) ul.style.width = '0%'
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = `2px solid ${color.accent}`
        e.currentTarget.style.outlineOffset = '3px'
      }}
      onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
    >
      {children}
      <span
        className="nav-ul"
        aria-hidden="true"
        style={{
          display: 'block',
          position: 'absolute',
          bottom: '4px',
          left: space[4],
          height: '1.5px',
          width: '0%',
          backgroundColor: color.accent,
          transition: 'width 220ms cubic-bezier(0.22,1,0.36,1)',
          pointerEvents: 'none',
        }}
      />
    </button>
  )
}

export default function HomePage() {
  const [introDone, setIntroDone] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [detail, setDetail] = useState(null) // { project, rect, number }
  const carouselRef = useRef(null)

  const filtered = useMemo(
    () => (activeTab === 'all' ? ordered : ordered.filter((p) => p.type === activeTab)),
    [activeTab]
  )

  function focusCarousel() {
    carouselRef.current?.focus()
  }

  return (
    <>
      {!introDone && <Splash onDone={() => setIntroDone(true)} />}

      <main
        style={{
          minHeight: '100vh',
          backgroundColor: color.ink,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: space[6],
          paddingBottom: space[6],
          boxSizing: 'border-box',
          overflowX: 'hidden',
        }}
      >
        {/* ── 상단 바: 로고(좌) + 타이틀(우) ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexShrink: 0,
            paddingTop: space[2],
            paddingLeft: `clamp(${layout.pagePadX.base}, 5vw, ${layout.pagePadX.xl})`,
            paddingRight: `clamp(${layout.pagePadX.base}, 5vw, ${layout.pagePadX.xl})`,
          }}
        >
          <button
            aria-label="홈"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
            onClick={focusCarousel}
          >
            <img
              src="/logo-ho.svg"
              alt="HO"
              style={{ width: 'clamp(40px, 4vw, 60px)', height: 'auto', display: 'block' }}
            />
          </button>

          <div style={{ textAlign: 'right' }}>
            <SectionLabel>2026 PORTFOLIO / VOL.01</SectionLabel>
            <p
              style={{
                marginTop: space[1],
                fontSize: typeToken.small.size,
                fontFamily: 'Pretendard, sans-serif',
                color: color.paper,
                letterSpacing: '0.04em',
              }}
            >
              {profile.name}
            </p>
          </div>
        </div>

        {/* ── 중앙: 탭 + 하단 스택 캐러셀 ── */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            paddingTop: space[6],
          }}
        >
          <CarouselTabs activeTab={activeTab} onChange={setActiveTab} />
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <StackCarousel
              ref={carouselRef}
              projects={filtered}
              numberMap={numberMap}
              onSelect={(p, rect) => setDetail({ project: p, rect, number: numberMap[p.id] })}
            />
          </div>
        </div>

        {/* ── 하단 트리거 바 ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: space[2],
            flexShrink: 0,
          }}
        >
          <NavButton onClick={focusCarousel}>WORK</NavButton>
          <span
            aria-hidden="true"
            style={{ color: color.muted, fontFamily: 'Pretendard, sans-serif', fontSize: typeToken.label.size, userSelect: 'none' }}
          >
            ·
          </span>
          <NavButton onClick={() => setAboutOpen(true)}>ABOUT</NavButton>
          <span
            aria-hidden="true"
            style={{ color: color.muted, fontFamily: 'Pretendard, sans-serif', fontSize: typeToken.label.size, userSelect: 'none' }}
          >
            ·
          </span>
          <NavButton onClick={() => setContactOpen(true)}>CONTACT</NavButton>
        </div>
      </main>

      <AboutLayer open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactLayer open={contactOpen} onClose={() => setContactOpen(false)} />

      {detail && (
        <ProjectDetail
          project={detail.project}
          rect={detail.rect}
          number={detail.number}
          onClose={() => setDetail(null)}
        />
      )}
    </>
  )
}