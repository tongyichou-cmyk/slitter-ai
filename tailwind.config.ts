import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'Menlo', 'monospace'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Libre Baskerville"', 'Georgia', 'serif'],
      },
      colors: {
        // Legacy gold scale kept for backward compat with wiki/guide pages
        gold: {
          50:  '#FDFBF0',
          100: '#FAF3D0',
          200: '#F5E68A',
          400: '#E8C84A',
          500: '#D4AF37',
          600: '#B8960C',
          700: '#9A7D0A',
          900: '#3D3004',
        },
        ink: {
          900: '#0A0A0A',
          800: '#111111',
          700: '#1A1A1A',
          600: '#222222',
          500: '#2A2A2A',
          400: '#333333',
        },
        brand: {
          50:  '#FDFBF0',
          100: '#FAF3D0',
          500: '#D4AF37',
          600: '#B8960C',
          700: '#9A7D0A',
          900: '#3D3004',
        },
        // New design system
        sl: {
          black:    '#080808',
          bg:       '#0E0E0E',
          surface:  '#141414',
          surface2: '#1A1A1A',
          border:   '#242424',
          border2:  '#2E2E2E',
          yellow:   '#F5C400',
          yellow2:  '#D4A800',
          yellow3:  '#FFF0A0',
          text:     '#E8E8E8',
          text2:    '#999999',
          text3:    '#555555',
        },
      },
    },
  },
  plugins: [],
}

export default config
