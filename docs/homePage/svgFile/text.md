# text 相关

在 SVG 中，`<text>` 元素用于渲染文本，它拥有非常丰富的属性体系。为了让你更清晰地掌握，我将属性分为 **定位布局**、**样式外观**、**文本排版** 和 **SVG 特有高级属性** 四大类。

---

## 一、定位与布局属性

| 属性 | 说明 | 示例值 |
|------|------|--------|
| **x** | 文本基线的起始 X 坐标 | `x="50"` |
| **y** | 文本基线的起始 Y 坐标 | `y="30"` |
| **dx** | 相对于当前位置的 X 偏移量（可逐个字符设置） | `dx="10,20,5"` |
| **dy** | 相对于当前位置的 Y 偏移量（可逐个字符设置） | `dy="2,5,0"` |
| **textLength** | 强制文本渲染后的总长度（会拉伸或压缩） | `textLength="200"` |
| **lengthAdjust** | 配合 `textLength`，指定调整方式 | `spacing`（调整间距） / `spacingAndGlyphs`（调整字宽） |

```svg
<text x="20" y="40" dx="5,10,15" dy="2,0,0">SVG</text>
```

---

## 二、样式与外观属性（CSS + 呈现属性）

这些属性既可以用 CSS 写，也可以作为 XML 属性直接写在标签上。

| 属性 | 说明 | 示例值 |
|------|------|--------|
| **fill** | 文本颜色 | `fill="red"` / `fill="#ff0000"` |
| **fill-opacity** | 填充透明度（0~1） | `fill-opacity="0.8"` |
| **stroke** | 文本描边颜色 | `stroke="black"` |
| **stroke-width** | 描边宽度 | `stroke-width="2"` |
| **font-family** | 字体 | `font-family="Arial, sans-serif"` |
| **font-size** | 字号 | `font-size="24"` / `font-size="1.5em"` |
| **font-weight** | 字重 | `bold` / `normal` / `100~900` |
| **font-style** | 字体样式 | `italic` / `normal` / `oblique` |
| **text-decoration** | 文本装饰 | `underline` / `line-through` / `overline` |
| **letter-spacing** | 字符间距 | `letter-spacing="2"` |
| **word-spacing** | 单词间距 | `word-spacing="5"` |
| **opacity** | 整体透明度 | `opacity="0.6"` |
| **transform** | 变换（旋转/缩放/平移） | `transform="rotate(15, 50, 50)"` |

---

## 三、文本排版与对齐属性

| 属性 | 说明 | 示例值 |
|------|------|--------|
| **text-anchor** | 文本水平对齐（相对于 `x` 定位点） | `start`（左） / `middle`（中） / `end`（右） |
| **dominant-baseline** | 垂直对齐基线（相对于 `y` 定位点） | `auto` / `middle` / `hanging` / `alphabetic` / `central` |
| **text-rendering** | 渲染质量优化 | `auto` / `optimizeSpeed` / `optimizeLegibility` / `geometricPrecision` |
| **direction** | 文本方向 | `ltr` / `rtl` |
| **unicode-bidi** | 双向文本控制 | `normal` / `embed` / `bidi-override` |

```svg
<text x="100" y="50" text-anchor="middle" dominant-baseline="central">居中文本</text>
```

---

## 四、SVG 特有高级排版属性

### 1. `<tspan>` 相关（行内片段控制）

通过 `<tspan>` 子元素可精细控制片段样式：

```svg
<text>
  普通文字 <tspan fill="red" font-weight="bold">红色加粗</tspan> 继续普通
</text>
```

`<tspan>` 支持以下特有属性：
- `x` / `y` / `dx` / `dy`（可单独偏移）
- `rotate`（逐字符旋转角度）
- `baseline-shift`（基线偏移，用于上/下标）

### 2. 文本路径 `<textPath>`

让文本沿着 `<path>` 路径排列：

```html
<defs>
  <path id="myPath" d="M20,50 Q100,10 180,50" />
</defs>
<text>
  <textPath href="#myPath" startOffset="20%">
    沿着曲线行走的文字
  </textPath>
</text>
```

`startOffset` 控制文字从路径的什么位置开始。

### 3. 特殊呈现属性

| 属性 | 说明 | 示例值 |
|------|------|--------|
| **rotate** | 对每个字符单独设置旋转角度（列表） | `rotate="0,10,20,0"` |
| **glyph-orientation-vertical** | 竖排文字时字符方向（已不推荐） | `auto` / `0` / `90` |
| **writing-mode** | 书写模式（竖排支持） | `horizontal-tb` / `vertical-rl` |

---

## 五、完整示例（综合运用）

```html
<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  
  <!-- 基础样式 -->
  <text x="50" y="50" 
        font-family="Arial" font-size="28" font-weight="bold"
        fill="#2c3e50" stroke="#3498db" stroke-width="1"
        text-anchor="start" dominant-baseline="alphabetic">
    基础 SVG 文本
  </text>

  <!-- 居中 + 描边 + 下划线 -->
  <text x="200" y="110" 
        font-size="30" fill="white" stroke="#e74c3c" stroke-width="2"
        text-anchor="middle" dominant-baseline="central"
        text-decoration="underline">
    居中对齐
  </text>

  <!-- tspan 片段控制 + 旋转 -->
  <text x="50" y="170" font-size="24" fill="#333">
    这是 
    <tspan fill="#e67e22" font-weight="bold" font-style="italic">橙色斜体</tspan>
    的文字
  </text>

  <!-- 文本路径 -->
  <defs>
    <path id="wave" d="M20,210 Q100,180 180,210 Q260,240 340,210" fill="none" stroke="#ddd"/>
  </defs>
  <text font-size="18" fill="#8e44ad">
    <textPath href="#wave" startOffset="10%">
      沿着波浪路径行走的文字
    </textPath>
  </text>
</svg>
```

---

## 六、快速对照表（常用场景）

| 需求场景 | 推荐属性组合 |
|---------|-------------|
| 普通标题文字 | `x y font-size fill font-weight` |
| 居中标题 | `x="50%" text-anchor="middle" dominant-baseline="central"` |
| 带描边的空心字 | `fill="none" stroke="color" stroke-width="n"` |
| 多色/多样式片段 | 使用 `<tspan>` 子元素 |
| 沿曲线排列 | `<textPath>` + `<path>` |
| 自适应容器宽度 | `textLength + lengthAdjust="spacing"` |
| 单个字符分别偏移 | `dx` / `dy` / `rotate` 使用列表值 |

---
