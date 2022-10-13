/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: '14px',
      sm: '16px',
      md: '18px',
      lg: '20px',
      xl: '24px',
      '2xl': '32px',
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      gray: {
        900: '#151718',
        700: '#35353A',
        500: '#3e3f45',
        300: '#7e7d86',
      },
      orange: {
        500: '#e44c2e',
        300: '#f06b50',
      },
      blue: {
        500: '#0091ff',
      },
      black: '#252A34',
      white: {
        200: '#ededed',
      },
      pink: '#FF2E63',
      blue: '#08D9D6',
    },
    extend: {},
  },
  plugins: [],
};
