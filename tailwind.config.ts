import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rag: {
          bg:       '#0f0f13',
          surface:  '#16161d',
          surface2: '#1e1e28',
          border:   '#2a2a38',
          text:     '#e8e6f0',
          muted:    '#8b89a0',
          faint:    '#454358',
          accent:   '#7c6af5',
          gold:     '#e8b84b',
        },
      },
      fontFamily: {
        body:    ['Inter', 'sans-serif'],
        display: ['Cinzel', 'serif'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':      { transform: 'translateX(-4px)' },
          '40%':      { transform: 'translateX(4px)' },
          '60%':      { transform: 'translateX(-3px)' },
          '80%':      { transform: 'translateX(3px)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
} satisfies Config
