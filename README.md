<div align="center">
  <img alt="NING OEX" width="80" height="120" src="./docs/assets/person.png" style="border-radius: 50%;">
  <h1>NING OEX</h1>
  <p>个人博客 · 大前端技术笔记 · 随心记录</p>

  [![VitePress](https://img.shields.io/badge/VitePress-1.5-41b883?logo=vite&logoColor=fff)](https://vitepress.dev/)
  [![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js&logoColor=fff)](https://vuejs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/license-MIT-blue)](#)
</div>

---

## ⚡ 简介

一个基于 VitePress 搭建的个人博客，记录大前端方向的学习与思考。

> 随心记、想起记、有空记、高兴记、快乐记！

## ✨ 特性

- **📝 Markdown 驱动** — 纯 Markdown 写作，开箱即用
- **🎨 暗色 / 亮色主题** — 一键切换，全站适配
- **✨ GSAP 冲击动画** — 首屏、卡片、导航均有精心编排的入场动效
- **🌌 动态背景** — Canvas 粒子细胞网 + SVG 噪点 + 鼠标视差
- **⭐ 导航收藏** — 五角星置顶，localStorage 本地持久化
- **📱 响应式** — 桌面 / 平板 / 手机全适配
- **🔍 全文搜索** — 内置 LocalSearch

## 🛠 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | [VitePress](https://vitepress.dev/) · Vue 3 |
| 样式 | Tailwind CSS · PostCSS |
| 动画 | GSAP · Anime.js |
| 图标 | Font Awesome |
| 组件库 | Element Plus |

## 📁 目录结构

```
docs/
├── .vitepress/        # VitePress 配置与主题
├── assets/            # 图片、视频等静态资源
├── components/        # 自定义 Vue 组件
│   ├── layout/        # 首页布局（Home / Sidebar / Label 等）
│   ├── nav/           # 导航页（收藏置顶、目录）
│   └── works/         # 作品集
├── data/              # JSON 数据
├── types/             # TypeScript 类型定义
├── homePage/          # 首页文章
└── aiPage/            # AI 相关文档
```

## 🚀 快速开始

### 克隆仓库

```bash
git clone https://github.com/ningOEX/vitePress-ning-my-blog.git
cd vitePress-ning-my-blog
```

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

启动后访问终端提示的本地地址（默认 http://localhost:5173）。

### 构建生产包

```bash
npm run docs:build
```

### 预览构建产物

```bash
npm run docs:preview
```

## 📜 License

MIT
