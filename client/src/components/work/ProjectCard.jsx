import { useState } from 'react'
import { color, type as typeToken, layout } from '../../tokens.js'

const TYPE_LABEL = { ux: 'UX', dev: '개발', visual: '시각디자인' }

export default function ProjectCard({ project, onOpen }) {
  const { title, type, category, period, accent, thumbnail } = project
  const [imgErr, setImgErr] = useState(false)
  const showImg = thumbnail && !imgErr
  const aspectRatio = type === 'visual' ? '2 / 3' : '16 / 10'
  const metaLabel = type === 'visual' ? `${category || '시각디자인'} · ${period}` : `${TYPE_LABEL[type] || type} · ${period}`

  function handleOpen() {
    if (onOpen) onOpen(project)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={title}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleOpen()
        }
      }}
      style={{
        display: 'block',
        cursor: 'pointer',
        borderRadius: layout.radius.card,
        border: `1px solid transparent`,
        transition: 'border-color 200ms ease, opacity 200ms ease',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color.line
        e.currentTarget.style.opacity = '0.85'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent'
        e.currentTarget.style.opacity = '1'
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = `2px solid ${color.accent}`
        e.currentTarget.style.outlineOffset = '3px'
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none'
      }}
    >
      {/* 썸네일 영역 */}
      <div
        style={{
          width: '100%',
          aspectRatio,
          borderRadius: layout.radius.card,
          overflow: 'hidden',
          backgroundColor: color.ink,
          border: showImg ? 'none' : `1px solid ${color.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {showImg ? (
          <img
            src={thumbnail}
            alt={title}
            onError={() => setImgErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          />
        ) : (
          <span
            style={{
              fontSize: typeToken.h3.size,
              fontWeight: typeToken.h3.weight,
              fontFamily: 'Pretendard, sans-serif',
              color: color.muted,
              textAlign: 'center',
              padding: '16px',
            }}
          >
            {title}
          </span>
        )}
      </div>

      {/* 메타 영역 */}
      <div style={{ padding: '12px 4px 4px' }}>
        {/* 제목 + accent 점 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: accent || color.accent,
              flexShrink: 0,
              marginTop: '6px',
            }}
          />
          <span
            style={{
              fontSize: typeToken.h3.size,
              fontWeight: typeToken.h3.weight,
              fontFamily: 'Pretendard, sans-serif',
              color: color.paper,
              lineHeight: typeToken.h3.lh,
              letterSpacing: typeToken.h3.ls,
            }}
          >
            {title}
          </span>
        </div>

        {/* 타입 · 기간 */}
        <p
          style={{
            marginTop: '6px',
            marginLeft: '16px',
            fontSize: typeToken.caption.size,
            fontWeight: typeToken.caption.weight,
            fontFamily: 'Pretendard, sans-serif',
            color: color.muted,
            letterSpacing: '0.04em',
          }}
        >
          {metaLabel}
        </p>
      </div>
    </div>
  )
}
