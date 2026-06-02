import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rag: {
          bg:       '#0e0c0b',
          surface:  '#161412',
          surface2: '#1e1b18',
          border:   '#2a2520',
          text:     '#e8e0d5',
          muted:    '#7a7068',
          faint:    '#3d3830',
          accent:   '#c0392b',
          gold:     '#d4a017',
          blue:     '#4a90d9',
          green:    '#27ae60',
        },
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        display: ['"Cinzel"', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
