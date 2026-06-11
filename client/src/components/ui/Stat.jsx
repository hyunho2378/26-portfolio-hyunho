import useCountUp from '../../lib/useCountUp.js'
import { type } from '../../tokens.js'

// 큰 수치(display) + 모노 라벨. useCountUp 연동.
export default function Stat({ value, suffix = '', label }) {
  const { ref, value: n } = useCountUp(value)
  return (
    <div ref={ref}>
      <div
        className="font-display tabular-nums text-paper"
        style={{ fontSize: type.h1.size, lineHeight: type.h1.lh, letterSpacing: type.h1.ls, fontWeight: type.h1.weight }}
      >
        {n}
        {suffix}
      </div>
      <div className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-muted">{label}</div>
    </div>
  )
}
