## 二次贝塞尔曲线

一个起点，两个控制点加一个终点
```javascript
ctx.moveTo(x,y) // 起点
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) // 两个控制点，一个终点
ctx.stroke()
```