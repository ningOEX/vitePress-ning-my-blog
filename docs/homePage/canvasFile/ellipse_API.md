## 椭圆

绘制一个椭圆
```javascript
ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) // counterclockwise默认false顺时针  true为逆时针
```

案例
```javascript
const arr = new Array(3).fill(0)
arr.forEach((_, i) => {
    ctx.beginPath()
    const deg = i === 0 ? 1 : i * 2
    ctx.strokeStyle = "#caf"
    ctx.lineWidth = 4
    ctx.ellipse(300, 300, 100, 50, Math.PI / deg, 0, Math.PI * 2)
    ctx.stroke()
})
```