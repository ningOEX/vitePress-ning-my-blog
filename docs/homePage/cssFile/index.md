---
title: CSS
description: CSS残篇手册
updated: 2026-9-4
---

# css root

<UpdatedTime :updated="$frontmatter.updated" />

> 关于一些实用css
## 精灵图
> 纵向精灵图，使用css切换帧
```css
    .rensen {
        margin:100px;
        width: 1.19rem;
        height: 1.24rem;
        transition: left 0.3s;
        transform: scale(0.75);
      }
      .rensen span {
        display: block;
        width: 1.19rem;
        height: 1.24rem;
        background: url(./renshen.png);
        background-size: 100% auto;
        animation: key_rensen 1s steps(12) infinite;
      }

      /* 关键帧动画：移动背景位置 */
      @keyframes key_rensen {
        0% {
          background-position: 0 0;
        }

        100% {
          background-position: 0 -14.88rem;
          /* 或 -1200% 等，根据实际高度 */
        }
      }
/**/
```
> 动画核心 steps(12) 将动画分成 12 个等份，每份跳跃一次

```css
/* ❌ 平滑动画（会模糊/拉伸，不是逐帧） */
animation: key_rensen 1s ease infinite;

/* ✅ 逐帧动画（清晰切换，像翻书） */
animation: key_rensen 1s steps(12) infinite;
```

> 关键帧：从 0 到 -14.88rem

```css
@keyframes key_rensen {
    0% {
        background-position: 0 0;           /* 第1帧：显示顶部 */
    }
    100% {
        background-position: 0 -14.88rem;   /* 第12帧：显示底部 */
    }
}
```
