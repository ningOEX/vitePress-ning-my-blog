# 裁剪

```html
<svg width="400" height="400" viewBox="0 0 120 120">
    <defs>
        <clipPath id="clipPath" clipPathUnits="userSpaceOnUse">
            <circle cx=".5" cy=".5" r=".5" />
        </clipPath>
    </defs>

    <g clip-path="url(#clipPaht)">
        <image href="./images/1.jpg" height="100" width="100"/>
    </g>
</svg>

```
> clipPathUnits元素的内容使用哪个坐标系 
- userSpaceOnUse 绝对位置
- objectBoundingBox 相对位置（使用百分比 %）