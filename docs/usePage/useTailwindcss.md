---

title: tailwindcss
description: vitepress 使用 tailwindcss步骤
updated: 2024-12-04

---

# 流程步骤

<UpdatedTime :updated="$frontmatter.updated" />

> 使用tailwindcss 手册 七步走:

## 1. 安装 Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
```

## 2. 初始化 Tailwind CSS

```bash
npx tailwindcss init -p
```
>这将生成 tailwind.config.js 和 postcss.config.js 文件。

## 3. 配置 Tailwind CSS

> 在 tailwind.config.js 中，设置内容选项
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './docs/**/*.md',
    './docs/.vitepress/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 5. 创建 Tailwind CSS 样式文件

>在 docs/.vitepress 目录下创建一个 style.css 文件 添加以下内容:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 6. 引入 Tailwind CSS 样式

>在 docs/.vitepress/theme/index.js 中，引入 style.css：

```javascript
import DefaultTheme from 'vitepress/theme';
import './style.css'; // 引入 Tailwind CSS

export default {
  ...DefaultTheme,
};
```

## 7. 使用 Tailwind CSS

```markdown
---
title: VitePress 使用 Tailwind CSS
---

# 欢迎！

<div class="bg-blue-500 text-white p-4 rounded">
  这是一个使用 Tailwind CSS 的示例。
</div>



```

> [!WARNING]
> 如果样式有些不起作用 可以这样做:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './docs/**/*.md',
    './docs/.vitepress/**/*.{js,ts,vue}',
  ],
  purge: ['./docs/**/*.md', './docs/**/*.vue']// [!code ++]
  theme: {
    extend: {},
  },
  plugins: [],
};

```

## 最后

> 这样就能优雅的搭配Tailwind CSS 的进行开发了 *★,°*:.☆(￣▽￣)/$:*.°★* 。

<Card />