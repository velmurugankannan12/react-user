/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#008080'
      },
      backgroundColor: {
        primary: '#008080'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      screens: {
        'h-700': { 'raw': '(min-height: 700px)' },
        'h-900': { 'raw': '(min-height: 900px)' },
      },
    },
  },
  plugins: [],
}
