---

title: element-plus 
description: vitepress 使用 element-plus 步骤
updated: 2024-12-04

---

# 流程步骤

<UpdatedTime :updated="$frontmatter.updated" />

> 本章节介绍按需引入方法:

## 1. 安装 Element Plus

```bash
npm install element-plus
```

> 需引入组件，安装 babel-plugin-import
```bash
npm install -D babel-plugin-import
```

## 3. babel-plugin-import 配置

> 在项目根目录创建  babel.config.js文件 👉(与package.json 同级)：

```javascript
// babel.config.js
module.exports = {
    presets: [
        '@babel/preset-env',
        '@vue/babel-preset-jsx',
    ],
    plugins: [
        [
            'import',
            {
                libraryName: 'element-plus',
                libraryDirectory: 'es',
                style: (name) => `${name}/style/index.js`, // `style: true` 会加载 css 文件
            },
            'element-plus',
        ],
    ],
};
```

## 4. 项目主题配置

> 在 docs/.vitepress/theme/index.js 中，配置 Element Plus：

```javascript
import DefaultTheme from 'vitepress/theme';
import { ElButton, ElInput } from 'element-plus'; // 按需引入组件

import 'element-plus/es/components/button/style/css'; // Button 样式
import 'element-plus/es/components/input/style/css'; // Input 样式

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component(ElButton.name, ElButton); // 注册组件
    app.component(ElInput.name, ElInput); // 注册组件
  },
};
```

## 4. 使用

```markdown
---
title: md 使用 Element Plus 
---

# 欢迎！

使用 Element Plus 的示例组件：

<template>
  <el-button type="primary">主要按钮</el-button>
  <el-input placeholder="请输入内容" />
</template>
```

<Card />