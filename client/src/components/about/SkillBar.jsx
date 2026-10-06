import { useRef, useState, useEffect } from 'react'
import { prefersReducedMotion } from '../../lib/useLayer.js'
import { color, type as typeToken, space, layout, font, tracking, motion } from '../../tokens.js'

const EASE = motion.ease
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
          width: space[6],
          height: space[6],
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
          width: space[20],
          flexShrink: 0,
          fontSize: typeToken.small.size,
          fontFamily: font.body,
          color: color.muted,
        }}
      >
        {skill.name}
      </span>

      {/* 트랙 + 바 (max 200px — 화면 끝까지 뻗기 금지) */}
      <div
        style={{
          flex: '1 1 0',
          minWidth: 0,
          maxWidth: layout.barMax,
          height: layout.track,
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
          width: space[8],
          textAlign: 'right',
          fontSize: typeToken.small.size,
          fontFamily: font.body,
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
        gap: space[2],
        padding: `${space[1]} ${space[3]}`,
        border: `1px solid ${color.line}`,
        borderRadius: layout.radius.pill,
        fontSize: typeToken.caption.size,
        fontFamily: font.body,
        letterSpacing: tracking.lg,
        color: color.muted,
      }}
    >
      {showIcon && (
        <img
          src={icon}
          alt=""
          onError={() => setIconErr(true)}
          style={{ width: space[4], height: space[4], objectFit: 'contain' }}
        />
      )}
      {label}
    </span>
  )
}

export default function SkillBar({ skills, skillTags }) {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(prefersReducedMotion)

  useEffect(() => {
    const el = ref.current
    if (!el || triggered) return undefined
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
  }, [triggered])

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
