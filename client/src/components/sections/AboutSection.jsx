import { useState } from 'react'
import { profile } from '../../data/profile.js'
import { color, type as typeToken, space, layout } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import SkillBar from '../about/SkillBar.jsx'
import CollapsibleList from '../about/CollapsibleList.jsx'
import useReveal from '../../lib/useReveal.js'

// 프로필 사진 (세로 3/4 비율)
function ProfilePhoto() {
  const [err, setErr] = useState(false)
  const ok = profile.photo && !err
  const w = 'clamp(160px, 18vw, 220px)'

  return (
    <div>
      <div
        style={{
          width: w,
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
      <p style={{ marginTop: space[1], fontSize: typeToken.small.size, fontFamily: 'Pretendard, sans-serif', color: color.muted, letterSpacing: '0.08em' }}>
        {profile.nameEn}
      </p>
    </div>
  )
}

// 작은 칩 (height ~28px, pill border)
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

// GPA 블록 (동일 위계, 큰 숫자 금지)
function GpaBlock() {
  const { gpa } = profile
  if (!gpa) return null

  const rowStyle = {
    display: 'flex',
    gap: space[4],
    paddingTop: space[2],
    paddingBottom: space[2],
  }
  const labelStyle = {
    width: '56px',
    flexShrink: 0,
    fontSize: typeToken.small.size,
    fontFamily: 'Pretendard, sans-serif',
    color: color.muted,
  }
  const valueStyle = {
    fontSize: typeToken.small.size,
    fontFamily: 'Pretendard, sans-serif',
    color: color.paper,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={rowStyle}>
        <span style={labelStyle}>ALL</span>
        <span style={valueStyle}>{gpa.all} / {gpa.max}</span>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>전공</span>
        <span style={valueStyle}>{gpa.major} / {gpa.max}</span>
      </div>
      {gpa.ranks.map(({ term, score, rank }) => (
        <div key={term} style={rowStyle}>
          <span style={labelStyle}>{term}</span>
          <span style={valueStyle}>
            {score}
            <span style={{ marginLeft: space[3], color: color.muted }}>({rank})</span>
          </span>
        </div>
      ))}
    </div>
  )
}

// 섹션 블록 래퍼
function Block({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  )
}

export default function AboutSection() {
  const revealTop = useReveal({ delay: 0 })
  const revealBot = useReveal({ delay: 0 })

  return (
    <section
      id="about"
      style={{
        padding: `clamp(${space[20]}, 10vw, 140px) clamp(${layout.pagePadX.base}, 5vw, ${layout.pagePadX.xl})`,
        backgroundColor: color.ink,
      }}
    >
      <div style={{ maxWidth: layout.containerSite, margin: '0 auto' }}>
        <SectionLabel>ABOUT</SectionLabel>

        {/* ── 상단 블록: 좌(개인정보+툴) / 우(EDUCATION·AWARD) ── */}
        <div ref={revealTop.ref} style={revealTop.style} className="about-grid">

          {/* 좌측 컬럼 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: space[12] }}>

            {/* 1. 사진 + 이름 */}
            <ProfilePhoto />

            {/* 2. INTERESTED IN */}
            <Block label="INTERESTED IN">
              <p style={{ fontSize: typeToken.body.size, fontFamily: 'Pretendard, sans-serif', color: color.paper, lineHeight: typeToken.body.lh }}>
                {profile.interests.join(', ')}
              </p>
            </Block>

            {/* 3. CHARACTER */}
            <Block label="CHARACTER">
              <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: space[2], columnGap: space[3] }}>
                {profile.character.map((c) => (
                  <SmallChip key={c} label={c} />
                ))}
              </div>
            </Block>

            {/* 4. GPA */}
            <Block label="GPA">
              <GpaBlock />
            </Block>

            {/* 5. TOOLS */}
            <Block label="TOOLS">
              <SkillBar skills={profile.skills} skillTags={profile.skillTags} />
            </Block>
          </div>

          {/* 우측 컬럼: EDUCATION → AWARD */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: space[12] }}>
            <CollapsibleList label="EDUCATION" items={profile.education} collapsible={false} />
            <CollapsibleList label="AWARD" items={profile.awards} collapsible={false} />
          </div>
        </div>

        {/* ── 하단 블록: 좌(활동) / 우(경험) ── */}
        <div
          ref={revealBot.ref}
          style={{ ...revealBot.style, marginTop: space[16] }}
          className="about-grid"
        >
          <div>
            <CollapsibleList label="LEADERSHIP &amp; ACTIVITIES" items={profile.activities} collapsible={false} forceWhite={true} />
          </div>
          <div>
            <CollapsibleList label="EXPERIENCE" items={profile.experience} collapsible={false} forceWhite={true} />
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          gap: ${space[10]};
          margin-top: ${space[10]};
        }
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
            gap: ${space[16]};
          }
        }
      `}</style>
    </section>
  )
}
