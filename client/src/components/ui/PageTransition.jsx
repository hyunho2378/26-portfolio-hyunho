import { useEffect, useState } from 'react'
import { motion } from '../../tokens.js'

const EASE = motion.ease
const DUR = 480
const prefersReduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function PageTransition({ children }) {
  const [shown, setShown] = useState(prefersReduced)

  useEffect(() => {
    if (prefersReduced) return undefined
    const raf = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  if (prefersReduced) return <>{children}</>

  return (
    <div
      style={{
        opacity: shown ? 1 : 0,
        transition: `opacity ${DUR}ms ${EASE}`,
      }}
    >
      {children}
    </div>
  )
}
