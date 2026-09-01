/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pvr-gold': '#FFA200',
        'pvr-gold-light': '#FFD996',
        'pvr-gold-warm': '#FFCB71',
        'pvr-dark': '#1E1E1E',
        'pvr-darker': '#171717',
        'pvr-darkest': '#111111',
        'pvr-card': '#2E2921',
      },
      fontFamily: {
        'gbold': ['Gbold', 'sans-serif'],
        'glight': ['Glight', 'sans-serif'],
        'gregular': ['Gregular', 'sans-serif'],
        'gsemibold': ['Gsemibold', 'sans-serif'],
      },
      screens: {
        'phone': {'max': '480px'},
        'tablet': {'max': '768px'},
        'laptop': {'max': '1024px'},
      },
      animation: {
        'spin-slow': 'spin-slow 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 162, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 162, 0, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
