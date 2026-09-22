## 图像变换

- 移动的并不是图像，而是坐标系本身。
- 对于之前已经绘制的图像没有影响。

```javascript
ctx.translate(100, 100)
```

![img.png](images/translate.png)

## 图像放缩
- 图像放缩是对坐标进行放缩，而不是图像本身。
```javascript
ctx.scale(2, 1);
```


![img.png](images/图像放缩.png)


## 图像旋转
- 由于旋转也是在坐标轴上进行旋转的，要想在视觉上原地旋转，需要通过变位后旋转，在调整图像的位移的位置。

```javascript
(() => {
 const canvas = document.createElement('canvas')
 canvas.width = 400
 canvas.height = 400
 const ctx = canvas.getContext('2d')
 document.body.append(canvas)
 ctx.beginPath()
 ctx.setLineDash([10,5])
 ctx.strokeStyle = "#666"
 ctx.rect(100, 100, 50, 50)
 ctx.stroke()

 ctx.translate(125, 125)
 ctx.rotate(Math.PI / 4)

 // 绘制坐标系
 ctx.beginPath()
 ctx.moveTo(-400, 0)
 ctx.lineTo(400, 0)
 ctx.stroke()

 ctx.moveTo(0, -400)
 ctx.lineTo(0, 400)
 ctx.stroke()

 for (let i = -400; i < 400; i += 10) {
     ctx.beginPath()
     ctx.moveTo(i, -5)
     ctx.lineTo(i, 5)
     ctx.stroke()

     ctx.beginPath()
     ctx.moveTo(-5, i)
     ctx.lineTo(5, i)
     ctx.stroke()
 }

 ctx.beginPath()
 ctx.rect(-25, -25, 50, 50)
 ctx.fill()

})();
```

![img.png](images/图像旋转.png)