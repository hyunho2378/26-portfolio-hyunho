import { contrastText } from '../../lib/contrastText.js'
import { layout, shadow, font, tracking, color, inkAlpha } from '../../tokens.js'

export default function PosterCard({ project, index, active = false, dim = 0 }) {
  const { titleEn, titleKo, title, label, type, category, period, accent } = project
  const bg = accent || color.accent
  const fg = project.textColor || contrastText(bg)

  const mainTitle = titleEn || title || ''
  const subTitle = titleKo || ''
  const topLabel = label
    || (type === 'visual' ? (category || 'VISUAL DESIGN') : type === 'ux' ? 'UX DESIGN' : 'VIBE CODING')
  const numStr = String(index).padStart(2, '0')

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '2 / 3',
        backgroundColor: bg,
        borderRadius: layout.radius.card,
        overflow: 'hidden',
        padding: 'clamp(14px, 1.4vw, 22px)',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        boxShadow: active ? shadow.posterActive : shadow.poster,
      }}
    >
      {/* 상단: label + period (우측정렬) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
        <div style={{ textAlign: 'right', maxWidth: '100%' }}>
          <p style={{
            margin: 0,
            fontSize: 'clamp(9px, 0.7vw, 11px)',
            fontFamily: font.body,
            fontWeight: 700,
            letterSpacing: tracking.xl,
            textTransform: 'uppercase',
            lineHeight: 1.3,
            color: fg,
            opacity: 0.85,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {topLabel}
          </p>
          {period && (
            <p style={{
              margin: '2px 0 0',
              fontSize: 'clamp(9px, 0.7vw, 11px)',
              fontFamily: font.body,
              letterSpacing: tracking.lg,
              lineHeight: 1.3,
              color: fg,
              opacity: 0.6,
            }}>
              {period}
            </p>
          )}
        </div>
      </div>

      {/* 중앙: titleEn(메인) + titleKo(보조) */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 0,
        paddingTop: 'clamp(8px, 1vw, 14px)',
        paddingBottom: 'clamp(8px, 1vw, 14px)',
      }}>
        <h3 style={{
          margin: 0,
          fontSize: 'clamp(20px, 1.7vw, 32px)',
          fontWeight: 600,
          fontFamily: font.body,
          lineHeight: 1.1,
          letterSpacing: tracking.snug,
          color: fg,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          overflowWrap: 'break-word',
        }}>
          {mainTitle}
        </h3>
        {subTitle && (
          <p style={{
            margin: 'clamp(6px, 0.6vw, 10px) 0 0',
            fontSize: 'clamp(11px, 0.9vw, 14px)',
            fontFamily: font.body,
            lineHeight: 1.35,
            color: fg,
            opacity: 0.7,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            wordBreak: 'keep-all',
          }}>
            {subTitle}
          </p>
        )}
      </div>

      {/* 하단: 번호만 (좌) */}
      <div style={{ flexShrink: 0 }}>
        <span style={{
          fontSize: 'clamp(28px, 3vw, 52px)',
          fontWeight: 700,
          fontFamily: font.body,
          lineHeight: 1,
          letterSpacing: tracking.tight,
          color: fg,
          opacity: 0.85,
        }}>
          {numStr}
        </span>
      </div>

      {/* 깊이감 어둠 막 — opacity로 카드를 투명하게 하지 않고, 위에 검은 막을 덮어
          뒤 카드가 비치지 않으면서 멀수록 어둡게(불투명 유지). */}
      {dim > 0 && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: inkAlpha(dim),
            borderRadius: layout.radius.card,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}