/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx"
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      sm: '14px',
      md: '16px',
      lg: '20px'
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {
        black: '#252A34',
        white: '#EAEAEA',
        pink: '#FF2E63',
        blue: '#08D9D6'
      }
    },
  },
  plugins: [],
}
