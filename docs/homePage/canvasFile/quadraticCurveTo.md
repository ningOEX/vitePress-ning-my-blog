## 贝塞尔曲线

一个起点，一个控制点加一个终点
```javascript
ctx.moveTo(x,y) // 起点
ctx.quadraticCurveTo(cpx, cpy, x, y) // 一个控制点，一个终点
ctx.stroke()
```