import { color, type } from '../tokens.js'
import Button from '../components/ui/Button.jsx'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span
        className="font-mono text-xs uppercase tracking-[0.14em]"
        style={{ color: color.muted }}
      >
        404
      </span>
      <h1
        className="mt-4 font-display text-paper"
        style={{
          fontSize: type.h2.size,
          fontWeight: type.h2.weight,
          lineHeight: type.h2.lh,
          letterSpacing: type.h2.ls,
        }}
      >
        페이지를 찾을 수 없습니다
      </h1>
      <div className="mt-8">
        <Button href="/" variant="ghost">
          홈으로
        </Button>
      </div>
    </div>
  )
}
