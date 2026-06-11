import { layout } from '../../tokens.js'

// variant: solid(paper 배경·ink 텍스트) / ghost(보더만) / text. hover는 배경·보더·색만, scale 금지.
const VARIANTS = {
  solid: 'bg-paper text-ink hover:bg-muted',
  ghost: 'border border-line text-paper hover:border-paper',
  text: 'text-paper hover:text-accent',
}

export default function Button({ variant = 'solid', href, children, className = '', ...rest }) {
  const cls = `inline-flex items-center justify-center gap-2 px-5 py-2.5 font-mono text-sm uppercase tracking-[0.08em] transition-colors duration-200 ${VARIANTS[variant]} ${className}`
  const style = { borderRadius: layout.radius.md }
  if (href) {
    return (
      <a href={href} className={cls} style={style} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} style={style} {...rest}>
      {children}
    </button>
  )
}
