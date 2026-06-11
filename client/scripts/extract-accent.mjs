// extract-accent.mjs — 프로젝트 썸네일에서 대표 키컬러를 추출해 accent 후보를 만든다.
// 빌드 타임 1회 실행용(런타임 연산 X). 재실행 가능.
//   실행: node scripts/extract-accent.mjs
// 출력: 비교표(id | 기존 accent | 추출 키컬러 | 보정 후) + scripts/accent-results.json
// ⚠ projects.js는 직접 수정하지 않는다. 사용자 승인 후 별도로 일괄 교체.

import { Vibrant } from 'node-vibrant/node'
import sharp from 'sharp'
import { existsSync } from 'node:fs'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { projects } from '../src/data/projects.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')

// 의도적으로 어둡거나 골드 톤 — 과보정 금지(L 하한만 살짝)
const DARK_EXCEPT = new Set(['axiom', 'dalat-vibe', 'gangwon-ci', 'dah-leaflet'])

// ── 색공간 변환 ──────────────────────────────────────────────
function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}
function rgbToHex([r, g, b]) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase()
}
function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0; const l = (max + min) / 2
  const d = max - min
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h /= 6
  }
  return [h, s, l]
}
function hslToRgb([h, s, l]) {
  if (s === 0) { const v = l * 255; return [v, v, v] }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return [hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3)].map((v) => v * 255)
}

// ── 보정 규칙 (Hue 유지, S·L만 조정) ─────────────────────────
function correct(hex, id) {
  let [h, s, l] = rgbToHsl(hexToRgb(hex))
  const isExcept = DARK_EXCEPT.has(id)
  if (isExcept) {
    // 과보정 금지: L 하한만 살짝(너무 까매서 텍스트가 안 보이는 경우 방지)
    if (l < 0.18) l = 0.24
    return rgbToHex(hslToRgb([h, s, l]))
  }
  if (l < 0.22) l = 0.36            // 너무 어두움 → 0.30~0.42 중간
  if (s < 0.35) s = 0.52            // 칙칙함 → 0.45~0.60 중간
  if (l > 0.85) l = 0.78           // 과한 파스텔 → 텍스트 대비 위해 낮춤
  return rgbToHex(hslToRgb([h, s, l]))
}

// ── 파일 경로 해석(파일명 ≠ id, gif는 webp/png로 대체) ───────
function resolveFile(thumbnail) {
  if (!thumbnail) return null
  let rel = thumbnail.replace(/^\//, '')          // thumbs/xxx.webp
  let abs = join(PUBLIC, rel)
  if (existsSync(abs)) return abs
  // gif → 동일명 webp/png 폴백 (node-vibrant gif 미지원 대비)
  for (const ext of ['.webp', '.png', '.jpg']) {
    const alt = abs.replace(/\.[^.]+$/, ext)
    if (existsSync(alt)) return alt
  }
  return null
}

// ── 메인 ─────────────────────────────────────────────────────
async function extractKey(file) {
  // sharp로 webp/gif(첫 프레임) → PNG 버퍼 변환(node-vibrant 기본 디코더는 webp 미지원).
  // 속도 위해 가로 400px로 축소.
  const buf = await sharp(file, { animated: false }).resize({ width: 400, withoutEnlargement: true }).png().toBuffer()
  const p = await Vibrant.from(buf).getPalette()
  // "가장 강조" = Vibrant > DarkVibrant > LightVibrant > Muted
  const order = ['Vibrant', 'DarkVibrant', 'LightVibrant', 'Muted', 'DarkMuted', 'LightMuted']
  for (const k of order) {
    if (p[k]) return { hex: p[k].hex.toUpperCase(), swatch: k }
  }
  return null
}

const rows = []
for (const proj of projects) {
  const file = resolveFile(proj.thumbnail)
  if (!file) {
    rows.push({ id: proj.id, old: proj.accent, extracted: null, swatch: '-', corrected: null, note: 'NO IMAGE' })
    continue
  }
  try {
    const key = await extractKey(file)
    if (!key) { rows.push({ id: proj.id, old: proj.accent, extracted: null, swatch: '-', corrected: null, note: 'NO SWATCH' }); continue }
    const corrected = correct(key.hex, proj.id)
    rows.push({ id: proj.id, old: proj.accent, extracted: key.hex, swatch: key.swatch, corrected, note: DARK_EXCEPT.has(proj.id) ? 'except(dark)' : '' })
  } catch (e) {
    rows.push({ id: proj.id, old: proj.accent, extracted: null, swatch: '-', corrected: null, note: 'ERR ' + e.message })
  }
}

// ── 표 출력 ──────────────────────────────────────────────────
const pad = (s, n) => String(s ?? '').padEnd(n)
console.log('\n' + pad('id', 24) + pad('기존 accent', 14) + pad('추출 키컬러', 16) + pad('swatch', 14) + pad('보정 후', 12) + 'note')
console.log('─'.repeat(98))
for (const r of rows) {
  console.log(pad(r.id, 24) + pad(r.old, 14) + pad(r.extracted || '—', 16) + pad(r.swatch, 14) + pad(r.corrected || '—', 12) + (r.note || ''))
}
console.log('─'.repeat(98))

writeFileSync(join(__dirname, 'accent-results.json'), JSON.stringify(rows, null, 2))
console.log(`\n${rows.length}개 처리 · 결과 저장 → scripts/accent-results.json`)
console.log('⚠ projects.js 미수정. 승인하면 corrected 값으로 일괄 교체합니다.\n')
