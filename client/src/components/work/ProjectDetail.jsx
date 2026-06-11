import { useEffect, useRef, useState } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import { color, type as typeToken, space, layout } from '../../tokens.js'
import { contrastText } from '../../lib/contrastText.js'
import PosterCard from './PosterCard.jsx'

// ── 우측 정보 stagger 래퍼 ─────────────────────────────────────
function Fade({ show, delay = 0, reduced, children, style }) {
  return (
    <div style={{
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0px)' : 'translateY(20px)',
      transition: reduced ? 'none'
        : `opacity 360ms ease ${delay}ms, transform 360ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  )
}

function Block({ label, children, accent }) {
  return (
    <div style={{ marginBottom: space[6] }}>
      <p style={{
        fontSize: typeToken.label.size,
        fontWeight: typeToken.label.weight,
        fontFamily: 'Pretendard, sans-serif',
        letterSpacing: typeToken.label.ls,
        color: accent || color.accent,
        marginBottom: space[2],
      }}>
        {label}
      </p>
      {children}
    </div>
  )
}

function BodyText({ children }) {
  return (
    <p style={{
      fontSize: typeToken.body.size,
      fontFamily: 'Pretendard, sans-serif',
      color: color.paper,
      lineHeight: 1.65,
      wordBreak: 'keep-all',
      overflowWrap: 'break-word',
    }}>
      {children}
    </p>
  )
}

function MetaRow({ label, value }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', gap: space[4], marginBottom: space[2] }}>
      <span style={{
        flexShrink: 0, width: '88px',
        fontSize: typeToken.small.size,
        fontFamily: 'Pretendard, sans-serif',
        letterSpacing: '0.04em',
        color: color.muted,
      }}>
        {label}
      </span>
      <span style={{
        fontSize: typeToken.small.size,
        fontFamily: 'Pretendard, sans-serif',
        color: color.paper,
        lineHeight: 1.5,
      }}>
        {value}
      </span>
    </div>
  )
}

function ToolChip({ children }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: `${space[1]} ${space[3]}`,
      border: `1px solid ${color.line}`,
      borderRadius: layout.radius.md,
      fontSize: typeToken.small.size,
      fontFamily: 'Pretendard, sans-serif',
      color: color.muted,
      marginRight: space[2],
      marginBottom: space[2],
    }}>
      {children}
    </span>
  )
}

function LinkBtn({ href, children, accent }) {
  const hoverText = contrastText(accent)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: space[1],
        padding: `${space[2]} ${space[4]}`,
        border: `1px solid ${accent}`,
        borderRadius: layout.radius.md,
        fontSize: typeToken.label.size,
        fontWeight: typeToken.label.weight,
        fontFamily: 'Pretendard, sans-serif',
        letterSpacing: '0.04em',
        color: accent,
        textDecoration: 'none',
        marginRight: space[3],
        marginBottom: space[3],
        transition: 'background-color 180ms ease, color 180ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = accent
        e.currentTarget.style.color = hoverText
        const arrow = e.currentTarget.querySelector('svg')
        if (arrow) arrow.style.transform = 'translate(2px, -2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.color = accent
        const arrow = e.currentTarget.querySelector('svg')
        if (arrow) arrow.style.transform = 'translate(0px, 0px)'
      }}
    >
      {children}
      <ArrowUpRight size={15} aria-hidden="true" style={{ transition: 'transform 180ms ease' }} />
    </a>
  )
}

// ── 타입별 콘텐츠 ──────────────────────────────────────────────
function DevContent({ project }) {
  const { outcome, links, contribution, accent } = project
  return (
    <>
      {contribution && <Block label="CONTRIBUTION" accent={accent}><BodyText>{contribution}</BodyText></Block>}
      {outcome && <Block label="OUTCOME" accent={accent}><BodyText>{outcome}</BodyText></Block>}
      {links?.length > 0 && (
        <Block label="LINKS" accent={accent}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {links.filter((l) => l.url).map((l) => (
              <LinkBtn key={l.label} href={l.url} accent={accent}>{l.label}</LinkBtn>
            ))}
          </div>
        </Block>
      )}
    </>
  )
}

function UxContent({ project }) {
  const { outcome, links, pdfUrl, contribution, accent } = project
  const liveLinks = (links || []).filter((l) => l.url)
  return (
    <>
      {contribution && <Block label="CONTRIBUTION" accent={accent}><BodyText>{contribution}</BodyText></Block>}
      {outcome && <Block label="OUTCOME" accent={accent}><BodyText>{outcome}</BodyText></Block>}
      {(pdfUrl || liveLinks.length > 0) && (
        <Block label="LINKS" accent={accent}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {pdfUrl && <LinkBtn href={pdfUrl} accent={accent}>{project.pdfLabel || 'PDF 보기'}</LinkBtn>}
            {liveLinks.map((l) => <LinkBtn key={l.label} href={l.url} accent={accent}>{l.label}</LinkBtn>)}
          </div>
        </Block>
      )}
    </>
  )
}

function VisualContent({ project }) {
  const { objective, strategy, outcome, tools, links, pdfUrl, pdfLabel, accent } = project
  const liveLinks = (links || []).filter((l) => l.url)
  const hasLinks = pdfUrl || liveLinks.length > 0
  return (
    <>
      {objective && <Block label="OBJECTIVE" accent={accent}><BodyText>{objective}</BodyText></Block>}
      {strategy && <Block label="STRATEGY" accent={accent}><BodyText>{strategy}</BodyText></Block>}
      {outcome && <Block label="RESULT" accent={accent}><BodyText>{outcome}</BodyText></Block>}
      {tools?.length > 0 && (
        <Block label="TOOLS" accent={accent}>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: space[1] }}>
            {tools.map((t) => <ToolChip key={t}>{t}</ToolChip>)}
          </div>
        </Block>
      )}
      {hasLinks && (
        <Block label="LINKS" accent={accent}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {pdfUrl && <LinkBtn href={pdfUrl} accent={accent}>{pdfLabel || 'PDF 보기'}</LinkBtn>}
            {liveLinks.map((l) => <LinkBtn key={l.label} href={l.url} accent={accent}>{l.label}</LinkBtn>)}
          </div>
        </Block>
      )}
    </>
  )
}

// ── 메인 ───────────────────────────────────────────────────────
export default function ProjectDetail({ project, rect, number, onClose }) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const closingRef = useRef(false)

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const accentColor = project.accent || color.accent

  // 좌측 미디어: dev/ux=썸네일 / visual=갤러리. 없으면 포스터 유지.
  const galleryImgs = project.type === 'visual' ? (project.gallery || []) : []
  const hasGallery = galleryImgs.length > 0
  const hasThumb = project.type !== 'visual' && !project.flipImageMode && !project.flipInfoMode && !!project.thumbnail

  // ── flip 판정 (geometry보다 먼저: dockedCx 계산에 flipWide 필요) ──
  const flipImage = project.thumbnail || (project.gallery && project.gallery[0]?.src) || null
  const canFlip = (project.type === 'visual' || project.flipImageMode || project.flipInfoMode) && !!flipImage
  const flipWide = !!(project.flipInfoMode || project.flipLandscape) // 가로 웹 캡처 펼침
  const anyFlip = canFlip

  // ── geometry ──
  const vw = window.innerWidth
  const vh = window.innerHeight
  const isMobile = vw < 640
  const srcCx = rect.left + rect.width / 2
  const srcCy = rect.top + rect.height / 2

  const centerScale = Math.min((vw * 0.62) / rect.width, (vh * 0.82) / rect.height)
  const centerTx = vw / 2 - srcCx
  const centerTy = vh / 2 - srcCy

  let dockedScale, dockedCx, dockedCy
  if (isMobile) {
    dockedScale = Math.min((vw * 0.66) / rect.width, (vh * 0.44) / rect.height)
    dockedCx = vw / 2
    dockedCy = vh * 0.26
  } else {
    dockedScale = Math.min((vw * 0.34) / rect.width, (vh * 0.8) / rect.height)
    // 가로 펼침은 좌측 이미지 영역(좌패딩 4% ~ 47%) 중앙(≈vw*0.255)에 맞춰 카드를 약간 오른쪽으로
    dockedCx = flipWide ? vw * 0.255 : vw * 0.22
    dockedCy = vh * 0.5
  }
  const dockedTx = dockedCx - srcCx
  const dockedTy = dockedCy - srcCy

  // 가로 펼침 박스 — 폭 vw*0.43(우측 끝 47% < 정보 50%), 높이 vh*0.72. contain이라 어떤 비율도
  // 박스 안에서 자동 맞춤(잘림·박스 없음). 컨테이너가 dockedScale로 확대되므로 /dockedScale로 상쇄.
  const wideBox = { width: `${(vw * 0.43) / dockedScale}px`, height: `${(vh * 0.72) / dockedScale}px` }

  const transforms = {
    from: 'translate(0px, 0px) scale(1)',
    center: `translate(${centerTx}px, ${centerTy}px) scale(${centerScale})`,
    docked: `translate(${dockedTx}px, ${dockedTy}px) scale(${dockedScale})`,
  }
  const posterTransition = {
    from: 'none',
    center: 'transform 520ms cubic-bezier(0.16,1,0.3,1)',
    docked: 'transform 560ms cubic-bezier(0.16,1,0.3,1)',
  }

  const [phase, setPhase] = useState(reduced ? 'docked' : 'from')
  const [dimIn, setDimIn] = useState(reduced)
  const [infoVisible, setInfoVisible] = useState(reduced)
  const [closing, setClosing] = useState(false)
  const [flipped, setFlipped] = useState(false)

  // phase machine — center에서 잠깐 머문 뒤 docked로 (전체 약 0.5s 단축)
  useEffect(() => {
    if (reduced) { if (anyFlip) setFlipped(true); return }
    const raf = requestAnimationFrame(() => { setPhase('center'); setDimIn(true) })
    // center 등장(520ms) + 짧은 텀(120ms) 후 docked로
    const tDock = setTimeout(() => { setPhase('docked') }, 520 + 120)
    // docked 이동이 거의 끝날 때 우측 정보 등장
    const tInfo = setTimeout(() => { setInfoVisible(true) }, 520 + 120 + 320)
    // docked 정착 후 카드 플립(이미지 or 정보)
    const tFlip = anyFlip ? setTimeout(() => setFlipped(true), 520 + 120 + 420) : null
    return () => { cancelAnimationFrame(raf); clearTimeout(tDock); clearTimeout(tInfo); if (tFlip) clearTimeout(tFlip) }
  }, [reduced, anyFlip])

  // body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // ESC
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  function handleClose() {
    if (closingRef.current) return
    closingRef.current = true
    // 포커스가 캐러셀 카드로 복귀하며 생기는 focus 링 방지
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur()
    if (reduced) { onCloseRef.current(); return }
    // 진입의 역방향(대칭): 정보 fade out → 포스터 docked→center(머묾)→from → 딤 fade
    setClosing(true)
    setFlipped(false)
    setInfoVisible(false)
    setTimeout(() => setPhase('center'), 260)            // 정보 사라진 뒤 중앙으로 복귀(560ms 이동)
    setTimeout(() => { setPhase('from'); setDimIn(false) }, 260 + 560 + 120) // center 잠깐 머문 뒤 원위치
    setTimeout(() => onCloseRef.current(), 260 + 560 + 120 + 520)
  }

  const typeLabel = project.label || (
    project.type === 'visual'
      ? (project.category || 'VISUAL DESIGN')
      : project.type === 'ux' ? 'UX DESIGN' : 'VIBE CODING'
  )

  const infoBox = isMobile
    ? { left: 0, top: '46%', width: '100%', height: '54%' }
    : { left: '50%', top: 0, width: '50%', height: '100%' }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.titleKo || project.titleEn || project.title}
      style={{ position: 'fixed', inset: 0, zIndex: 60 }}
    >
      {/* 배경 딤 */}
      <div
        onClick={handleClose}
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundColor: color.ink,
          opacity: dimIn ? 0.96 : 0,
          transition: reduced ? 'none' : 'opacity 520ms ease',
        }}
      />

      {/* warp 포스터 — visual은 뒤집혀 작품 이미지로, dev/ux는 앞면 유지. 이미지는 우측에. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: rect.left,
          top: rect.top,
          width: rect.width,
          zIndex: 2,
          pointerEvents: 'none',
          transformOrigin: 'center center',
          transform: transforms[phase],
          transition: reduced ? 'none'
            : (closing && phase === 'from')
              ? 'transform 520ms cubic-bezier(0.16,1,0.3,1)'
              : posterTransition[phase],
          willChange: 'transform',
          perspective: '1400px',
        }}
      >
        {anyFlip ? (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '2 / 3',
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: reduced ? 'none' : 'transform 720ms cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {/* 앞면 — 포스터 카드 (세로 유지) */}
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <PosterCard project={project} index={number} active={false} />
            </div>
            {/* 뒷면 — 작품 이미지. flipWide(가로)는 박스 없이 사진만 contain(좌패딩·정보 50% 고려) */}
            <div style={flipWide ? {
              // 가로: 이미지 영역 중앙(카드 중심)에 박스 없이 contain. 검은 박스·그림자 제거.
              position: 'absolute',
              top: '50%', left: '50%',
              ...wideBox,
              transform: 'translate(-50%, -50%) rotateY(180deg)',
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            } : {
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: layout.radius.card,
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img
                src={flipImage}
                alt={project.title}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', borderRadius: layout.radius.card }}
              />
            </div>
          </div>
        ) : (
          <PosterCard project={project} index={number} active={false} />
        )}
      </div>

      {/* 우측 정보 */}
      <div
        style={{
          position: 'absolute', ...infoBox, zIndex: 3,
          overflowY: 'auto',
          padding: isMobile
            ? `${space[6]} clamp(${layout.pagePadX.base}, 5vw, ${layout.pagePadX.xl}) ${space[8]}`
            : `clamp(48px, 8vh, 96px) clamp(${space[8]}, 4vw, ${space[16]})`,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '520px', width: '100%' }}>
          <Fade show={infoVisible} delay={0} reduced={reduced}>
            <p style={{
              fontSize: typeToken.label.size,
              fontWeight: typeToken.label.weight,
              fontFamily: 'Pretendard, sans-serif',
              letterSpacing: typeToken.label.ls,
              color: accentColor,
              marginBottom: space[3],
            }}>
              {typeLabel}
            </p>
          </Fade>

          <Fade show={infoVisible} delay={60} reduced={reduced}>
            <h1 style={{
              fontSize: typeToken.h1.size,
              fontWeight: typeToken.h1.weight,
              fontFamily: 'Pretendard, sans-serif',
              lineHeight: typeToken.h1.lh,
              letterSpacing: typeToken.h1.ls,
              color: color.paper,
              margin: 0,
            }}>
              {project.titleEn || project.title}
            </h1>
            {project.oneLiner && (
              <p style={{
                marginTop: space[3],
                fontSize: typeToken.body.size,
                fontFamily: 'Pretendard, sans-serif',
                color: color.muted,
                lineHeight: 1.6,
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
              }}>
                {project.oneLiner}
              </p>
            )}
          </Fade>

          {/* summary (100자 소개) */}
          {project.summary && (
            <Fade show={infoVisible} delay={110} reduced={reduced} style={{ marginTop: space[5] }}>
              <p style={{
                fontSize: typeToken.body.size,
                fontFamily: 'Pretendard, sans-serif',
                color: color.paper,
                lineHeight: 1.75,
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
              }}>
                {project.summary}
              </p>
            </Fade>
          )}

          {/* dev/ux 사진 — 정보 위(상단)에 배치. visual은 좌측 카드가 플립되므로 여기 없음. */}
          {hasThumb && (
            <Fade show={infoVisible} delay={150} reduced={reduced} style={{ marginTop: space[8] }}>
              <img
                src={project.thumbnail}
                alt={project.title}
                style={{
                  width: '100%', maxWidth: '100%', height: 'auto',
                  display: 'block', borderRadius: layout.radius.md,
                  border: `1px solid ${color.line}`,
                }}
              />
            </Fade>
          )}

          <Fade show={infoVisible} delay={180} reduced={reduced} style={{ marginTop: space[8] }}>
            {project.type === 'dev' && <DevContent project={project} />}
            {project.type === 'ux' && <UxContent project={project} />}
            {project.type === 'visual' && <VisualContent project={project} />}
          </Fade>

          <Fade show={infoVisible} delay={240} reduced={reduced} style={{ marginTop: space[4] }}>
            <MetaRow label="ROLE" value={project.role} />
            <MetaRow label="PERIOD" value={project.period} />
            {project.type !== 'visual' && project.tools?.length > 0 && (
              <div style={{ marginTop: space[4], display: 'flex', flexWrap: 'wrap' }}>
                {project.tools.map((t) => <ToolChip key={t}>{t}</ToolChip>)}
              </div>
            )}
          </Fade>
        </div>
      </div>

      {/* 닫기 */}
      <button
        onClick={handleClose}
        aria-label="닫기"
        style={{
          position: 'absolute', top: space[6], right: space[6], zIndex: 5,
          background: 'none', border: `1px solid ${color.line}`,
          borderRadius: layout.radius.pill,
          width: '42px', height: '42px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: color.paper,
          opacity: infoVisible ? 1 : 0,
          transition: 'opacity 200ms ease',
          outline: 'none',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = infoVisible ? '1' : '0' }}
        onFocus={(e) => { e.currentTarget.style.outline = `2px solid ${color.accent}`; e.currentTarget.style.outlineOffset = '2px' }}
        onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  )
}