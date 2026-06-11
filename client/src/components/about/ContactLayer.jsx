import { useEffect, useRef, useState } from 'react'
import { X, Mail, ExternalLink, AtSign } from 'lucide-react'
import { color, type as typeToken, space, layout } from '../../tokens.js'
import { profile } from '../../data/profile.js'

const DUR = 350

export default function ContactLayer({ open, onClose }) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useEffect(() => {
    if (!mounted) return
    if (open) {
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    } else {
      setVisible(false)
      if (reduced) {
        setMounted(false)
      } else {
        const t = setTimeout(() => setMounted(false), DUR)
        return () => clearTimeout(t)
      }
    }
  }, [open, mounted])

  useEffect(() => {
    if (!mounted) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [mounted])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onCloseRef.current() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (visible && closeBtnRef.current) closeBtnRef.current.focus()
  }, [visible])

  if (!mounted) return null

  const ITEMS = [
    { icon: Mail, label: '이메일', href: `mailto:${profile.contacts.email}`, text: profile.contacts.email },
    { icon: ExternalLink, label: 'GitHub', href: profile.contacts.github, text: `GitHub · hyunho2378` },
    { icon: AtSign, label: 'Instagram', href: profile.contacts.instagram || null, text: 'Instagram (준비 중)' },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact"
      onClick={(e) => { if (e.target === e.currentTarget) onCloseRef.current() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        backgroundColor: 'rgba(24,24,24,0.88)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `0 clamp(${layout.pagePadX.base}, 5vw, ${layout.pagePadX.xl})`,
        opacity: reduced ? 1 : visible ? 1 : 0,
        transition: reduced ? 'none' : `opacity ${DUR}ms ease`,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: color.ink,
          border: `1px solid ${color.line}`,
          borderRadius: layout.radius.card,
          padding: `${space[8]} ${space[8]} ${space[10]}`,
          transform: reduced ? 'none' : visible ? 'translateY(0px)' : 'translateY(16px)',
          transition: reduced ? 'none' : `transform ${DUR}ms cubic-bezier(0.22,1,0.36,1)`,
        }}
      >
        {/* 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: space[8] }}>
          <span
            style={{
              fontSize: typeToken.label.size,
              fontWeight: typeToken.label.weight,
              fontFamily: 'Pretendard, sans-serif',
              letterSpacing: typeToken.label.ls,
              color: color.accent,
              textTransform: 'uppercase',
            }}
          >
            CONTACT
          </span>
          <button
            ref={closeBtnRef}
            onClick={() => onCloseRef.current()}
            aria-label="닫기"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: color.paper,
              borderRadius: layout.radius.md,
              flexShrink: 0,
              transition: 'opacity 150ms ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.6' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `2px solid ${color.accent}`
              e.currentTarget.style.outlineOffset = '2px'
            }}
            onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* 연락처 목록 */}
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: space[5] }}>
          {ITEMS.map(({ icon: Icon, label, href, text }) => {
            const inner = (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: space[3],
                  fontSize: typeToken.body.size,
                  fontFamily: 'Pretendard, sans-serif',
                  color: href ? color.paper : color.muted,
                  textDecoration: 'none',
                }}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{text}</span>
              </span>
            )
            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{ textDecoration: 'none', outline: 'none', borderRadius: '4px', display: 'inline-flex' }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = `2px solid ${color.accent}`
                      e.currentTarget.style.outlineOffset = '3px'
                    }}
                    onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
                  >
                    {inner}
                  </a>
                ) : inner}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
