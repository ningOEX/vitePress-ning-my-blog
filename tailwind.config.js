/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './docs/**/*.md',
    './docs/**/*.vue',
    './docs/.vitepress/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'selector',
  plugins: [],
};