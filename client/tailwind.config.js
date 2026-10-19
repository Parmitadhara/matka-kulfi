/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clayTerracotta: '#C85A32',
        clayDark: '#8F3414',
        creamBg: '#FBF9F5',
        creamCard: '#F5EFEB',
        navyBrand: '#082245',
        navyHover: '#05162E',
        skyMist: '#DCEEF8',
        tanCaramel: '#D3A274',
        kesarGold: '#E5A93C',
        accentCyan: '#0A88D8'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}