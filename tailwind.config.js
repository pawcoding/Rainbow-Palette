const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'pulse-spin': 'spin 1s ease-in-out infinite'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
    screens: {
      xs: '425px',
      ...defaultTheme.screens
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({ addVariant }) => {
      addVariant('hocus', ['&:hover', '&:focus']);
    }),
    plugin(({ addVariant }) => {
      addVariant('no-hover', '@media (hover: none)');
      addVariant('can-hover', '@media (hover: hover)');
      addVariant('pointer-coarse', '@media (pointer: coarse)');
      addVariant('pointer-fine', '@media (pointer: fine)');
      addVariant('pointer-none', '@media (pointer: none)');
    })
  ]
};
