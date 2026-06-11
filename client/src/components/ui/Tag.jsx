import { layout } from '../../tokens.js'

// 모노 소형 칩. 보더 1px line.
export default function Tag({ children }) {
  return (
    <span
      className="inline-flex items-center border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
      style={{ borderRadius: layout.radius.pill }}
    >
      {children}
    </span>
  )
}
