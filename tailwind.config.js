const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    colors: require('./tailwind.colors'),
    extend: {
      colors: {
        'transparent': '#00000000'
      },
      keyframes: {
        load: {
          '0%': { width: '5%' },
          '10%': { width: '15%' },
          '20%': { width: '25%' },
          '40%': { width: '35%' },
          '80%': { width: '60%' },
          '95%': { width: '80%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        load: 'load 5s linear',
        processing: 'spin 1s ease-in-out infinite'
      },
      gridTemplateAreas: {
        'color-square': [
          'name button',
          'shade shade'
        ],
        'color-semi': [
          'name name name name button',
          'shade shade shade shade shade'
        ],
        'color-wide': [
          'name name name name name name name name button button',
          'shade shade shade shade shade shade shade shade shade shade'
        ]
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))'
      },
      gridTemplateColumns: {
        'site': 'auto 1fr auto'
      },
      flexGrow: {
        2: 2
      },
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      minHeight: {
        10: '2.5rem'
      },
      maxWidth: {
        xxs: '16rem'
      }
    },
    screens: {
      'xs': '425px',
      ...defaultTheme.screens
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@savvywombat/tailwindcss-grid-areas'),
    require('tailwind-scrollbar')
  ],
}
