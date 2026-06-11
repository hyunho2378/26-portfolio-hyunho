/** @type {import('tailwindcss').Config} */
import { color, font, space } from './src/tokens.js'

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: color.ink,
        paper: color.paper,
        muted: color.muted,
        line: color.line,
        accent: color.accent,
        focus: color.focus,
      },
      fontFamily: {
        display: font.display.split(',').map((f) => f.trim()),
        body: font.body.split(',').map((f) => f.trim()),
        mono: font.mono.split(',').map((f) => f.trim()),
      },
      spacing: space,
    },
  },
  plugins: [],
}
