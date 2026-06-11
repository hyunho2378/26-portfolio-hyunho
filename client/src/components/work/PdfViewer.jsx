import { ExternalLink, Download } from 'lucide-react'
import { color, type as typeToken, space, layout } from '../../tokens.js'

export default function PdfViewer({ pdfUrl, title }) {
  if (!pdfUrl) {
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
            fontSize: typeToken.body.size,
            fontFamily: 'Pretendard, sans-serif',
            color: color.muted,
          }}
        >
          PDF 파일이 준비 중입니다.
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
      {/* 보조 링크 (모바일 인라인 실패 대비) */}
      <div style={{ display: 'flex', gap: space[3], flexWrap: 'wrap' }}>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: space[2],
            padding: `${space[2]} ${space[4]}`,
            border: `1px solid ${color.line}`,
            borderRadius: layout.radius.md,
            color: color.paper,
            fontSize: typeToken.small.size,
            fontWeight: 600,
            fontFamily: 'Pretendard, sans-serif',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'opacity 150ms ease',
            outline: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          onFocus={(e) => {
            e.currentTarget.style.outline = `2px solid ${color.accent}`
            e.currentTarget.style.outlineOffset = '3px'
          }}
          onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
        >
          <ExternalLink size={14} aria-hidden="true" />
          새 탭에서 열기
        </a>
        <a
          href={pdfUrl}
          download
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: space[2],
            padding: `${space[2]} ${space[4]}`,
            border: `1px solid ${color.line}`,
            borderRadius: layout.radius.md,
            color: color.paper,
            fontSize: typeToken.small.size,
            fontWeight: 600,
            fontFamily: 'Pretendard, sans-serif',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'opacity 150ms ease',
            outline: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          onFocus={(e) => {
            e.currentTarget.style.outline = `2px solid ${color.accent}`
            e.currentTarget.style.outlineOffset = '3px'
          }}
          onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
        >
          <Download size={14} aria-hidden="true" />
          다운로드
        </a>
      </div>

      {/* 인라인 PDF 뷰어 */}
      <div
        style={{
          width: '100%',
          border: `1px solid ${color.line}`,
          borderRadius: layout.radius.card,
          overflow: 'hidden',
        }}
      >
        <iframe
          src={pdfUrl}
          title={title}
          style={{
            display: 'block',
            width: '100%',
            height: 'min(80vh, 900px)',
            border: 'none',
            backgroundColor: color.ink,
          }}
        />
      </div>
    </div>
  )
}
