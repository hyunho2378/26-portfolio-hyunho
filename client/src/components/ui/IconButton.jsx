import { color, layout, motion } from '../../tokens.js'

// 아이콘 전용 버튼. 터치 타깃 44px, 아이콘 크기와 분리. aria-label 필수.
// 포커스 링은 전역 :focus-visible 규칙을 따른다(인라인 outline 금지).
export default function IconButton({ label, onClick, disabled = false, bordered = true, children, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="hover:opacity-60 active:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: layout.touch,
        height: layout.touch,
        flexShrink: 0,
        background: 'none',
        border: bordered ? `1px solid ${color.line}` : 'none',
        borderRadius: layout.radius.pill,
        color: color.paper,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: `opacity ${motion.fast} ease`,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
