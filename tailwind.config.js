/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        primary: '#111111',
        accent: '#E8FF47',
        surface: '#F5F5F0',
        muted: '#888888',
      }
    },
  },
  plugins: [],
}
