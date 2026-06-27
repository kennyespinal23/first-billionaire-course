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
        // Sidebar dark theme (kept)
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
        // Light main content theme
        canvas: {
          DEFAULT: '#F5F4EF',
          2: '#EEEEE8',
          3: '#E2E2DA',
        },
        stone: {
          DEFAULT: '#0A0909',
          2: '#1A1918',
          3: '#363532',
          4: '#66635E',
          5: '#A09C96',
        },
        // Nav card colors (units.gr inspired)
        nav: {
          blue:   '#4B6CF7',
          orange: '#FF5C2B',
          red:    '#E63B3B',
          green:  '#2DC97E',
          purple: '#9B3FF4',
        },
        // Accent
        accent: {
          DEFAULT: '#FFB200',
          2: '#FFCA3A',
        },
        success: {
          DEFAULT: '#4a9e6a',
          light: '#6ab880',
        },
        danger: '#c04848',
        info: '#4878c0',
      },
      fontFamily: {
        serif:   ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:    ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
        body:    ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
        xs: ['0.75rem', { lineHeight: '1.1rem' }],
      },
      borderRadius: {
        DEFAULT: '10px',
        sm: '6px',
        lg: '16px',
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
