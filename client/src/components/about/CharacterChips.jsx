import { color, space, layout } from '../../tokens.js'

export default function CharacterChips({ chips }) {
  if (!chips || chips.length === 0) return null

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: space[2],
      }}
    >
      {chips.map(({ label, accent }) => (
        <span
          key={label}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: `${space[2]} ${space[4]}`,
            border: `1px solid ${accent ? color.accent : color.line}`,
            borderRadius: layout.radius.pill,
            fontSize: '13px',
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: accent ? 600 : 400,
            letterSpacing: '0.04em',
            color: accent ? color.accent : color.muted,
          }}
        >
          {label}
        </span>
      ))}
    </div>
  )
}
