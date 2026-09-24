## 保存状态 save
将状态放入栈中,
```javascript
ctx.save()
```
## 恢复重置 restore
将状态恢复至上一次保存的状态
```javascript
ctx.save()
ctx.fillStyle = "#f00"
ctx.fillRect(0,0,100,100)
ctx.restore()

ctx.fillStyle = "#00f"
ctx.arc(100,100,50,0,Math.PI *2)
ctx.fill()

```