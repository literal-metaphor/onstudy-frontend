import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7F8B7A',
        'secondary': '#FFD152',
        'black': '#212529',
        'white': '#FEFCFF',
        'danger': '#DC3545',
        'success': '#28A745',
        'blue': '#0D6EFD',
        'grey': '#D1D5DB',
      }
    },
  },
  prefix: 'tw-',
  daisyui: {
    themes: ['light'],
  },
  plugins: [
    daisyui,
  ],
}