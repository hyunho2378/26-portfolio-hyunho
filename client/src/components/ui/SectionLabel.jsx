import { type, color } from '../../tokens.js'

// 아이브로우. accent(프라이머리) 핑크 + 볼드 + 확대. 선 장식 없음.
export default function SectionLabel({ children }) {
  return (
    <span
      className="inline-flex items-center uppercase"
      style={{
        fontSize: type.label.size,
        fontWeight: type.label.weight,
        letterSpacing: type.label.ls,
        color: color.accent,
        fontFamily: 'Pretendard, sans-serif',
      }}
    >
      {children}
    </span>
  )
}
