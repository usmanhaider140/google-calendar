/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-red-500',
    'bg-purple-500',
    'bg-teal-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-gray-500',
    'bg-red-200',
    'bg-purple-200',
    'bg-teal-200',
    'bg-blue-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-gray-200',
  ],
  theme: {
    extend: {
      colors,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Open Sans'],
      },
      gridTemplateColumns: {
        '1/5': '1fr 5fr',
      },
    },
    fontFamily: 'Open Sans, sans-serif',
  },
  plugins: [require('@tailwindcss/forms')],
};
