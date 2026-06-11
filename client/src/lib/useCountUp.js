import { useEffect, useRef, useState } from 'react'

// 뷰포트 진입 시 0 → target 카운트업(easeOutCubic). reduced-motion 시 즉시 target.
// rAF 타임스탬프만 사용(Date.now/Math.random 미사용).
export default function useCountUp(target = 0, { duration = 1200 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return undefined
    }
    let raf = 0
    let start = 0
    let started = false
    const step = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          raf = requestAnimationFrame(step)
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration])

  return { ref, value }
}
