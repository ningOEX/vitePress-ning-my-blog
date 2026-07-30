在 SVG 中，`stroke` 相关属性用于控制图形**描边（轮廓线）**的样式。以下是完整的 `stroke` 属性大全：

---

## 一、基础描边属性

| 属性 | 说明 | 取值示例 |
|------|------|----------|
| **`stroke`** | 描边颜色 | `red`、`#ff0000`、`rgb(255,0,0)`、`none` |
| **`stroke-width`** | 描边宽度 | 数值（如 `2`、`0.5`、`10px`） |
| **`stroke-opacity`** | 描边透明度 | `0` ~ `1`（如 `0.5` 表示半透明） |

---

## 二、描边端点样式（线帽）

| 属性 | 说明 | 取值 |
|------|------|------|
| **`stroke-linecap`** | 线条端点样式 | `butt`（默认，平头）、`round`（圆头）、`square`（方头，带半宽延伸） |

**图示效果：**
- `butt`：—— 平直切断
- `round`：—— 圆形端点
- `square`：—— 方形延伸（比 butt 多出半宽）

---

## 三、描边拐角样式（线连接）

| 属性 | 说明 | 取值 |
|------|------|------|
| **`stroke-linejoin`** | 线条拐角连接方式 | `miter`（默认，尖角）、`round`（圆角）、`bevel`（平切角） |
| **`stroke-miterlimit`** | 尖角限制比例（仅对 `miter` 生效） | 数值（默认 `4`），超过限制时自动转为 `bevel` |

**图示效果：**
- `miter`：▽ 尖角
- `round`：◠ 圆弧拐角
- `bevel`：▽ 切掉尖角

---

## 四、虚线样式

| 属性 | 说明 | 取值示例 |
|------|------|----------|
| **`stroke-dasharray`** | 虚线模式（实线长度/间隔长度 交替） | `5,5`、`10,5,2,5`、`2 4` |
| **`stroke-dashoffset`** | 虚线起始偏移量 | 数值（如 `0`、`10`、`-5`），正数向左偏移 |

**`stroke-dasharray` 详解：**
```svg
stroke-dasharray="10,5"     <!-- 实线10，间隔5，循环 -->
stroke-dasharray="10,5,2"   <!-- 实线10，间隔5，实线2，间隔5 → 循环为10,5,2,5 -->
stroke-dasharray="10"       <!-- 实线10，间隔10（默认间隔=实线长度） -->
```

---

## 五、CSS 简写属性

| 属性 | 说明 | 示例 |
|------|------|------|
| **`stroke`** （CSS 简写） | 可一次性设置多个描边属性 | `stroke: red 2px round;`（部分浏览器支持有限，建议分开写） |

> ⚠️ 注意：SVG 的 `stroke` 在 CSS 中作为简写属性支持不完善，**推荐单独使用各属性**。

---

## 六、其他相关属性

| 属性 | 说明 | 取值 |
|------|------|------|
| **`stroke-dashcorner`** | （不常用）控制虚线拐角处理 | — |
| **`stroke-color`** | CSS 替代写法（不常用） | — |

---

## 七、完整示例

```svg
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- 基础描边 -->
  <line x1="10" y1="10" x2="190" y2="10" 
        stroke="red" stroke-width="4" />
  
  <!-- 带透明度 -->
  <line x1="10" y1="30" x2="190" y2="30" 
        stroke="#0066ff" stroke-width="6" stroke-opacity="0.5" />
  
  <!-- 圆头端点 -->
  <line x1="10" y1="50" x2="190" y2="50" 
        stroke="green" stroke-width="8" stroke-linecap="round" />
  
  <!-- 虚线 -->
  <line x1="10" y1="80" x2="190" y2="80" 
        stroke="purple" stroke-width="4" 
        stroke-dasharray="10,5,2,5" stroke-dashoffset="3" />
  
  <!-- 拐角样式对比 -->
  <polyline points="20,130 60,100 100,130" 
            stroke="orange" stroke-width="8" stroke-linejoin="round" fill="none" />
  <polyline points="120,130 160,100 200,130" 
            stroke="orange" stroke-width="8" stroke-linejoin="bevel" fill="none" />
  
  <!-- 组合使用 -->
  <rect x="20" y="160" width="160" height="30" rx="5"
        stroke="#d32f2f" stroke-width="3" 
        stroke-linecap="round" stroke-linejoin="round"
        stroke-dasharray="8,4" fill="none" />
</svg>
```

---

## 八、属性速查表

| 类别 | 属性 | 默认值 | 常见取值 |
|------|------|--------|----------|
| 颜色 | `stroke` | `none` | 颜色值 |
| 宽度 | `stroke-width` | `1` | 数值 |
| 透明度 | `stroke-opacity` | `1` | 0~1 |
| 端点 | `stroke-linecap` | `butt` | `butt` / `round` / `square` |
| 拐角 | `stroke-linejoin` | `miter` | `miter` / `round` / `bevel` |
| 尖角限制 | `stroke-miterlimit` | `4` | 数值 ≥ 1 |
| 虚线模式 | `stroke-dasharray` | `none` | 数值序列 |
| 虚线偏移 | `stroke-dashoffset` | `0` | 数值 |

---

## 九、注意事项

1. **`fill="none"`**：如果图形有填充，描边会覆盖填充边界，建议显式设置 `fill="none"` 查看纯描边效果。
2. **`stroke-linecap: square`** 会额外延伸半个 `stroke-width`，可能影响布局尺寸。
3. **`stroke-miterlimit`**：当角度太尖时，`miter` 长度超过限制会降级为 `bevel`，防止尖角过长。
4. 所有 `stroke` 属性都支持 **CSS 样式** 和 **内联属性** 两种写法。
