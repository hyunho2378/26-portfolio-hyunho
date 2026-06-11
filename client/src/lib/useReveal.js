import { useEffect, useRef, useState } from 'react'

// 뷰포트 진입 시 opacity 0→1 + translateY 16px→0 (scale/translateZ 아님). stagger=delay(ms).
// prefers-reduced-motion 시 즉시 표시(애니 없음). DESIGN 모션 ease 사용.
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function useReveal({ delay = 0, y = 16, duration = 500 } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style = {
    opacity: shown ? 1 : 0,
    transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
    transition: `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
  }

  return { ref, style, shown }
}
