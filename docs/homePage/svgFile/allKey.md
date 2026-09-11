# path 关键字大全


在 SVG 中，`<path>` 元素的所有**命令关键字**（即路径数据 `d` 属性中的绘制指令）分为**绝对坐标**和**相对坐标**两类。以下是完整列表：


## 速记表

| 类别 | 绝对 | 相对 |
|------|------|------|
| 移动 | M | m |
| 闭合 | Z / z | — |
| 直线 | L | l |
| 水平线 | H | h |
| 垂直线 | V | v |
| 三次贝塞尔 | C | c |
| 平滑三次 | S | s |
| 二次贝塞尔 | Q | q |
| 平滑二次 | T | t |
| 椭圆弧 | A | a |

## 一、移动/结束命令

| 关键字 | 绝对/相对 | 说明 | 参数 |
|--------|-----------|------|------|
| **M** | 绝对 | moveto（移动到） | x, y |
| **m** | 相对 | moveto（移动到） | dx, dy |
| **Z / z** | 两者通用 | closepath（闭合路径） | 无参数 |

---

## 二、直线命令

| 关键字 | 绝对/相对 | 说明 | 参数 |
|--------|-----------|------|------|
| **L** | 绝对 | lineto（画直线到） | x, y |
| **l** | 相对 | lineto（画直线到） | dx, dy |
| **H** | 绝对 | horizontal lineto（水平直线） | x |
| **h** | 相对 | horizontal lineto（水平直线） | dx |
| **V** | 绝对 | vertical lineto（垂直直线） | y |
| **v** | 相对 | vertical lineto（垂直直线） | dy |

```html
<path d="M25 20 H20 V25 
                M35 20 H40 V25 
                M20 35 V40 H25 
                M35 40 H40 V35 
                M20 30 H40" 
            fill="none"
            stroke="#121314" 
            stroke-width="1" 
            stroke-linecap="round" 
            stroke-linejoin="round"  
        />
```
---

## 三、曲线命令

### 1. 三次贝塞尔曲线（Cubic Bézier）

| 关键字 | 绝对/相对 | 说明 | 参数 |
|--------|-----------|------|------|
| **C** | 绝对 | cubic Bézier curveto | x1,y1 x2,y2 x,y（两个控制点 + 终点） |
| **c** | 相对 | cubic Bézier curveto | dx1,dy1 dx2,dy2 dx,dy |
| **S** | 绝对 | smooth cubic Bézier curveto（省略第一个控制点，自动镜像） | x2,y2 x,y（一个控制点 + 终点） |
| **s** | 相对 | smooth cubic Bézier curveto | dx2,dy2 dx,dy |

```html
<path d="M40 80 C60 60, 80 100, 100 80" stroke="#121314" stroke-width="1" fill="none" />
```
---

### 2. 二次贝塞尔曲线（Quadratic Bézier）

| 关键字 | 绝对/相对 | 说明 | 参数 |
|--------|-----------|------|------|
| **Q** | 绝对 | quadratic Bézier curveto | x1,y1 x,y（一个控制点 + 终点） |
| **q** | 相对 | quadratic Bézier curveto | dx1,dy1 dx,dy |
| **T** | 绝对 | smooth quadratic Bézier curveto（自动镜像控制点） | x,y（只需终点） |
| **t** | 相对 | smooth quadratic Bézier curveto | dx,dy（只需终点） |


```html
 <path d="M60 40 Q80 20, 100 40" stroke="#121314" stroke-width="1" fill="none" />
```
---

## 四、弧线命令

| 关键字 | 绝对/相对 | 说明 | 参数 |
|--------|-----------|------|------|
| **A** | 绝对 | elliptical arc（椭圆弧） | rx,ry x-axis-rotation large-arc-flag sweep-flag x,y |
| **a** | 相对 | elliptical arc（椭圆弧） | rx,ry x-axis-rotation large-arc-flag sweep-flag dx,dy |

**弧线参数详解：**
- `rx, ry` — 椭圆半径
- `x-axis-rotation` — x轴旋转角度（度）
- `large-arc-flag` — 0（小弧）或 1（大弧）
- `sweep-flag` — 0（逆时针）或 1（顺时针）
- `x, y` / `dx, dy` — 终点坐标

---

## 五、简写/连续命令规则

| 规则 | 说明 |
|------|------|
| 命令后的多个坐标对可**连续书写**，用空格或逗号分隔 | 如 `M 10 10 L 20 20 30 30` 等同于 `M 10 10 L 20 20 L 30 30` |
| 同一命令重复时，可**省略后续命令字母** | 如 `M 10 10 20 20` 等同于 `M 10 10 L 20 20`（但注意 M 后续默认转为 L） |

---

## 六、完整示例

```svg
<path d="M 10 10 
         C 20 20, 40 20, 50 10 
         S 80 0, 90 10 
         Q 100 30, 110 10 
         T 130 10 
         A 20 20 0 1 1 150 10 
         Z" />
```

---

