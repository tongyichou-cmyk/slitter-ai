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
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
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
        dark: {
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
      },
    },
  },
  plugins: [],
}

export default config
