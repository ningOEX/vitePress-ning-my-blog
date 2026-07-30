
# SVG 弧线篇

## 基本语法

弧线命令使用 `A` 或 `a`（相对坐标），后面跟 7 个参数：

> A rx ry x-axis-rotation large-arc-flag sweep-flag x y

## 7 个参数详解

### 1. **rx, ry**（椭圆半径）
- 弧线所在椭圆的 X 轴和 Y 轴半径
- 必须为正值

### 2. **x-axis-rotation**（X轴旋转角度）
- 椭圆相对于坐标系的旋转角度（度）
- 让椭圆倾斜

### 3. **large-arc-flag**（大弧标志）
- `0` = 取较短的那条弧
- `1` = 取较长的那条弧

### 4. **sweep-flag**（扫掠标志）
- `0` = 逆时针方向绘制
- `1` = 顺时针方向绘制

### 5. **x, y**（终点坐标）
- 弧线的结束点位置

## 直观理解

想象你在两点之间画弧：
- **起点**：当前画笔位置（M 命令设置）
- **终点**：参数中的 x, y

从起点到终点，**理论上可以画出4条不同的弧线**：
1. 短弧 + 顺时针
2. 短弧 + 逆时针
3. 长弧 + 顺时针
4. 长弧 + 逆时针

这就是为什么需要 `large-arc-flag` 和 `sweep-flag` 来精确指定。

## 代码示例

```svg
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  
  <!-- 1. 简单的半圆弧 -->
  <path d="M 50,150 A 100,100 0 0,1 250,150" 
        stroke="red" stroke-width="3" fill="none"/>
  
  <!-- 2. 短弧 vs 长弧对比 -->
  <!-- 短弧（large-arc=0） -->
  <path d="M 50,50 A 80,80 0 0,1 200,50" 
        stroke="blue" stroke-width="3" fill="none"/>
  
  <!-- 长弧（large-arc=1） -->
  <path d="M 50,50 A 80,80 0 1,1 200,50" 
        stroke="green" stroke-width="3" fill="none" 
        stroke-dasharray="5,5"/>
  
  <!-- 3. 顺时针 vs 逆时针 -->
  <!-- 顺时针（sweep=1） -->
  <path d="M 50,200 A 60,60 0 0,1 170,200" 
        stroke="purple" stroke-width="3" fill="none"/>
  
  <!-- 逆时针（sweep=0） -->
  <path d="M 50,200 A 60,60 0 0,0 170,200" 
        stroke="orange" stroke-width="3" fill="none" 
        stroke-dasharray="5,5"/>
  
  <!-- 4. 椭圆弧（不同 rx, ry） -->
  <path d="M 250,50 A 100,50 0 0,1 400,50" 
        stroke="pink" stroke-width="3" fill="none"/>
  
  <!-- 5. 旋转的椭圆弧 -->
  <path d="M 250,150 A 80,40 45 0,1 400,150" 
        stroke="brown" stroke-width="3" fill="none"/>

</svg>
```

## 实际应用场景

### 绘制饼图/环形图
```svg
<!-- 一个45度的扇形 -->
<path d="M 200,200 L 200,100 A 100,100 0 0,1 270.7,129.3 Z" 
      fill="#ff6b6b"/>
```

### 绘制波浪曲线
```svg
<!-- 连续的波浪 -->
<path d="M 0,150 
         A 30,30 0 0,1 60,150 
         A 30,30 0 0,1 120,150 
         A 30,30 0 0,1 180,150" 
      stroke="blue" stroke-width="3" fill="none"/>
```

## 常见陷阱与技巧

1. **半径不够大**：如果 rx, ry 太小，无法连接两点，浏览器会自动放大半径

2. **起点终点重合**：如果两点重合，弧线会变成完整的椭圆

3. **相对坐标**：使用 `a` 命令时，x, y 是相对于起点的偏移量

4. **配合 M 命令**：弧线必须从某个起点开始，所以前面通常有 `M` 命令

## 记忆口诀

> **A 半径 旋转 长短 顺逆 终点**

- 先想椭圆大小（rx ry）
- 再想倾斜角度（旋转）
- 最后决定走哪条路（长短 + 顺逆）
