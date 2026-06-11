import { useEffect, useState } from 'react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const DUR = 480
const prefersReduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function PageTransition({ children }) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (prefersReduced) { setShown(true); return }
    const raf = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  if (prefersReduced) return <>{children}</>

  return (
    <div
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(7%)',
        borderRadius: shown ? '0px' : '24px 24px 0 0',
        transition: [
          `opacity ${DUR}ms ${EASE}`,
          `transform ${DUR}ms ${EASE}`,
          `border-radius ${DUR}ms ${EASE}`,
        ].join(', '),
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}
