/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        planet: {
          100: '#948cac',
          200: '#796e94',
          300: '#524475',
          400: '#341e5c',
        },
      },
    },
  },
  plugins: [],
}
