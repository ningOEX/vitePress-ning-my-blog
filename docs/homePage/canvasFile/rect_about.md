## 矩形相关
## createElement
创建一个画布
```javascript
 const canvas = document.createElement('canvas')
```

## getContext
获取画笔（上下文）
```javascript
 const ctx = canvas.getContext('2d')
```

## rect
绘制矩形定义
```javascript
ctx.rect(x,y,width,height)
```
两种绘制方式：

## file 填充
- 填充方式
```javascript
ctx.file()
```

## stroke 描边
- 描边方式
```javascript
ctx.stroke()
```

##  beginPath 绘制区域独立时使用
绘制独立作业区时，为避免样式以及属性覆盖，落笔绘制时，应当调用一次该函数。
```javascript
ctx.beginPath()
```



