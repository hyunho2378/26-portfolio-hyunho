import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { color, type as typeToken, space, layout } from '../../tokens.js'
import { profile } from '../../data/profile.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import SkillBar from './SkillBar.jsx'
import CollapsibleList from './CollapsibleList.jsx'

const DUR = 400

// ─── 내부 서브 컴포넌트 ─────────────────────────────────

function ProfilePhoto() {
  const [err, setErr] = useState(false)
  const ok = profile.photo && !err
  return (
    <div>
      <div
        style={{
          width: 'clamp(150px, 16vw, 220px)',
          aspectRatio: '3 / 4',
          borderRadius: layout.radius.card,
          overflow: 'hidden',
          border: `1px solid ${color.line}`,
          backgroundColor: color.ink,
        }}
      >
        {ok ? (
          <img
            src={profile.photo}
            alt={profile.name}
            onError={() => setErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '11px', fontFamily: 'Pretendard, sans-serif', color: color.muted, letterSpacing: '0.14em' }}>
              PHOTO
            </span>
          </div>
        )}
      </div>
      <p style={{ marginTop: space[3], fontSize: typeToken.body.size, fontWeight: 600, fontFamily: 'Pretendard, sans-serif', color: color.paper }}>
        {profile.name}
      </p>
      <p style={{ marginTop: space[1], fontSize: typeToken.small.size, fontFamily: 'Pretendard, sans-serif', color: color.muted, letterSpacing: '0.06em' }}>
        {profile.nameEn}
      </p>
    </div>
  )
}

function SmallChip({ label }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: '28px',
        padding: `0 ${space[3]}`,
        border: `1px solid ${color.line}`,
        borderRadius: layout.radius.pill,
        fontSize: '12px',
        fontFamily: 'Pretendard, sans-serif',
        color: color.muted,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}

function GpaBlock() {
  const { gpa } = profile
  if (!gpa) return null
  const rowStyle = { display: 'flex', gap: space[4], paddingTop: '8px', paddingBottom: '8px' }
  const labelStyle = { width: '56px', flexShrink: 0, fontSize: typeToken.small.size, fontFamily: 'Pretendard, sans-serif', color: color.muted }
  const valueStyle = { fontSize: typeToken.small.size, fontFamily: 'Pretendard, sans-serif', color: color.paper }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={rowStyle}><span style={labelStyle}>ALL</span><span style={valueStyle}>{gpa.all} / {gpa.max}</span></div>
      <div style={rowStyle}><span style={labelStyle}>전공</span><span style={valueStyle}>{gpa.major} / {gpa.max}</span></div>
      {gpa.ranks.map(({ term, score, rank }) => (
        <div key={term} style={rowStyle}>
          <span style={labelStyle}>{term}</span>
          <span style={valueStyle}>{score}<span style={{ marginLeft: space[3], color: color.muted }}>({rank})</span></span>
        </div>
      ))}
    </div>
  )
}

function Block({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[3] }}>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  )
}

// ─── 메인 컴포넌트 ──────────────────────────────────────

export default function AboutLayer({ open, onClose }) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const closeBtnRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useEffect(() => {
    if (!mounted) return
    if (open) {
      if (scrollRef.current) scrollRef.current.scrollTop = 0
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    } else {
      setVisible(false)
      if (reduced) {
        setMounted(false)
      } else {
        const t = setTimeout(() => setMounted(false), DUR)
        return () => clearTimeout(t)
      }
    }
  }, [open, mounted])

  useEffect(() => {
    if (!mounted) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [mounted])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onCloseRef.current() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (visible && closeBtnRef.current) closeBtnRef.current.focus()
  }, [visible])

  if (!mounted) return null

  return (
    <div
      ref={scrollRef}
      role="dialog"
      aria-modal="true"
      aria-label="About"
      onClick={(e) => { if (e.target === e.currentTarget) onCloseRef.current() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        backgroundColor: 'rgba(18,18,18,0.97)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        overflowY: 'auto',
        opacity: reduced ? 1 : visible ? 1 : 0,
        transition: reduced ? 'none' : `opacity ${DUR}ms ease`,
      }}
    >
      <div
        style={{
          maxWidth: 'min(1500px, 90vw)',
          margin: '0 auto',
          padding: 'clamp(48px, 8vh, 96px) clamp(24px, 5vw, 80px)',
          transform: reduced ? 'none' : visible ? 'translateY(0px)' : 'translateY(16px)',
          transition: reduced ? 'none' : `transform ${DUR}ms cubic-bezier(0.22,1,0.36,1)`,
        }}
      >
        {/* 닫기 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: space[10] }}>
          <button
            ref={closeBtnRef}
            onClick={() => onCloseRef.current()}
            aria-label="닫기"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              background: 'none',
              border: `1px solid ${color.line}`,
              borderRadius: layout.radius.pill,
              cursor: 'pointer',
              color: color.paper,
              flexShrink: 0,
              transition: 'opacity 150ms ease, border-color 150ms ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.6' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `2px solid ${color.accent}`
              e.currentTarget.style.outlineOffset = '2px'
            }}
            onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* 프로필 사진 + 간략 소개 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'clamp(24px, 3vw, 48px)',
            marginBottom: space[12],
            flexWrap: 'wrap',
          }}
        >
          <ProfilePhoto />
          <div style={{ display: 'flex', flexDirection: 'column', gap: space[4], paddingTop: space[2] }}>
            <SectionLabel>ABOUT</SectionLabel>
            <p
              style={{
                fontSize: typeToken.bodyLg.size,
                fontFamily: 'Pretendard, sans-serif',
                color: color.paper,
                lineHeight: typeToken.bodyLg.lh,
                maxWidth: '480px',
                whiteSpace: 'pre-line',
              }}
            >
              {profile.intro}
            </p>
          </div>
        </div>

        {/* ── 상단 2열 그리드 ── */}
        <div className="about-layer-grid">
          {/* 좌측 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: space[12] }}>
            <Block label="INTERESTED IN">
              <p style={{ fontSize: typeToken.body.size, fontFamily: 'Pretendard, sans-serif', color: color.paper, lineHeight: typeToken.body.lh }}>
                {profile.interests.join(', ')}
              </p>
            </Block>

            <Block label="CHARACTER">
              <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: space[2], columnGap: space[3] }}>
                {profile.character.map((c) => <SmallChip key={c} label={c} />)}
              </div>
            </Block>

            <Block label="GPA">
              <GpaBlock />
            </Block>

            <Block label="TOOLS">
              <SkillBar skills={profile.skills} skillTags={profile.skillTags} />
            </Block>
          </div>

          {/* 우측 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: space[12] }}>
            <CollapsibleList label="EDUCATION" items={profile.education} collapsible={false} />
            <CollapsibleList label="AWARD" items={profile.awards} collapsible={false} />
          </div>
        </div>

        {/* ── 하단 2열 그리드 ── */}
        <div className="about-layer-grid" style={{ marginTop: space[16] }}>
          <CollapsibleList label="LEADERSHIP &amp; ACTIVITIES" items={profile.activities} collapsible={false} forceWhite={true} />
          <CollapsibleList label="EXPERIENCE" items={profile.experience} collapsible={false} forceWhite={true} />
        </div>
      </div>

      <style>{`
        .about-layer-grid {
          display: grid;
          gap: ${space[10]};
        }
        @media (min-width: 768px) {
          .about-layer-grid {
            grid-template-columns: 1fr 1fr;
            gap: clamp(40px, 6vw, 96px);
          }
        }
      `}</style>
    </div>
  )
}