import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#090807',
          2: '#111009',
          3: '#1a1916',
          4: '#222018',
          5: '#2a2820',
          6: '#343228',
        },
        gold: {
          DEFAULT: '#b8963e',
          2: '#d4af5a',
          3: '#f0cc7a',
          4: '#fde89a',
        },
        cream: {
          DEFAULT: '#f0ece4',
          2: '#c8c0b0',
          3: '#8a8070',
          4: '#5a5448',
          5: '#3a3428',
        },
        border: {
          DEFAULT: '#1e1c14',
          2: '#2e2c1c',
          3: '#3e3c2c',
        },
        success: {
          DEFAULT: '#4a9e6a',
          light: '#6ab880',
        },
        danger: '#c04848',
        info: '#4878c0',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Syne', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
        xs: ['0.75rem', { lineHeight: '1.1rem' }],
      },
      borderRadius: {
        DEFAULT: '10px',
        sm: '6px',
        full: '9999px',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [typography],
}

export default config
