import { useState } from 'react'
import { color, space, layout } from '../../tokens.js'
import Lightbox from './Lightbox.jsx'

export default function Gallery({ items }) {
  const [lbIndex, setLbIndex] = useState(null)

  if (!items || items.length === 0) {
    return (
      <div
        style={{
          padding: space[8],
          border: `1px solid ${color.line}`,
          borderRadius: layout.radius.card,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '15px',
            fontFamily: 'Pretendard, sans-serif',
            color: color.muted,
          }}
        >
          갤러리 이미지가 준비 중입니다.
        </p>
      </div>
    )
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: space[3],
        }}
      >
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setLbIndex(i)}
            aria-label={`이미지 ${i + 1}: ${item.alt || ''} 크게 보기`}
            style={{
              display: 'block',
              width: '100%',
              aspectRatio: '4 / 3',
              overflow: 'hidden',
              borderRadius: layout.radius.card,
              border: `1px solid ${color.line}`,
              cursor: 'pointer',
              background: 'none',
              padding: 0,
              transition: 'opacity 150ms ease, border-color 150ms ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8'
              e.currentTarget.style.borderColor = color.paper
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.borderColor = color.line
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `2px solid ${color.accent}`
              e.currentTarget.style.outlineOffset = '3px'
            }}
            onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
          >
            <img
              src={item.src}
              alt={item.alt || ''}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </button>
        ))}
      </div>

      {lbIndex !== null && (
        <Lightbox
          items={items}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onPrev={() => setLbIndex((i) => Math.max(0, i - 1))}
          onNext={() => setLbIndex((i) => Math.min(items.length - 1, i + 1))}
        />
      )}
    </>
  )
}
