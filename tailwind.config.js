/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#785252',
        secondary: '#e8dff0',
        tertiary: '#fecbcb',
        neutral: '#adadab',
        surface: '#f7f6f3',
        'surface-low': '#f1f1ee',
        'surface-lowest': '#ffffff',
        'surface-container': '#e8e8e5',
        'surface-highest': '#ddddd9',
        'on-surface': '#2e2f2d',
      },
      fontFamily: {
        serif: ['Noto Serif', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'md': '24px',
        'lg': '32px',
      },
      boxShadow: {
        'lift': '0 4px 16px 0 rgba(46, 47, 45, 0.05)',
        'float': '0 8px 40px 0 rgba(46, 47, 45, 0.05)',
        'modal': '0 16px 60px 0 rgba(46, 47, 45, 0.06)',
      },
    },
  },
  plugins: [],
}
