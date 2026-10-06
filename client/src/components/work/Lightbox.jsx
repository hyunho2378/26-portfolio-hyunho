import { useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { color, space, layout, font, motion, type as typeToken } from '../../tokens.js'

const EASE = motion.ease

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index]
  const hasPrev = index > 0
  const hasNext = index < items.length - 1

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowLeft' && hasPrev) onPrev()
    else if (e.key === 'ArrowRight' && hasNext) onNext()
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  if (!item) return null

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  const btnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: layout.touch,
    height: layout.touch,
    background: 'none',
    border: `1px solid ${color.line}`,
    borderRadius: layout.radius.pill,
    cursor: 'pointer',
    color: color.paper,
    transition: `opacity ${motion.fast} ${EASE}`,
    flexShrink: 0,
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="이미지 라이트박스"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: color.overlay.base,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: space[4],
        transition: `opacity 200ms ${EASE}`,
      }}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        aria-label="라이트박스 닫기"
        style={{ ...btnStyle, position: 'absolute', top: space[4], right: space[4] }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.6' }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
      >
        <X size={20} aria-hidden="true" />
      </button>

      {/* 이미지 + 좌우 버튼 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: space[4],
          width: '100%',
          maxWidth: '90vw',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label="이전 이미지"
          style={{ ...btnStyle, opacity: hasPrev ? 1 : 0.2, cursor: hasPrev ? 'pointer' : 'default' }}
          onMouseEnter={(e) => { if (hasPrev) e.currentTarget.style.opacity = '0.6' }}
          onMouseLeave={(e) => { if (hasPrev) e.currentTarget.style.opacity = '1' }}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: space[3] }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={item.src}
            alt={item.alt || ''}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: layout.radius.md,
              display: 'block',
            }}
          />
          {item.alt && (
            <p
              style={{
                fontSize: typeToken.small.size,
                fontFamily: font.body,
                color: color.muted,
                textAlign: 'center',
              }}
            >
              {item.alt}
            </p>
          )}
          <p
            style={{
              fontSize: typeToken.caption.size,
              fontFamily: font.body,
              color: color.muted,
            }}
          >
            {index + 1} / {items.length}
          </p>
        </div>

        <button
          onClick={onNext}
          disabled={!hasNext}
          aria-label="다음 이미지"
          style={{ ...btnStyle, opacity: hasNext ? 1 : 0.2, cursor: hasNext ? 'pointer' : 'default' }}
          onMouseEnter={(e) => { if (hasNext) e.currentTarget.style.opacity = '0.6' }}
          onMouseLeave={(e) => { if (hasNext) e.currentTarget.style.opacity = '1' }}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
