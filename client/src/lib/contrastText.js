// YIQ 공식: 배경 밝기 계산 → 밝으면 ink 텍스트, 어두우면 paper 텍스트
export function contrastText(hexColor) {
  const hex = (hexColor || '#181818').replace('#', '')
  if (hex.length !== 6) return '#FFFFFF'
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#181818' : '#FFFFFF'
}
