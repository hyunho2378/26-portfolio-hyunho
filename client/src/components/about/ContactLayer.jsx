import { X, Mail, ExternalLink, AtSign } from 'lucide-react'
import { color, type as typeToken, space, layout, font, motion } from '../../tokens.js'
import { profile } from '../../data/profile.js'
import { useLayer } from '../../lib/useLayer.js'
import IconButton from '../ui/IconButton.jsx'

const DUR = 350
const PANEL_MAX = '440px'

export default function ContactLayer({ open, onClose }) {
  const { mounted, shown, reduced, ref } = useLayer({ open, onClose, dur: DUR })
  if (!mounted) return null

  const { email, github, instagram } = profile.contacts
  const githubId = github.split('/').filter(Boolean).pop()
  const ITEMS = [
    { icon: Mail, label: '이메일', href: `mailto:${email}`, text: email },
    { icon: ExternalLink, label: 'GitHub', href: github, text: `GitHub @${githubId}` },
    {
      icon: AtSign,
      label: 'Instagram',
      href: instagram ? `https://www.instagram.com/${instagram}/` : null,
      text: instagram ? `Instagram @${instagram}` : 'Instagram 준비 중',
    },
  ]

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Contact"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        backgroundColor: color.overlay.base,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `0 clamp(${layout.pagePadX.base}, 5vw, ${layout.pagePadX.xl})`,
        opacity: shown ? 1 : 0,
        transition: reduced ? 'none' : `opacity ${DUR}ms ease`,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: PANEL_MAX,
          backgroundColor: color.ink,
          border: `1px solid ${color.line}`,
          borderRadius: layout.radius.card,
          padding: `${space[8]} ${space[8]} ${space[10]}`,
          transform: reduced ? 'none' : shown ? 'translateY(0px)' : `translateY(${space[4]})`,
          transition: reduced ? 'none' : `transform ${DUR}ms ${motion.ease}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: space[8] }}>
          <span style={{ fontSize: typeToken.label.size, fontWeight: typeToken.label.weight, fontFamily: font.body, letterSpacing: typeToken.label.ls, color: color.accent }}>
            CONTACT
          </span>
          <IconButton label="닫기" onClick={onClose} bordered={false} data-autofocus>
            <X size={18} aria-hidden="true" />
          </IconButton>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: space[2] }}>
          {ITEMS.map(({ icon: Icon, label, href, text }) => {
            const inner = (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: space[3], minHeight: layout.touch, fontSize: typeToken.body.size, fontFamily: font.body, color: href ? color.paper : color.muted }}>
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
                    className="hover:opacity-70"
                    style={{ textDecoration: 'none', display: 'inline-flex', borderRadius: layout.radius.sm }}
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
