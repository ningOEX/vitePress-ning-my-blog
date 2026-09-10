/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './docs/**/*.md',
    './docs/.vitepress/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'selector',
  plugins: [],
};