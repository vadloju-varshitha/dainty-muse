import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FFFFF0',
          50: '#FFFFFB',
          100: '#FFFFF0',
          200: '#FDFDE0',
          300: '#FAF8CC',
        },
        champagne: {
          DEFAULT: '#F7E7CE',
          50: '#FDF8F0',
          100: '#F7E7CE',
          200: '#EFD5A8',
          300: '#E4C07A',
          400: '#D4A853',
          500: '#C49A3C',
          600: '#A67C2E',
          700: '#8A6422',
          gold: '#C9A96E',
          dark: '#A67C2E',
        },
        warmBrown: {
          DEFAULT: '#6B4F3A',
          50: '#F5EDE8',
          100: '#E8D5C8',
          200: '#D4B09A',
          300: '#B8866A',
          400: '#8C6044',
          500: '#6B4F3A',
          600: '#543D2C',
          700: '#3D2B1F',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
