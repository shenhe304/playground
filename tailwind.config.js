/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", 'system-ui', 'sans-serif'],
        serif: ["'Cormorant Garamond'", 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        sm: '0 1px 4px 0 rgba(0,0,0,0.04)',
        DEFAULT: '0 2px 12px 0 rgba(0,0,0,0.06)',
        lg: '0 8px 32px 0 rgba(0,0,0,0.08)',
        xl: '0 16px 48px 0 rgba(0,0,0,0.10)',
        '2xl': '0 24px 64px 0 rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
