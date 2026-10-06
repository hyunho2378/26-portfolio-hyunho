import { useEffect, useRef, useState } from 'react'
import { color, motion } from '../../tokens.js'

export default function Splash({ onDone }) {
  const [logoVisible, setLogoVisible] = useState(false)
  const [splashOut, setSplashOut] = useState(false)
  const onDoneRef = useRef(onDone)
  useEffect(() => { onDoneRef.current = onDone })
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // body 스크롤 잠금
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => onDoneRef.current(), 800)
      return () => clearTimeout(t)
    }
    const rafId = requestAnimationFrame(() => setLogoVisible(true))
    const t1 = setTimeout(() => setSplashOut(true), 1400)
    const t2 = setTimeout(() => onDoneRef.current(), 1900)
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: color.ink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: splashOut ? 0 : 1,
        transition: reduced ? 'none' : `opacity 500ms ${motion.ease}`,
        pointerEvents: splashOut ? 'none' : 'all',
      }}
    >
      <img
        src="/logo-ho.svg"
        alt="HO"
        style={{
          width: 'clamp(120px, 16vw, 200px)',
          height: 'auto',
          display: 'block',
          opacity: reduced ? 1 : logoVisible ? 1 : 0,
          transform: reduced ? 'none' : logoVisible ? 'translateY(0px)' : 'translateY(12px)',
          transition: reduced
            ? 'none'
            : `opacity 600ms ${motion.ease}, transform 600ms ${motion.ease}`,
        }}
      />
    </div>
  )
}
