import { useRef, useState, useEffect } from 'react'
import { color, type as typeToken, space, layout } from '../../tokens.js'

const EASE = 'cubic-bezier(0.22,1,0.36,1)'
const DURATION = 700

function BarItem({ skill, index, triggered }) {
  const [imgErr, setImgErr] = useState(false)
  const showIcon = skill.icon && !imgErr
  const delay = index * 80

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: space[3] }}>
      {/* 아이콘 or 원형 플레이스홀더 */}
      <div
        style={{
          width: '24px',
          height: '24px',
          flexShrink: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          border: showIcon ? 'none' : `1px solid ${color.line}`,
        }}
      >
        {showIcon && (
          <img
            src={skill.icon}
            alt={skill.name}
            onError={() => setImgErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        )}
      </div>

      {/* 라벨 */}
      <span
        style={{
          width: '80px',
          flexShrink: 0,
          fontSize: typeToken.small.size,
          fontFamily: 'Pretendard, sans-serif',
          color: color.muted,
        }}
      >
        {skill.name}
      </span>

      {/* 트랙 + 바 (max 200px — 화면 끝까지 뻗기 금지) */}
      <div
        style={{
          width: '200px',
          maxWidth: '200px',
          flexShrink: 0,
          height: '3px',
          backgroundColor: color.line,
          borderRadius: layout.radius.pill,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: triggered ? `${skill.pct}%` : '0%',
            backgroundColor: color.accent,
            borderRadius: layout.radius.pill,
            transition: `width ${DURATION}ms ${EASE} ${delay}ms`,
          }}
        />
      </div>

      {/* % */}
      <span
        style={{
          width: '32px',
          textAlign: 'right',
          fontSize: typeToken.small.size,
          fontFamily: 'Pretendard, sans-serif',
          color: color.muted,
          flexShrink: 0,
        }}
      >
        {skill.pct}%
      </span>
    </div>
  )
}

function SkillTag({ label, icon }) {
  const [iconErr, setIconErr] = useState(false)
  const showIcon = icon && !iconErr

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: `${space[1]} ${space[3]}`,
        border: `1px solid ${color.line}`,
        borderRadius: layout.radius.pill,
        fontSize: '12px',
        fontFamily: 'Pretendard, sans-serif',
        letterSpacing: '0.06em',
        color: color.muted,
      }}
    >
      {showIcon && (
        <img
          src={icon}
          alt=""
          onError={() => setIconErr(true)}
          style={{ width: '14px', height: '14px', objectFit: 'contain' }}
        />
      )}
      {label}
    </span>
  )
}

export default function SkillBar({ skills, skillTags }) {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTriggered(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: space[8] }}>
      {/* 숙련도 바 */}
      {skills && skills.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
          {skills.map((skill, i) => (
            <BarItem key={skill.name} skill={skill} index={i} triggered={triggered} />
          ))}
        </div>
      )}

      {/* 태그 */}
      {skillTags && skillTags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: space[2] }}>
          {skillTags.map(({ label, icon }) => (
            <SkillTag key={label} label={label} icon={icon} />
          ))}
        </div>
      )}
    </div>
  )
}
