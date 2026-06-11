import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { color, space } from '../../tokens.js'
import PosterCard from './PosterCard.jsx'

// ── 아치(부채꼴) 배치 상수 ──
// 각 카드를 화면 아래 먼 회전중심(ARC_RADIUS)을 기준으로 ARC_ANGLE도씩 돌려 원호에 올린다.
// → 가운데 카드는 위/정면, 양옆으로 갈수록 아래로 휘며 기울어짐 = 아치.
const ARC_ANGLE = 9         // 카드 1칸당 각도(deg) — 클수록 더 휨
const ARC_RADIUS = 1300     // 회전 반지름(px) — 클수록 완만한 아치
const MAX_VISIBLE = 5       // abs(offset) 초과 시 숨김
const WHEEL_THRESHOLD = 10  // 휠 델타 임계
const CARD_W = 'clamp(180px, 16vw, 320px)'
const CONTAINER_H = 'clamp(380px, 56vh, 560px)'

const StackCarousel = forwardRef(function StackCarousel({ projects, numberMap = {}, onSelect }, ref) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [displayProjects, setDisplayProjects] = useState(projects)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hovered, setHovered] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [groupKey, setGroupKey] = useState(0)

  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, dx: 0, moved: false })
  const downCard = useRef(null)
  const rafRef = useRef(0)
  const pendingTx = useRef(0)
  const lockRef = useRef(false)
  const wheelAccum = useRef(0)
  const prevProjects = useRef(projects)

  const total = displayProjects.length
  const totalRef = useRef(total)
  totalRef.current = total
  const activeRef = useRef(activeIndex)
  activeRef.current = activeIndex
  const clampIdx = (n) => Math.max(0, Math.min(n, totalRef.current - 1))

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
    setActiveIndex((prev) => clampIdx(prev + dir))
    lockRef.current = true
    setTimeout(() => { lockRef.current = false; wheelAccum.current = 0 }, 200)
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
  }

  function onPointerDown(e) {
    drag.current = { active: true, startX: e.clientX, dx: 0, moved: false }
    containerRef.current.setPointerCapture(e.pointerId)
    if (trackRef.current) trackRef.current.style.transition = 'none'
    setDragging(true)
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

  function applyDragTransform() {
    rafRef.current = 0
    if (trackRef.current) trackRef.current.style.transform = `translateX(${pendingTx.current}px)`
  }

  function onPointerMove(e) {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 6) drag.current.moved = true
    drag.current.dx = dx
    pendingTx.current = dx
    if (!rafRef.current) rafRef.current = requestAnimationFrame(applyDragTransform)
  }

  function onPointerUp() {
    if (!drag.current.active) return
    const dx = drag.current.dx
    const moved = drag.current.moved
    drag.current.active = false
    setDragging(false)
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0 }
    if (trackRef.current) {
      trackRef.current.style.transition = reduced ? 'none' : 'transform 340ms cubic-bezier(0.22,1,0.36,1)'
      trackRef.current.style.transform = ''
    }
    if (moved && Math.abs(dx) > 60) {
      // 드래그: 한 번에 1칸만(휠과 동일). 방향만 사용.
      const dir = dx < 0 ? 1 : -1
      setActiveIndex((prev) => clampIdx(prev + dir))
    } else if (!moved && downCard.current) {
      // 클릭(안 움직임): 활성 카드면 상세 열기, 아니면 그 카드로 이동
      const { index, rect } = downCard.current
      if (index === activeRef.current) {
        if (displayProjects[index]?.comingSoon) return  // 준비 중 카드: 상세 안 열림
        onSelect(displayProjects[index], rect)
      } else {
        setActiveIndex(clampIdx(index))
      }
    }
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

      <div key={groupKey} ref={trackRef} className="stack-group" style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
        {displayProjects.map((p, i) => {
          const offset = i - activeIndex
          const absO = Math.abs(offset)
          const beyond = absO > MAX_VISIBLE
          const isActive = offset === 0

          // ── 아치 배치: 회전중심(아래 ARC_RADIUS)을 기준으로 offset*ARC_ANGLE 회전 ──
          // translateY로 회전중심까지 내렸다가 rotate 후 다시 올리면 카드가 원호 위에 놓임.
          const angle = offset * ARC_ANGLE
          const z = 100 - absO

          // 카드 자체는 불투명 유지(뒤 비침 방지). 멀수록 어둠막(dim)으로 어둡게.
          // beyond 카드만 페이드아웃(opacity)으로 사라지게.
          const op = beyond ? 0 : 1
          let dim
          if (isActive) dim = 0
          else dim = hovered === i ? 0.12 : Math.min(0.62, absO * 0.2)

          const transition = (reduced || dragging)
            ? 'none'
            : 'transform 480ms cubic-bezier(0.22,1,0.36,1), opacity 320ms ease, box-shadow 320ms ease'

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
                willChange: absO <= 2 ? 'transform, opacity' : 'auto',
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
        })}
      </div>

    </div>
  )
})

export default StackCarousel