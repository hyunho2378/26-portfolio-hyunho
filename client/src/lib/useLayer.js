import { useEffect, useRef, useState } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// 풀스크린 레이어(About/Contact) 공통 동작.
// 열림 시 포커스 이동, Tab 순환, Escape 닫기, 닫힘 시 트리거로 포커스 복귀, body 스크롤 잠금,
// 닫힘 애니메이션이 끝난 뒤 언마운트. reduced-motion이면 즉시 전환.
export function useLayer({ open, onClose, dur, onExited }) {
  const reduced = prefersReducedMotion()
  const [mounted, setMounted] = useState(open)
  const [ready, setReady] = useState(false)
  const ref = useRef(null)
  const onCloseRef = useRef(onClose)
  const onExitedRef = useRef(onExited)
  const returnRef = useRef(null)

  if (open && !mounted) setMounted(true)

  useEffect(() => {
    onCloseRef.current = onClose
    onExitedRef.current = onExited
  })

  useEffect(() => {
    if (!mounted) return undefined
    if (open) {
      const id = requestAnimationFrame(() => setReady(true))
      return () => cancelAnimationFrame(id)
    }
    const t = setTimeout(() => {
      setReady(false)
      setMounted(false)
      if (onExitedRef.current) onExitedRef.current()
    }, reduced ? 0 : dur)
    return () => clearTimeout(t)
  }, [open, mounted, reduced, dur])

  useEffect(() => {
    if (!mounted) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [mounted])

  useEffect(() => {
    if (!open) return undefined
    returnRef.current = document.activeElement
    const id = requestAnimationFrame(() => {
      const root = ref.current
      if (!root) return
      const first = root.querySelector('[data-autofocus]') || root
      first.focus()
    })
    function onKey(e) {
      if (e.key === 'Escape') { onCloseRef.current(); return }
      if (e.key !== 'Tab' || !ref.current) return
      const nodes = [...ref.current.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null)
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('keydown', onKey)
      if (returnRef.current && returnRef.current.focus) returnRef.current.focus()
    }
  }, [open])

  return { mounted, shown: open && (ready || reduced), reduced, ref }
}
