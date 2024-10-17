/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#17252A',
        'primary-medium':'#3AAFA9',
        'primary-white': '#DEF2F1',
        'primary-gray':  '#2B7A7B',
      }
    },
  },
  plugins: [],
}
