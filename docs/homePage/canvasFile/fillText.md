## 文字渲染

绘制一个文字
```javascript
ctx.fillText('文字',x,y)
```

设置字体样式
```javascript
ctx.font = "bold italic 100px serif" // 多个属性时，需要写全生效， size写在前时，字体需要跟在后边
ctx.textAlign = "center" // 以文字中心点横向x居中
ctx.textBaseline = "middle" // 以文字中心点竖向y居中
```
