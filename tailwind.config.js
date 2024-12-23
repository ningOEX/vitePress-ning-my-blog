/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './docs/**/*.md',
    './docs/.vitepress/**/*.{js,ts,vue}',
  ],
  purge: ['./docs/**/*.md', './docs/**/*.vue'], // 根据你的文件结构调整路径
  theme: {
    extend: {},
  },
  plugins: [],
};