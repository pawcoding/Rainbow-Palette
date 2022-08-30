/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      gridTemplateAreas: {
        'color-square': [
          'name name',
          '50 100',
          '200 300',
          '400 500',
          '600 700',
          '800 900'
        ],
        'color-wide': [
          'name name name name name name name name name name',
          '50 100 200 300 400 500 600 700 800 900'
        ]
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@savvywombat/tailwindcss-grid-areas')
  ],
}
