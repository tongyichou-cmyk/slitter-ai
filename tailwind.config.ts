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
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif:   ['var(--font-body)', 'Georgia', 'serif'],
        sans:    ['var(--font-ui)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'Menlo', 'monospace'],
      },
      colors: {
        ink:           '#0F0D0B',
        bg:            '#F7F3EE',
        bg2:           '#EDE8E0',
        surface:       '#FFFFFF',
        border:        '#D8CFC4',
        border2:       '#C8BDB0',
        gold:          '#B8860B',
        gold2:         '#9A7009',
        'gold-light':  '#F5E6B8',
        brand: {
          500: '#D4A010',
          600: '#B8860B',
          700: '#9A7009',
        },
        mocha:         '#4A3728',
        mocha2:        '#6B4F3A',
        'mocha-light': '#8B6E5A',
        text:          '#1A1512',
        text2:         '#4A3F35',
        text3:         '#8A7A6E',
        text4:         '#B5A89A',
      },
    },
  },
  plugins: [],
}

export default config
