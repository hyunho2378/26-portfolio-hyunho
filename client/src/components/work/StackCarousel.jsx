import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { color, space } from '../../tokens.js'
import PosterCard from './PosterCard.jsx'

// ── 아치(부채꼴) 배치 상수 ──
// 각 카드를 화면 아래 먼 회전중심(ARC_RADIUS)을 기준으로 ARC_ANGLE도씩 돌려 원호에 올린다.
// → 가운데 카드는 위/정면, 양옆으로 갈수록 아래로 휘며 기울어짐 = 아치.
const ARC_ANGLE = 9         // 카드 1칸당 각도(deg) — 클수록 더 휨
const ARC_RADIUS = 1300     // 회전 반지름(px) — 클수록 완만한 아치
const MAX_HALF_WINDOW = 6   // 중앙 기준 좌우 표시 장수 상한(실제값은 N에 따라 동적 제한)
const WHEEL_THRESHOLD = 10  // 휠 델타 임계
const DRAG_ANGLE_PER_PX = 0.06  // 1px 드래그당 원판 회전 각도(deg). 0.05~0.08 조정.
const CARD_W = 'clamp(180px, 16vw, 320px)'
const CONTAINER_H = 'clamp(380px, 56vh, 560px)'

const StackCarousel = forwardRef(function StackCarousel({ projects, numberMap = {}, onSelect }, ref) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [displayProjects, setDisplayProjects] = useState(projects)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hovered, setHovered] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [dragFrac, setDragFrac] = useState(0)  // 드래그로 움직인 "칸 단위" 연속값(소수, 부호 포함) — dim 실시간 트리거
  const [groupKey, setGroupKey] = useState(0)

  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, dx: 0, moved: false })
  const downCard = useRef(null)
  const rafRef = useRef(0)
  const pendingFrac = useRef(0)  // 드래그 "칸 단위" 소수(부호 포함). rAF로 setDragFrac에 반영.
  const lastFracRef = useRef(0)  // 매 프레임 setDragFrac 남발 방지(diff 비교용)
  const lockRef = useRef(false)
  const wheelAccum = useRef(0)
  const prevProjects = useRef(projects)

  const total = displayProjects.length
  const totalRef = useRef(total)
  totalRef.current = total
  const activeRef = useRef(activeIndex)
  activeRef.current = activeIndex
  // 원형 최단 거리: 카드 i가 중앙(activePos)에서 좌우로 얼마나 떨어졌나(-N/2 ~ N/2). 양끝은 반대편으로 래핑.
  const circDist = (i, activePos, N) => {
    let d = ((((i - activePos) % N) + N) % N)
    if (d > N / 2) d -= N
    return d
  }

  useImperativeHandle(ref, () => ({ focus: () => containerRef.current?.focus() }))

  // ── 휠: 세로/가로/트랙패드 전부 좌우 이동으로. 누적 + 락으로 한 번에 한 칸씩 부드럽게 ──
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    function handleWheel(e) {
      // 세로든 가로든 큰 쪽을 스크롤 의도로 사용(shift 불필요)
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (Math.abs(delta) < 2) return
      e.preventDefault()
      wheelAccum.current += delta
      if (lockRef.current) return
      if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
        const dir = wheelAccum.current > 0 ? 1 : -1
        wheelAccum.current = 0
        go(dir)
      }
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  useEffect(() => {
    if (prevProjects.current === projects) return
    prevProjects.current = projects
    setDisplayProjects(projects)
    setActiveIndex(0)
    setGroupKey((k) => k + 1)
  }, [projects])

  function go(dir) {
    if (lockRef.current) return
    setActiveIndex((prev) => prev + dir)  // 순환: clamp 없음(d 계산에서 모듈로 처리)
    lockRef.current = true
    setTimeout(() => { lockRef.current = false; wheelAccum.current = 0 }, 90)
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
  }

  function onPointerDown(e) {
    drag.current = { active: true, startX: e.clientX, dx: 0, moved: false }
    containerRef.current.setPointerCapture(e.pointerId)
    setDragging(true)  // 드래그 중 transition='none'은 wheel React 렌더가 처리
    // 클릭 판정용: 누른 카드 찾기(setPointerCapture로 카드 onClick이 안 와서 pointerup에서 직접 처리)
    const cardEl = e.target.closest('[data-card-index]')
    if (cardEl) {
      downCard.current = {
        index: Number(cardEl.getAttribute('data-card-index')),
        rect: cardEl.getBoundingClientRect(),
      }
    } else {
      downCard.current = null
    }
  }

  // 드래그 중: dragFrac state 하나로 wheel 회전 + dim 을 동시 구동(인라인 transform 없음).
  function applyDragFrac() {
    rafRef.current = 0
    const frac = pendingFrac.current
    if (Math.abs(frac - lastFracRef.current) > 0.001) {
      lastFracRef.current = frac
      setDragFrac(frac)
    }
  }

  function onPointerMove(e) {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 6) drag.current.moved = true
    drag.current.dx = dx
    // 칸 단위 소수(부호 포함). 왼쪽 드래그(dx<0) → frac<0 → 다음 카드가 중앙으로.
    pendingFrac.current = (dx * DRAG_ANGLE_PER_PX) / ARC_ANGLE
    if (!rafRef.current) rafRef.current = requestAnimationFrame(applyDragFrac)
  }

  function onPointerUp() {
    if (!drag.current.active) return
    const dx = drag.current.dx
    const moved = drag.current.moved
    const dragFracFinal = (dx * DRAG_ANGLE_PER_PX) / ARC_ANGLE
    drag.current.active = false
    setDragging(false)
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0 }

    const N = totalRef.current
    if (moved && Math.abs(dx) > 30) {
      // 회전한 칸 소수를 반올림해 여러 칸 이동(순환: clamp 없음).
      const steps = Math.round(dragFracFinal)
      const move = steps !== 0 ? -steps : (dx < 0 ? 1 : -1)  // 최소 1칸 보장
      setActiveIndex(activeRef.current + move)
    } else if (!moved && downCard.current) {
      // 클릭: 누른 카드의 정규화 인덱스 기준. active(중앙) 클릭 → 상세, 비활성 → 원형 최단방향으로 중앙 이동.
      const { index, rect } = downCard.current
      const activeNorm = ((activeRef.current % N) + N) % N
      if (index === activeNorm) {
        if (!displayProjects[index]?.comingSoon) onSelect(displayProjects[index], rect)  // 준비 중이면 상세 안 열림
      } else {
        let delta = ((((index - activeNorm) % N) + N) % N)
        if (delta > N / 2) delta -= N  // 반대편이 더 가까우면 음수(최단 경로)
        setActiveIndex(activeRef.current + delta)
      }
    }
    // wheel transform/transition 은 React 렌더가 단독 책임(인라인 세팅 없음).
    // dragFrac=0 + activeIndex 갱신 → 가장 가까운 슬롯으로 260ms 스냅.
    lastFracRef.current = 0
    setDragFrac(0)
    downCard.current = null
  }



  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="프로젝트 캐러셀 — 휠·화살표·드래그로 이동"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        position: 'relative',
        width: '100%',
        height: CONTAINER_H,
        marginBottom: space[6],
        overflow: 'hidden',
        outline: 'none',
        cursor: dragging ? 'grabbing' : 'grab',
        touchAction: 'pan-y',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <style>{`
        @keyframes stackFade { from { opacity: 0; } to { opacity: 1; } }
        .stack-group { animation: stackFade 420ms ease both; }
        @media (prefers-reduced-motion: reduce) { .stack-group { animation: none; } }
      `}</style>

      <div
        key={groupKey}
        ref={trackRef}
        className="stack-group"
        style={{ position: 'absolute', inset: 0 }}
      >
        {(() => {
          const N = displayProjects.length
          const activePos = activeIndex - dragFrac
          // 윈도우가 한 바퀴를 넘어 같은 카드가 양쪽에 중복되지 않게: 2*half+1(중앙) <= N → half <= (N-1)/2.
          const HALF_WINDOW = Math.max(1, Math.min(MAX_HALF_WINDOW, Math.floor((N - 1) / 2)))
          return displayProjects.map((p, i) => {
          // 원형 최단거리 d로 모든 걸 계산 → 무한 순환(양끝 카드가 반대편에 자동 배치).
          const d = circDist(i, activePos, N)
          const absD = Math.abs(d)
          // 페이드는 윈도우 "바깥 경계"에서만. 윈도우 안(absD<=HALF_WINDOW)은 항상 불투명 → 보일 카드는 다 보임.
          const beyond = absD > HALF_WINDOW + 1
          const isActive = absD < 0.5

          const angle = d * ARC_ANGLE
          const z = Math.round(100 - absD)

          let op
          if (beyond) op = 0
          else if (absD <= HALF_WINDOW) op = 1            // 윈도우 안: 무조건 다 보임
          else op = 1 - (absD - HALF_WINDOW)              // 경계 1칸 구간만 1→0 부드럽게

          // dim도 원형 거리 기준 → 드래그/휠 중 실시간 보간. 중앙 밝고 멀수록 어둡게.
          let dim
          if (absD < 0.02) dim = 0
          else dim = hovered === i ? 0.08 : Math.min(0.35, absD * 0.12)

          // 드래그 중엔 transition 'none' → 손가락에 즉각. 그 외엔 회전·페이드 부드럽게.
          const transition = (reduced || dragging)
            ? 'none'
            : 'transform 260ms cubic-bezier(0.22,1,0.36,1), opacity 220ms ease'

          const lift = (isActive && hovered === i && !reduced && !dragging) ? -10 : 0

          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '8%',
                width: CARD_W,
                // 회전 원점을 카드 아래 ARC_RADIUS 지점으로 → 부채꼴 아치
                transformOrigin: `center ${ARC_RADIUS}px`,
                transform: `translateX(-50%) rotate(${angle}deg)`,
                zIndex: z,
                opacity: op,
                transition,
                pointerEvents: beyond ? 'none' : 'auto',
                willChange: absD <= 2 ? 'transform, opacity' : 'auto',
              }}
            >
              <div style={{ transform: `translateY(${lift}px)`, transition: reduced ? 'none' : 'transform 220ms ease' }}>
                <div
                  role="button"
                  tabIndex={-1}
                  aria-label={p.title}
                  data-card-index={i}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                  style={{ cursor: 'pointer', outline: 'none', WebkitTapHighlightColor: 'transparent' }}
                >
                  <PosterCard project={p} index={numberMap[p.id] ?? i + 1} active={isActive} dim={dim} />
                </div>
              </div>
            </div>
          )
        }) })()}
      </div>

    </div>
  )
})

export default StackCarousel