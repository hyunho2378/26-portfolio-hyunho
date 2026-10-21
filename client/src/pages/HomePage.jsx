import { useMemo, useRef, useState } from 'react'
import { projects } from '../data/projects.js'
import Splash from '../components/intro/Splash.jsx'
import AboutLayer from '../components/about/AboutLayer.jsx'
import ContactLayer from '../components/about/ContactLayer.jsx'
import CarouselTabs from '../components/work/CarouselTabs.jsx'
import StackCarousel from '../components/work/StackCarousel.jsx'
import ProjectDetail from '../components/work/ProjectDetail.jsx'
import TabBar from '../components/layout/TabBar.jsx'
import { color, type as typeToken, space, layout, font, tracking, ios } from '../tokens.js'
import { profile } from '../data/profile.js'

// 타입별 번호 맵(타입 내 1-based) — All 탭에서도 타입별 번호 유지
const TYPE_ORDER = ['ux', 'dev', 'visual']
const ordered = TYPE_ORDER.flatMap((t) => projects.filter((p) => p.type === t))
const numberMap = {}
ordered.forEach((p, i) => { numberMap[p.id] = i + 1 })

const padX = `clamp(${ios.margin}, 5vw, ${layout.pagePadX.xl})`

export default function HomePage() {
  const [introDone, setIntroDone] = useState(false)
  const [layer, setLayer] = useState(null) // null | 'about' | 'contact'
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

  // 하단 내비: 한 번에 하나의 레이어만 연다. Work는 레이어를 닫고 캐러셀로.
  function onNav(id) {
    if (id === 'work') { setLayer(null); focusCarousel(); return }
    setLayer((cur) => (cur === id ? null : id))
  }

  return (
    <>
      {!introDone && <Splash onDone={() => setIntroDone(true)} />}

      <main
        className="home-main"
        style={{
          backgroundColor: color.ink,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: `max(${space[6]}, env(safe-area-inset-top))`,
          paddingBottom: ios.tabBar.space,
          boxSizing: 'border-box',
          overflow: 'hidden',
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
            paddingLeft: padX,
            paddingRight: padX,
          }}
        >
          <button
            aria-label="홈"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, minWidth: layout.touch, minHeight: layout.touch, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
            onClick={() => onNav('work')}
          >
            <img
              src="/logo-ho.svg"
              alt="HO"
              style={{ width: 'clamp(40px, 3.2vw, 72px)', height: 'auto', display: 'block' }}
            />
          </button>

          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                display: 'inline-flex',
                textTransform: 'uppercase',
                fontSize: typeToken.labelLg.size,
                fontWeight: typeToken.labelLg.weight,
                letterSpacing: typeToken.labelLg.ls,
                color: color.accent,
                fontFamily: font.body,
              }}
            >
              2026 PORTFOLIO / VOL.03
            </span>
            <p
              style={{
                marginTop: space[1],
                fontSize: typeToken.small.size,
                fontFamily: font.body,
                color: color.paper,
                letterSpacing: tracking.md,
              }}
            >
              {profile.name}
            </p>
          </div>
        </div>

        {/* ── 중앙: 탭 + 캐러셀(남은 높이를 모두 채움) ── */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            paddingTop: 'clamp(16px, 2.2vh, 40px)',
          }}
        >
          <CarouselTabs activeTab={activeTab} onChange={setActiveTab} />
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <StackCarousel
              ref={carouselRef}
              projects={filtered}
              numberMap={numberMap}
              hiddenId={detail?.project.id ?? null}
              onSelect={(p, rect) => setDetail({ project: p, rect, number: numberMap[p.id] })}
            />
          </div>
        </div>
      </main>

      <TabBar active={layer || 'work'} onSelect={onNav} hidden={!!detail} />

      <AboutLayer open={layer === 'about'} onClose={() => setLayer(null)} />
      <ContactLayer open={layer === 'contact'} onClose={() => setLayer(null)} />

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
