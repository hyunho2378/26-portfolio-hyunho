import { useState } from 'react'
import { color, type as typeToken, space, layout, font } from '../../tokens.js'
import { profile } from '../../data/profile.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import SkillBar from './SkillBar.jsx'

const PHOTO_WIDTH = 'clamp(160px, 18vw, 260px)'

function Block({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[3] }}>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  )
}

function Photo() {
  const [err, setErr] = useState(false)
  const ok = profile.photo && !err
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[3] }}>
      <div
        style={{
          position: 'relative',
          width: PHOTO_WIDTH,
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
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          />
        ) : (
          <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: typeToken.caption.size, fontFamily: font.body, color: color.muted }}>
            PHOTO
          </span>
        )}
      </div>
      <div>
        <p style={{ fontSize: typeToken.bodyLg.size, fontWeight: 700, fontFamily: font.body, color: color.paper }}>{profile.name}</p>
        <p style={{ marginTop: space[1], fontSize: typeToken.small.size, fontFamily: font.body, color: color.muted }}>{profile.nameEn}</p>
      </div>
    </div>
  )
}

function Chip({ label }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: space[8],
        padding: `0 ${space[3]}`,
        border: `1px solid ${color.line}`,
        borderRadius: layout.radius.md,
        fontSize: typeToken.caption.size,
        fontFamily: font.body,
        color: color.muted,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}

function Gpa() {
  const { gpa } = profile
  const row = { display: 'flex', gap: space[4], paddingTop: space[2], paddingBottom: space[2] }
  const label = { width: space[16], flexShrink: 0, fontSize: typeToken.small.size, fontFamily: font.body, color: color.muted }
  const value = { fontSize: typeToken.small.size, fontFamily: font.body, color: color.paper }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={row}><span style={label}>ALL</span><span style={value}>{gpa.all} / {gpa.max}</span></div>
      <div style={row}><span style={label}>전공</span><span style={value}>{gpa.major} / {gpa.max}</span></div>
      {gpa.ranks.map(({ term, score, rank }) => (
        <div key={term} style={row}>
          <span style={label}>{term}</span>
          <span style={value}>{score}<span style={{ marginLeft: space[3], color: color.muted }}>({rank})</span></span>
        </div>
      ))}
    </div>
  )
}

function Row({ year, text, tier }) {
  return (
    <li style={{ display: 'flex', gap: space[4], paddingTop: space[2], paddingBottom: space[2], breakInside: 'avoid' }}>
      <span style={{ width: space[10], flexShrink: 0, fontSize: typeToken.caption.size, paddingTop: space[1], fontFamily: font.body, color: color.muted }}>
        {year}
      </span>
      <span style={{ minWidth: 0, fontSize: typeToken.small.size, fontFamily: font.body, lineHeight: typeToken.small.lh, color: tier === 'faint' ? color.muted : color.paper, overflowWrap: 'anywhere' }}>
        {text}
      </span>
    </li>
  )
}

function sortByYear(items) {
  return [...items].sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10))
}

// 1페이지: 소개 / 학력·GPA / 도구. 한 화면에 3열.
export function ProfilePage() {
  return (
    <div className="about-profile">
      <Photo />
      <div style={{ display: 'flex', flexDirection: 'column', gap: space[8], minWidth: 0 }}>
        <Block label="ABOUT">
          <p style={{ fontSize: typeToken.bodyLg.size, fontFamily: font.body, color: color.paper, lineHeight: typeToken.bodyLg.lh }}>
            {profile.intro}
          </p>
        </Block>
        <Block label="INTERESTED IN">
          <p style={{ fontSize: typeToken.body.size, fontFamily: font.body, color: color.paper, lineHeight: typeToken.body.lh }}>
            {profile.interests.join(', ')}
          </p>
        </Block>
        <Block label="CHARACTER">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: space[2] }}>
            {profile.character.map((c) => <Chip key={c} label={c} />)}
          </div>
        </Block>
        <Block label="EDUCATION">
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {sortByYear(profile.education).map((it) => <Row key={`${it.year}-${it.text}`} {...it} />)}
          </ul>
        </Block>
      </div>
      <div className="about-profile-tools" style={{ display: 'flex', flexDirection: 'column', gap: space[8], minWidth: 0 }}>
        <Block label="GPA"><Gpa /></Block>
        <Block label="TOOLS"><SkillBar skills={profile.skills} skillTags={profile.skillTags} /></Block>
      </div>
    </div>
  )
}

// 2~4페이지: 목록 하나만 한 화면에 다단으로 채운다.
export function ListPage({ label, items, cols }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[6] }}>
      <div className="about-list-head" style={{ display: 'flex', alignItems: 'baseline', gap: space[3] }}>
        <SectionLabel>{label}</SectionLabel>
        <span style={{ fontSize: typeToken.small.size, fontFamily: font.body, color: color.muted }}>{items.length}</span>
      </div>
      <ul className="about-cols" style={{ '--cols-md': cols.md, '--cols-xl': cols.xl, listStyle: 'none', padding: 0 }}>
        {sortByYear(items).map((it, i) => <Row key={`${it.year}-${i}`} {...it} />)}
      </ul>
    </div>
  )
}
