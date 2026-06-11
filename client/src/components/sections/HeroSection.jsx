import { profile } from '../../data/profile.js'
import { layout, type as typeToken, color, space } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import useReveal from '../../lib/useReveal.js'

// HO 로고 인라인 SVG — img 태그로는 fill 제어 불가, 직접 인라인
function HoLogoSvg({ style }) {
  return (
    <svg
      viewBox="0 0 673 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="HO 로고"
      style={style}
    >
      <path
        d="M611.989 56.8963C588.069 32.9763 558.819 16.4013 526.839 8.34131C526.839 8.79631 526.839 9.31631 526.839 9.77131C526.839 11.2663 526.839 12.8263 526.774 14.3213C603.084 34.5363 659.309 104.086 659.309 186.766C659.309 196.126 658.594 205.356 657.164 214.326C651.639 251.896 634.284 286.606 606.919 313.971C573.249 347.641 528.529 366.166 480.884 366.166C433.239 366.166 388.519 347.641 354.849 313.971C327.484 286.606 310.129 251.896 304.604 214.326C303.239 205.356 302.459 196.126 302.459 186.766C302.459 163.691 306.879 141.591 314.874 121.376L329.694 92.0613L371.424 9.51131H330.799L252.539 159.726H145.289L206.324 52.4763H161.604L11.1943 315.986H56.4341L140.219 168.696H247.859L171.094 315.986H216.334L282.894 198.986L306.489 251.311C315.589 276.531 330.214 299.606 349.714 319.106C384.749 354.141 431.224 373.381 480.754 373.381C530.284 373.381 576.824 354.076 611.794 319.106C646.829 284.071 666.069 237.596 666.069 188.066C666.069 138.536 646.764 91.9963 611.794 57.0263L611.989 56.8963Z"
        fill="#E27DA6"
        stroke="#E27DA6"
        strokeWidth="13"
        strokeMiterlimit="10"
      />
    </svg>
  )
}

export default function HeroSection() {
  const text = useReveal({ delay: 0 })
  const logo = useReveal({ delay: 100 })

  return (
    <section
      id="hero"
      style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        padding: `clamp(${space[12]}, 8vw, ${space[20]}) clamp(${layout.pagePadX.base}, 5vw, ${layout.pagePadX.xl})`,
        backgroundColor: color.ink,
      }}
    >
      <div style={{ maxWidth: layout.containerSite, margin: '0 auto', width: '100%' }}>
        <div className="hero-inner">

          {/* 로고 — DOM 첫 번째(모바일=상단), 데스크탑에서 order:1로 우측 배치 */}
          <div
            ref={logo.ref}
            style={{
              ...logo.style,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="hero-logo"
          >
            <HoLogoSvg
              style={{ width: '100%', maxWidth: 'clamp(120px, 22vw, 320px)', height: 'auto', display: 'block' }}
            />
          </div>

          {/* 텍스트 — DOM 두 번째(모바일=하단), 데스크탑에서 order:0으로 좌측 배치 */}
          <div
            ref={text.ref}
            style={{ ...text.style, display: 'flex', flexDirection: 'column', gap: space[4] }}
            className="hero-text"
          >
            <SectionLabel>2026 PORTFOLIO / VOL.01</SectionLabel>

            <h1
              style={{
                fontSize: 'clamp(48px, 7vw, 96px)',
                fontWeight: typeToken.hero.weight,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                fontFamily: 'Pretendard, sans-serif',
                color: color.paper,
                wordBreak: 'keep-all',
              }}
            >
              THE STRATEGIC<br />DESIGN ARCHIVE
            </h1>

            <div style={{ marginTop: space[6], display: 'flex', flexDirection: 'column', gap: space[1] }}>
              <p style={{
                fontSize: typeToken.body.size,
                fontFamily: 'Pretendard, sans-serif',
                color: color.paper,
                letterSpacing: '0.04em',
              }}>
                {profile.name} · {profile.nameEn}
              </p>
              <p style={{
                fontSize: typeToken.small.size,
                fontFamily: 'Pretendard, sans-serif',
                color: color.muted,
                letterSpacing: '0.02em',
              }}>
                {profile.majors}
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hero-inner {
          display: grid;
          gap: ${space[10]};
          align-items: center;
        }
        .hero-logo { order: 0; }
        .hero-text  { order: 0; }
        @media (min-width: 768px) {
          .hero-inner {
            grid-template-columns: 1.2fr 1fr;
            gap: ${space[16]};
          }
          .hero-logo { order: 1; justify-content: flex-end; }
          .hero-text  { order: 0; }
        }
      `}</style>
    </section>
  )
}
