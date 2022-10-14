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
        500: '#0091FF',
      },
      black: '#252A34',
      white: {
        200: '#ededed',
      },
      pink: '#FF2E63',
    },
    extend: {
      animation: {
        slideIn: 'slideIn .3s linear',
      },
      keyframes: {
        slideIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
          '100%': {
            opacity: '100',
            transform: 'translateY(0%)',
          },
        },
      },
      gridTemplateColumns: {
        volCard: 'repeat(2, minmax(0, 2fr));',
      },
    },
  },
  plugins: [],
};
