---
title: GSAP 使用手册
description: GSAP（GreenSock Animation Platform）安装、使用流程与核心特性
updated: 2026-09-29
---

# GSAP 使用手册

<UpdatedTime :updated="$frontmatter.updated" />

## 简介

GSAP（GreenSock Animation Platform）是业界最强大的 JavaScript 动画库之一，适用于 Web 端的高性能动画编排。无论是简单的元素过渡，还是复杂的时间轴、滚动联动、SVG 路径动画，GSAP 都能以稳定的 60fps 流畅运行。

> 本项目已内置 `gsap@^3.15.0`，无需额外安装。

---

## 一、安装

### 1. 安装依赖

```bash
npm install gsap
```

### 2. 引入使用

```js
import gsap from "gsap";
```

若需使用滚动触发等高级插件，可额外注册：

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

---

## 二、基础使用流程

### 1. 最简单的动画

将元素从当前状态动画到目标状态：

```js
// 语法：gsap.to(target, vars)
gsap.to(".box", {
  x: 200,          // 水平位移 200px
  duration: 1,     // 持续 1 秒
  ease: "power2.out" // 缓动函数
});
```

### 2. 三种核心方法

| 方法 | 说明 |
| --- | --- |
| `gsap.to()` | 从**当前**状态动画到**目标**状态（最常用） |
| `gsap.from()` | 从**指定起始**状态动画到**当前**状态 |
| `gsap.fromTo()` | 从**指定起始**状态动画到**指定目标**状态（最可控，推荐） |

```js
// from：入场动画常用，元素先隐藏再浮现
gsap.from(".card", { opacity: 0, y: 30, duration: 0.6 });

// fromTo：明确起止，避免状态残留
gsap.fromTo(".card",
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
);
```

### 3. 批量错落动画（stagger）

让多个元素依次延迟触发，形成波浪感：

```js
gsap.fromTo(".card",
  { opacity: 0, y: 30 },
  {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,   // 每个元素延迟 0.1s
    ease: "power3.out"
  }
);
```

`stagger` 还支持更丰富的配置：

```js
stagger: { amount: 1, from: "center" } // 从中间向两边扩散
```

### 4. 时间轴编排（timeline）

将多段动画串联成有节奏的序列，实现电影级入场：

```js
const tl = gsap.timeline();

tl.fromTo(".title", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.6)" })
  .fromTo(".subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.3")  // 提前 0.3s 开始
  .fromTo(".card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.2");
```

### 5. 缓动函数（ease）

GSAP 提供数十种缓动，常用：

```js
ease: "power1.out"      // 轻减速
ease: "power3.out"      // 明显减速（入场推荐）
ease: "power4.inOut"    // 强加速减速
ease: "back.out(1.6)"   // 带回弹（弹性冲击感）
ease: "elastic.out(1, 0.5)" // 弹性
ease: "bounce.out"      // 弹跳
ease: "expo.out"        // 极快启动后缓慢停止
```

> 选择建议：入场动画用 `power3.out` 或 `back.out()` 营造冲击感；交互反馈用 `power2.out` 更轻盈。

### 6. 事件回调与控制

```js
const tween = gsap.to(".box", {
  x: 100,
  duration: 1,
  onStart: () => console.log("动画开始"),
  onComplete: () => console.log("动画结束")
});

tween.pause();   // 暂停
tween.play();    // 播放
tween.reverse(); // 倒放
tween.kill();    // 销毁
```

---

## 三、在 Vue 3 中的最佳实践

### 1. 组件挂载后触发动画

```vue
<script setup>
import { onMounted, nextTick } from "vue";
import gsap from "gsap";

onMounted(() => {
  // 等待 DOM 渲染完成
  nextTick(() => {
    gsap.fromTo(".item",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }
    );
  });
});
</script>
```

### 2. 卸载时清理动画，避免内存泄漏

```vue
<script setup>
import { onBeforeUnmount } from "vue";
import gsap from "gsap";

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(".card", { opacity: 0 }, { opacity: 1 });
  });
});

onBeforeUnmount(() => {
  ctx?.revert(); // 一键清理该作用域所有动画
});
</script>
```

### 3. 兜底防白屏

动画若用 `from` 把元素初始设为 `opacity: 0`，一旦动画未执行元素将永久透明。推荐用 `fromTo` 并做容错：

```js
document.querySelectorAll(".card").forEach((el) => {
  el.style.opacity = "1"; // 先确保可见
});

try {
  gsap.fromTo(".card",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.5, clearProps: "transform" }
  );
} catch (e) {
  // 动画失败，元素仍可见
}
```

> 注意 `clearProps`：若元素的颜色等是通过 `:style` 绑定的，用 `clearProps: "transform"` 只清 transform，避免清掉绑定样式。

---

## 四、GSAP 的优点与特性

### 1. 极致性能

- 基于 `requestAnimationFrame`，自动处理时间计算
- 智能避免布局抖动（layout thrashing）
- 大量元素同时动画仍能保持 60fps
- 比 CSS 动画更可控，支持运行时暂停/倒放/变速

### 2. 功能完备

| 能力 | 说明 |
| --- | --- |
| 任意属性动画 | CSS、SVG 属性、对象数值皆可 |
| Timeline | 时间轴编排，复杂动画轻松管理 |
| Stagger | 批量错落，一行代码实现波浪效果 |
| ScrollTrigger | 滚动触发动画、视差、吸顶 |
| MorphSVG | SVG 路径形变动画 |
| Draggable | 拖拽交互 |
| TextPlugin | 文字逐字动画 |
| 缓动系统 | 数十种缓动 + 自定义 |

### 3. 跨浏览器兼容

自动处理浏览器前缀差异，无需手动写 `-webkit-`、`-moz-`。

### 4. 精确控制

- 可随时 `pause` / `play` / `reverse` / `seek`
- 支持 `timescale` 全局调速
- 支持百分比进度控制

### 5. 生态丰富

GSAP 提供大量官方插件，按需注册即可扩展能力：

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);
```

---

## 五、与 CSS 动画对比

| 维度 | CSS Transition/Animation | GSAP |
| --- | --- | --- |
| 性能 | 简单动画足够 | 大量/复杂动画更优 |
| 控制能力 | 弱（难以暂停/倒放） | 强（完全可编程） |
| 序列编排 | 需手动延迟 | Timeline 原生支持 |
| 滚动联动 | 需手写 JS | ScrollTrigger 开箱即用 |
| 学习成本 | 低 | 中等 |
| 适用场景 | 简单 hover/过渡 | 入场动画、复杂交互、特效 |

---

## 六、常见问题

**Q：动画结束后元素 hover 失效？**
A：GSAP 会写入内联 `transform`，可能覆盖 CSS。加 `clearProps: "transform"` 即可。

**Q：SSR（VitePress 构建）时报 document 未定义？**
A：动画逻辑放在 `onMounted` 内，或判断 `typeof window !== "undefined"`。

**Q：多个动画冲突？**
A：用 `gsap.killTweensOf(el)` 清理目标元素上已有的动画，再创建新的。

---

## 参考资料

- [GSAP 官方文档](https://gsap.com/docs/v3/)
- [GSAP Ease 可视化](https://gsap.com/docs/v3/Eases/)
- [GSAP 与 Vue 集成](https://gsap.com/community/forums/forum/33-gsap-vue-angular-react-ember-etc/)
