import { color } from '../tokens.js'

// ink/paper 토큰 hex. 값은 tokens.js 한 곳에서만 정의한다.
const INK = color.ink
const PAPER = color.paper

function parseHex(hex) {
  let h = (hex || INK).replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (h.length !== 6) h = INK.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}

function toHex([r, g, b]) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase()
}

function luminance(rgb) {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastRatio(hexA, hexB) {
  const [hi, lo] = [luminance(parseHex(hexA)), luminance(parseHex(hexB))].sort((a, b) => b - a)
  return (hi + 0.05) / (lo + 0.05)
}

// YIQ 공식: 배경 밝기 계산 → 밝으면 ink 텍스트, 어두우면 paper 텍스트
export function contrastText(hexColor) {
  const [r, g, b] = parseHex(hexColor)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? INK : PAPER
}

// 어두운 배경(ink) 위에서 글자·테두리로 쓸 수 있도록 accent를 보정한다.
// 대비가 min 이상이면 원색 그대로, 모자라면 paper 쪽으로 섞어 밝힌다(색조 유지).
export function readableAccent(hexColor, min = 4.5, bg = INK) {
  const base = hexColor || color.accent
  if (contrastRatio(base, bg) >= min) return base
  const from = parseHex(base)
  const to = parseHex(PAPER)
  for (let t = 0.05; t <= 1; t += 0.05) {
    const mixed = toHex(from.map((v, i) => v + (to[i] - v) * t))
    if (contrastRatio(mixed, bg) >= min) return mixed
  }
  return PAPER
}
