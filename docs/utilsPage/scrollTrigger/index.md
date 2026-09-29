# ScrollTrigger
ScrollTrigger 是 **GSAP (GreenSock Animation Platform)** 的一个官方核心插件，专门用于创建高性能的、基于页面滚动的动画效果。它允许你将动画的进度与滚动位置直接绑定，从而轻松实现元素淡入、视差滚动、区域固定等复杂交互。

##  核心作用

它的主要价值在于将 **滚动行为** 与 **动画控制** 无缝连接，具体体现在：

*   **视口触发**：将任何动画链接到特定元素，仅当该元素进入视口时才播放，优化性能并确保动画被看到。
*   **滚动驱动 (Scrub)**：将动画进度与滚动条位置绑定，滚动条就像动画的“进度条”，用户可以通过滚动来精确控制动画的播放进程。
*   **元素固定 (Pin)**：在指定的滚动区间内，将一个元素“钉”在视口中的某个位置，常用于制作“滚动叙事 (Scrollytelling)”效果。
*   **动作控制**：在进入或离开定义的触发区域时，对动画执行播放、暂停、反转、重置等操作。
*   **灵活定义**：支持垂直/水平滚动、自定义滚动容器，并拥有丰富的回调系统，可执行几乎任何你想做的事。

## 核心 API

要使用 ScrollTrigger，首先需要引入并注册插件：
```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

### 1. 核心配置选项 (Config Object)

| 配置项 | 作用 | 常用写法 / 注意 |
|---|---|---|
| `trigger` | 以哪个元素为触发基准 | `".box"`、`"#section1"` |
| `start` | 动画开始位置 | 默认 `"top bottom"`；常用 `"top top"`、`"top 80%"` |
| `end` | 动画结束位置 | 默认 `"bottom top"`；支持 `"+=500"` |
| `scrub` | 滚动驱动动画进度 | `true` 直接跟随；数字如 `1` 表示平滑追赶 |
| `pin` | 激活期间固定元素 | `true`；注意 `pin: true` 时 `start` 默认变为 `"top top"` |
| `markers` | 调试标记 | `true` 显示绿色 start、红色 end |
| `toggleActions` | 四个时机的动画动作 | 进入 / 离开 / 再次进入 / 再次离开；默认 `"play none none none"` |
| `toggleClass` | 激活时切换类名 | 进入加类，离开移除，适合配合 CSS 状态 |

核心逻辑可以记成四句话：

1. **`trigger + start + end`**：定义“从哪开始、到哪结束”。
2. **`scrub`**：决定动画是否由滚动条控制进度。
3. **`pin`**：决定元素是否在滚动期间被钉住。
4. **`toggleActions / toggleClass`**：决定进入、离开时执行什么动作或切换什么状态。
5. **`markers`**：只用于开发调试，上线前关闭。

写法对比：

```javascript
// 嵌入：ScrollTrigger 控制 GSAP 动画
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

// 独立：只做触发和回调
ScrollTrigger.create({
  trigger: ".box",
  start: "top 80%",
  onEnter: () => console.log("进入视口"),
  toggleClass: "active"
});
```

使用 `ScrollTrigger.create()` 可以创建一个独立的触发器，不直接关联动画，而是利用其丰富的回调函数执行自定义逻辑。

```javascript
ScrollTrigger.create({
  trigger: "#myElement",
  start: "top center",
  end: "bottom center",
  onEnter: () => console.log("进入触发区域！"),
  onLeave: () => console.log("离开触发区域！"),
  onUpdate: (self) => {
    // self.progress 是一个 0 到 1 的数值，表示滚动进度
    console.log("当前进度:", self.progress.toFixed(2));
  }
});
```
**常用回调**包括：
*   **`onEnter`**: 当滚动**正向**进入触发区域时调用。
*   **`onLeave`**: 当滚动**正向**离开触发区域时调用。
*   **`onEnterBack`**: 当滚动**反向**（向上）进入触发区域时调用。
*   **`onLeaveBack`**: 当滚动**反向**离开触发区域时调用。
*   **`onUpdate`**: 在滚动过程中**持续调用**，其参数 `self` 包含 `progress`（进度）、`direction`（方向）、`velocity`（速度）等信息。

## 配置选项

创建 ScrollTrigger 时传入的 `vars` 对象支持以下配置项：

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **`trigger`** | String \| Element | `undefined` | 触发元素。其位置决定动画的开始与结束。也可以省略，直接用数字定义滚动位置。 |
| **`start`** | String \| Number \| Function | `"top bottom"` | 动画开始位置。格式为 `"triggerPosition viewportPosition"`，如 `"top center"`。支持相对值 `"+=500"`、数字像素值、`"max"`，以及 `clamp()` 包裹（v3.12+）。 |
| **`end`** | String \| Number \| Function | `"bottom top"` | 动画结束位置。语法与 `start` 相同。 |
| **`endTrigger`** | String \| Element | `undefined` | 用另一个元素的位置来计算 `end`，而不是用 `trigger` 元素。适用于触发元素和结束位置不在同一元素上的场景。 |
| **`scrub`** | Boolean \| Number | `false` | `true` 时动画进度直接跟随滚动条。设为数字（秒）时，动画会以“追赶”方式平滑跟随，产生延迟效果。 |
| **`pin`** | Boolean \| Element \| String | `false` | 设为 `true` 时，`trigger` 元素在激活期间被固定在视口中。也可以传入元素或选择器来固定其他元素。 |
| **`pinSpacing`** | Boolean \| String | `true` | 固定时自动添加 padding 以补偿页面高度。`false` 禁用间距，`"margin"` 使用 margin 代替 padding。 |
| **`horizontal`** | Boolean | `false` | 设为 `true` 支持水平滚动触发。 |
| **`scroller`** | String \| Element | `window` | 指定自定义滚动容器（如 `"#scrollContainer"`）。 |
| **`markers`** | Boolean \| Object | `false` | 开发时设为 `true` 显示开始/结束标记。可传对象自定义颜色，如 `{startColor: "blue", endColor: "red"}`。 |
| **`toggleActions`** | String | `"play none none none"` | 在四个时机（进入、离开、再次进入、再次离开）对动画执行的操作。可选值：`play`、`pause`、`resume`、`restart`、`reverse`、`complete`、`reset`、`none`。 |
| **`toggleClass`** | String \| Object | `undefined` | 激活时为触发元素添加 CSS 类，离开时移除。传对象可指定 `{targets: ".el", className: "active"}`。 |
| **`once`** | Boolean | `false` | 设为 `true` 时，触发一次后自动 kill 该 ScrollTrigger。 |
| **`id`** | String | `undefined` | 唯一标识符，可通过 `ScrollTrigger.getById(id)` 获取实例。 |
| **`refreshPriority`** | Number | `0` | 数字越小，在刷新时越先被计算。用于解决多个 ScrollTrigger 之间的依赖顺序问题。 |
| **`snap`** | Object \| Number \| Array \| String \| Function | `undefined` | 对齐配置。可传 `{snapTo: "labels", duration: {min: 0.2, max: 3}, delay: 0.2, ease: "power1.inOut", directional: true}`。 |
| **`containerAnimation`** | Tween \| Timeline | `undefined` | 当触发元素由另一个容器的线性 Tween“滚动”进入视口时使用。注意：基于 `containerAnimation` 的 ScrollTrigger 不支持 `pin` 和 `snap`。 |
| **`fastScrollEnd`** | Boolean \| Number | `false` | 当离开触发区域时的滚动速度超过阈值（默认 2500px/s）时，强制动画完成。 |
| **`preventOverlaps`** | Boolean \| String | `false` | 强制当前 ScrollTrigger 影响自身动画时，将所有尾随的 ScrollTrigger 动画推到结束状态。可传字符串指定作用范围。 |
| **`anticipatePin`** | Number | `0` | 设为 `1` 可缓解快速滚动时固定元素的轻微延迟（闪烁）。 |
| **`invalidateOnRefresh`** | Boolean | `false` | 刷新时清除开始/结束值的缓存，强制重新计算。 |
| **`scroller`** | String \| Element | `window` | 指定自定义滚动容器。 |
| **`onRefreshInit`** | Function | `undefined` | 刷新测量前调用。 |
| **`onRefresh`** | Function | `undefined` | 刷新测量后调用。 |

---

## 实例属性

通过 `ScrollTrigger.create()` 返回的实例对象，或在回调中通过 `self` 参数访问，包含以下只读属性：

| 属性 | 类型 | 说明 |
|------|------|------|
| **`trigger`** | Element \| undefined | 触发元素本身（非选择器文本）。 |
| **`progress`** | Number | 0 到 1 之间的滚动进度值。 |
| **`direction`** | Number | 滚动方向：`1` 表示正向（向下/向右），`-1` 表示反向。 |
| **`isActive`** | Boolean | 当前是否处于激活状态（在 `start` 和 `end` 之间）。 |
| **`velocity`** | Number | 滚动速度（像素/秒）。 |
| **`start`** | Number | 计算出的开始滚动位置（像素）。 |
| **`end`** | Number | 计算出的结束滚动位置（像素）。 |
| **`animation`** | Animation \| undefined | 关联的 GSAP 动画（如果通过嵌入方式创建）。 |

---

##  实例方法

| 方法 | 说明 |
|------|------|
| **`.kill()`** | 销毁该 ScrollTrigger 实例，移除所有事件监听并回滚 pin 等效果。 |
| **`.refresh()`** | 强制重新计算该实例的 `start` 和 `end` 值。 |
| **`.enable()` / `.disable()`** | 启用或禁用该 ScrollTrigger（禁用时不再触发回调，但保留配置）。 |
| **`.getVelocity()`** | 返回当前滚动速度。 |
| **`.scroll()`** | 返回滚动位置。 |

---

## 静态方法

| 方法 | 说明 |
|------|------|
| **`ScrollTrigger.create(vars)`** | 创建一个独立的 ScrollTrigger 实例，不关联动画，主要用于回调系统。 |
| **`ScrollTrigger.refresh(safe)`** | 强制**所有** ScrollTrigger 重新计算位置。传 `true` 时执行“安全刷新”，若页面正在滚动则等待滚动结束后再刷新。 |
| **`ScrollTrigger.getAll()`** | 返回当前所有 ScrollTrigger 实例的数组。 |
| **`ScrollTrigger.killAll()`** | 立即对所有 ScrollTrigger 调用 `kill()`（不包括主 ScrollSmoother 的）。 |
| **`ScrollTrigger.getById(id)`** | 根据 `id` 获取对应的 ScrollTrigger 实例。 |
| **`ScrollTrigger.batch(triggers, vars)`** | 为一组目标元素创建协调的 ScrollTrigger 集合，将回调在短时间内批量处理，适合对同时进入视口的元素做交错动画。 |
| **`ScrollTrigger.observe(vars)`** | 等同于 `Observer.create()`，提供统一的跨设备事件感知（wheel、touch、pointer），支持 `onUp`、`onDown`、`onLeft`、`onRight`、`onChange`、`onHover`、`onDrag` 等回调。 |
| **`ScrollTrigger.defaults(vars)`** | 设置所有新建 ScrollTrigger 的默认配置值。 |
| **`ScrollTrigger.normalizeScroll(true)`** | 标准化滚动行为，在底层使用 Observer 处理跨设备滚动差异。 |
| **`ScrollTrigger.isTouch`** | 返回 `0`（无触摸）、`1`（触摸但无指针）或 `2`（触摸且支持指针）。 |
| **`ScrollTrigger.version`** | 返回当前 ScrollTrigger 版本号。 |

---

## 回调函数

所有回调接收一个参数 `self`，即 ScrollTrigger 实例本身。

| 回调 | 触发时机 |
|------|----------|
| **`onEnter`** | 正向进入触发区域时。 |
| **`onLeave`** | 正向离开触发区域时。 |
| **`onEnterBack`** | 反向（向上）进入触发区域时。 |
| **`onLeaveBack`** | 反向离开触发区域时。 |
| **`onToggle`** | 激活状态切换时（进入或离开，正反方向均触发）。参数为 `self`，可通过 `self.isActive` 判断当前状态。 |
| **`onUpdate`** | 滚动过程中持续调用。可访问 `self.progress`、`self.direction`、`self.getVelocity()`。 |
| **`onScrubComplete`** | 当 `scrub` 动画完成追赶滚动条时调用。 |
| **`onSnapComplete`** | 当 `snap` 对齐动画完成时调用。 |
| **`onRefreshInit`** | 刷新测量前调用（通常在 resize 时）。 |
| **`onRefresh`** | 刷新测量后调用。 |

---

## 高级功能与扩展

### 1. `ScrollTrigger.batch()` 批量触发

```javascript
ScrollTrigger.batch(".box", {
  start: "top 85%",
  once: true,
  onEnter: (batch) => gsap.to(batch, {
    opacity: 1, y: 0, stagger: 0.15, overwrite: true
  }),
  onLeave: (batch) => gsap.set(batch, { opacity: 0, y: 20 }),
  onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15 }),
  onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 20 })
});
```
适合对同时进入视口的元素做交错动画，是 IntersectionObserver 的替代方案。

### 2. `ScrollTrigger.observe()` 统一事件感知

```javascript
ScrollTrigger.observe({
  type: "wheel,touch",
  onUp: () => { /* 上滑/滚轮向上 */ },
  onDown: () => { /* 下滑/滚轮向下 */ },
  onLeft: () => { /* 左滑 */ },
  onRight: () => { /* 右滑 */ },
  onChange: (self) => { /* 任意变化 */ }
});
```
统一处理跨设备的滚轮、触摸和指针事件，无需分别处理实现细节。

### 3. `ScrollTrigger.defaults()` 全局默认值

```javascript
ScrollTrigger.defaults({
  toggleActions: "play none none none",
  markers: false,
  start: "top 80%"
});
```
为所有新建 ScrollTrigger 设置默认配置，避免重复书写。

### 4. `gsap.matchMedia()` 响应式配置

ScrollTrigger 的响应式推荐使用 `gsap.matchMedia()`（`ScrollTrigger.matchMedia()` 已在 v3.11 中废弃）：

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 900px)", () => {
  gsap.to(".box", {
    x: 500,
    scrollTrigger: { trigger: ".box", start: "top center", scrub: true }
  });
});

mm.add("(max-width: 767px)", () => {
  gsap.to(".box", {
    y: 100,
    scrollTrigger: { trigger: ".box", start: "top 90%", toggleActions: "play none none reverse" }
  });
});
```
不同断点使用完全不同的 ScrollTrigger 配置，切换时会自动清理旧触发器。

### 5. `ScrollTrigger.normalizeScroll()`

在移动设备上标准化滚动行为，解决 iOS 等平台的滚动抖动和地址栏伸缩问题：

```javascript
ScrollTrigger.normalizeScroll(true);
```
底层使用 Observer 插件，自动处理跨设备滚动差异。

---

## CDN地址
[ScrollTrigger.js](https://terwanerik.github.io/ScrollTrigger/)

[gitHub开源](https://github.com/terwanerik/ScrollTrigger)
