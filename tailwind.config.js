/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        everbuy: {
          nav: '#131921',
          belt: '#232f3e',
          accent: '#ff9900',
          'accent-hover': '#e38800',
          main: '#eaeded',
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(255, 153, 0, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 12px rgba(255, 153, 0, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}