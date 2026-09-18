
## 线条/折线相关

## moveTo
指定的点开始新位置
```javascript
ctx.moveTo(x,y)
```
## lineTo
指定的点开始位置与起始位置相连
```javascript
ctx.lineTo(x,y)
```

lineTo位置可作为起点，继续绘制下一个ctx.lineTo会形成一个折线
```javascript
ctx.lineTo(x,y)
ctx.lineTo(x,y)
```

## 折线闭合 closePath
若最后一个折线点折返到起点进行闭合时使用ctx.closePath()：
```javascript
ctx.lineTo(x,y)
ctx.lineTo(x,y)
ctx.closePath()
```

---

## 线条的端点形状 lineCap
线条的端点形状 butt, round, square, 默认butt
```javascript
ctx.lineCap(butt)
```
## 线条相连的点的点形状 lineJoin
线条相连的点的点形状 round, bevel,  miter, 默认miter
```javascript
ctx.lineJoin('miter')
```

## 虚线绘制 setListDash
```javascript
ctx.setListDash(array)
```

## 虚线偏移量设置 lineDashOffset
```javascript
ctx.lineDashOffset = number
```