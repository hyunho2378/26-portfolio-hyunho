import { Mail, ExternalLink, AtSign } from 'lucide-react'
import { color, type as typeToken, space, layout } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: '이메일',
    href: 'mailto:ekjjodia@naver.com',
    text: 'ekjjodia@naver.com',
  },
  {
    icon: ExternalLink,
    label: 'GitHub',
    href: 'https://github.com/hyunho2378',
    text: 'GitHub · hyunho2378',
  },
  {
    icon: AtSign,
    label: 'Instagram',
    href: null,
    text: 'Instagram (준비 중)',
  },
]

export default function ContactSection({ id }) {
  return (
    <section
      id={id}
      style={{
        padding: `clamp(${space[20]}, 10vw, 140px) 0`,
        backgroundColor: color.ink,
        borderTop: `1px solid ${color.line}`,
      }}
    >
      <div
        style={{
          maxWidth: layout.containerSite,
          margin: '0 auto',
          padding: `0 clamp(${layout.pagePadX.base}, 5vw, ${layout.pagePadX.xl})`,
        }}
      >
        <SectionLabel>CONTACT</SectionLabel>

        <h2
          style={{
            marginTop: space[4],
            fontSize: typeToken.h2.size,
            fontWeight: typeToken.h2.weight,
            lineHeight: typeToken.h2.lh,
            letterSpacing: typeToken.h2.ls,
            fontFamily: 'Pretendard, sans-serif',
            color: color.paper,
          }}
        >
          연락하기
        </h2>

        <ul
          style={{
            marginTop: space[8],
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: space[4],
          }}
        >
          {CONTACT_ITEMS.map(({ icon: Icon, label, href, text }) => {
            const content = (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: space[3],
                  fontSize: typeToken.bodyLg.size,
                  fontFamily: 'Pretendard, sans-serif',
                  color: href ? color.paper : color.muted,
                  transition: 'opacity 150ms ease',
                  textDecoration: 'none',
                }}
              >
                <Icon size={20} aria-hidden="true" />
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
                    style={{ textDecoration: 'none', outline: 'none', borderRadius: '4px' }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = `2px solid ${color.accent}`
                      e.currentTarget.style.outlineOffset = '3px'
                    }}
                    onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
