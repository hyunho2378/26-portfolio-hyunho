import { LayoutGrid, CircleUserRound, Mail } from 'lucide-react'
import { color, font, motion, ios, layout, tracking } from '../../tokens.js'

// iOS 26 키트 Tab Bar - iPhone(Tabs=3, Type=Default)을 웹으로 옮긴 하단 내비.
// 캡슐은 Liquid Glass - Regular(Mode=Dark), 선택 탭은 Glass Button(Mode=Dark) 값.
const TABS = [
  { id: 'work', label: 'Work', Icon: LayoutGrid },
  { id: 'about', label: 'About', Icon: CircleUserRound },
  { id: 'contact', label: 'Contact', Icon: Mail },
]

const t = ios.tabBar
const g = ios.glass

export default function TabBar({ active, onSelect, hidden = false }) {
  return (
    <nav
      aria-label="주요 메뉴"
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
      style={{
        opacity: hidden ? 0 : 1,
        transition: `opacity ${motion.base} ease`,
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 45,
        display: 'flex',
        justifyContent: 'center',
        padding: `${t.padTop} ${ios.margin} max(${t.padBottom}, env(safe-area-inset-bottom))`,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          padding: '0 2px',
          height: t.height,
          borderRadius: t.radius,
          backgroundColor: g.fill,
          backdropFilter: g.blur,
          WebkitBackdropFilter: g.blur,
          boxShadow: g.shadow,
        }}
      >
        {TABS.map(({ id, label, Icon }) => {
          const on = active === id
          return (
            <button
              key={id}
              type="button"
              aria-current={on ? 'page' : undefined}
              onClick={() => onSelect(id)}
              className="tabbar-btn"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: t.gap,
                minWidth: `clamp(${t.tabMinW}, 7vw, 108px)`,
                height: t.height,
                padding: t.tabPad,
                border: 'none',
                borderRadius: t.tabRadius,
                cursor: 'pointer',
                backgroundColor: on ? g.selected : 'transparent',
                boxShadow: on ? g.selectedRim : 'none',
                color: on ? color.accent : g.label,
                fontFamily: font.body,
                transition: `background-color ${motion.base} ${ios.sheetEase}, color ${motion.base} ease`,
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: t.iconBox }}>
                <Icon size={t.icon} strokeWidth={on ? 2.4 : 2} aria-hidden="true" />
              </span>
              <span
                style={{
                  fontSize: t.label,
                  lineHeight: t.labelLh,
                  fontWeight: t.labelWeight,
                  letterSpacing: tracking.snug,
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
      <style>{`
        .tabbar-btn:hover { color: ${color.paper} !important; }
        .tabbar-btn[aria-current="page"]:hover { color: ${color.accent} !important; }
        .tabbar-btn:focus-visible { outline: 2px solid ${color.accent}; outline-offset: -2px; }
        @media (min-width: ${layout.breakpoints['3xl']}px) {
          .tabbar-btn svg { width: 22px; height: 22px; }
          .tabbar-btn span:last-child { font-size: 12px !important; line-height: 14px !important; }
        }
      `}</style>
    </nav>
  )
}
