import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { projects } from '../data/projects.js'
import { color, type as typeToken, space, layout } from '../tokens.js'
import PageTransition from '../components/ui/PageTransition.jsx'
import LiveLinks from '../components/work/LiveLinks.jsx'
import NotFoundPage from './NotFoundPage.jsx'

const TYPE_LABEL = { ux: 'UX', dev: '개발', visual: '시각디자인' }

// 좌측 이미지 패널
function LeftImage({ project }) {
  const [imgErr, setImgErr] = useState(false)
  const { thumbnail, title, type, gallery } = project
  const showImg = thumbnail && !imgErr

  // visual 타입에 갤러리 여러 장이 있으면 세로 스택
  if (type === 'visual' && gallery && gallery.length > 1) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
        {gallery.slice(0, 5).map((g, i) => (
          <img
            key={i}
            src={g.src}
            alt={g.alt || title}
            style={{
              width: '100%',
              display: 'block',
              borderRadius: layout.radius.card,
              objectFit: 'contain',
            }}
          />
        ))}
      </div>
    )
  }

  const isVisual = type === 'visual'

  return (
    <div
      style={{
        width: '100%',
        maxHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: layout.radius.card,
        overflow: 'hidden',
        border: `1px solid ${color.line}`,
        backgroundColor: color.ink,
        // visual: 3/4 세로 비율 유지, 나머지: 이미지 자연 크기
        aspectRatio: isVisual ? '3 / 4' : '16 / 10',
      }}
    >
      {showImg ? (
        <img
          src={thumbnail}
          alt={title}
          onError={() => setImgErr(true)}
          style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }}
        />
      ) : (
        <span
          style={{
            fontSize: typeToken.h3.size,
            fontWeight: typeToken.h3.weight,
            fontFamily: 'Pretendard, sans-serif',
            color: color.muted,
            textAlign: 'center',
            padding: space[6],
          }}
        >
          {title}
        </span>
      )}
    </div>
  )
}

// 메타 항목 (라벨 + 값)
function MetaItem({ label, value }) {
  if (!value) return null
  return (
    <div>
      <p style={{
        fontSize: '11px',
        fontFamily: 'Pretendard, sans-serif',
        color: color.muted,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: space[1],
      }}>
        {label}
      </p>
      <p style={{
        fontSize: typeToken.small.size,
        fontFamily: 'Pretendard, sans-serif',
        color: color.paper,
        lineHeight: 1.5,
      }}>
        {value}
      </p>
    </div>
  )
}

// 타입별 우측 하단 콘텐츠
function RightContent({ project }) {
  const { type, links, pdfUrl, objective, strategy, tools } = project

  if (type === 'dev') {
    return (
      <div>
        <p style={{
          fontSize: '11px',
          fontFamily: 'Pretendard, sans-serif',
          color: color.muted,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: space[4],
        }}>
          LIVE SITE
        </p>
        <LiveLinks links={links} />
      </div>
    )
  }

  if (type === 'ux') {
    const hasLinks = links && links.some((l) => l.url)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: `${space[3]} ${space[5]}`,
              border: `1px solid ${color.accent}`,
              borderRadius: layout.radius.pill,
              fontSize: typeToken.label.size,
              fontWeight: typeToken.label.weight,
              fontFamily: 'Pretendard, sans-serif',
              letterSpacing: typeToken.label.ls,
              color: color.accent,
              textDecoration: 'none',
              transition: 'background-color 150ms ease',
              alignSelf: 'flex-start',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${color.accent}18` }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            PDF 열기
          </a>
        )}
        {hasLinks && <LiveLinks links={links} />}
        {!pdfUrl && !hasLinks && (
          <p style={{ fontSize: typeToken.small.size, fontFamily: 'Pretendard, sans-serif', color: color.muted }}>
            준비 중
          </p>
        )}
      </div>
    )
  }

  if (type === 'visual') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: space[6] }}>
        {objective && <MetaItem label="목표" value={objective} />}
        {strategy && <MetaItem label="전략" value={strategy} />}
        {tools && tools.length > 0 && (
          <MetaItem label="도구" value={tools.join(' · ')} />
        )}
      </div>
    )
  }

  return null
}

export default function WorkDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  if (!project) return <NotFoundPage />

  const { title, oneLiner, role, period, contribution, outcome, type, accent, category } = project

  return (
    <PageTransition>
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: color.ink,
          padding: `${space[10]} clamp(${layout.pagePadX.base}, 5vw, ${layout.pagePadX.xl}) ${space[20]}`,
        }}
      >
        <div style={{ maxWidth: layout.containerMax, margin: '0 auto' }}>

          {/* 뒤로가기 */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: `${space[2]} 0`,
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Pretendard, sans-serif',
              letterSpacing: '0.10em',
              color: color.muted,
              textTransform: 'uppercase',
              transition: 'color 150ms ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = color.paper }}
            onMouseLeave={(e) => { e.currentTarget.style.color = color.muted }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `2px solid ${color.accent}`
              e.currentTarget.style.outlineOffset = '3px'
            }}
            onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
          >
            <ChevronLeft size={14} aria-hidden="true" />
            Work
          </button>

          {/* 2단 레이아웃 */}
          <div className="detail-layout">

            {/* 좌: 이미지 */}
            <div style={{ position: 'sticky', top: space[10] }}>
              <LeftImage project={project} />
            </div>

            {/* 우: 정보 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: space[8] }}>

              {/* 타입 + 기간 */}
              <p style={{
                fontSize: typeToken.label.size,
                fontWeight: typeToken.label.weight,
                fontFamily: 'Pretendard, sans-serif',
                letterSpacing: typeToken.label.ls,
                color: color.muted,
                textTransform: 'uppercase',
              }}>
                {TYPE_LABEL[type] || type}{category ? ` · ${category}` : ''} · {period}
              </p>

              {/* 제목 */}
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: accent || color.accent,
                      flexShrink: 0,
                      marginTop: '8px',
                    }}
                  />
                  <h1 style={{
                    fontSize: typeToken.h1.size,
                    fontWeight: typeToken.h1.weight,
                    lineHeight: typeToken.h1.lh,
                    letterSpacing: typeToken.h1.ls,
                    fontFamily: 'Pretendard, sans-serif',
                    color: color.paper,
                  }}>
                    {title}
                  </h1>
                </div>
                {oneLiner && (
                  <p style={{
                    marginTop: space[3],
                    fontSize: typeToken.bodyLg.size,
                    fontFamily: 'Pretendard, sans-serif',
                    color: color.muted,
                    lineHeight: typeToken.bodyLg.lh,
                  }}>
                    {oneLiner}
                  </p>
                )}
              </div>

              {/* 구분선 */}
              <div style={{ borderTop: `1px solid ${color.line}` }} />

              {/* 메타 그리드 */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: space[6],
              }}>
                <MetaItem label="역할" value={role} />
                <MetaItem label="기간" value={period} />
                <MetaItem label="기여도" value={contribution} />
                <MetaItem label="결과" value={outcome} />
              </div>

              {/* 구분선 */}
              <div style={{ borderTop: `1px solid ${color.line}` }} />

              {/* 타입별 콘텐츠 */}
              <RightContent project={project} />

            </div>
          </div>

        </div>
      </div>

      <style>{`
        .detail-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: ${space[10]};
          margin-top: ${space[8]};
          align-items: start;
        }
        @media (min-width: 768px) {
          .detail-layout {
            grid-template-columns: 45fr 55fr;
            gap: ${space[12]};
          }
        }
      `}</style>
    </PageTransition>
  )
}
