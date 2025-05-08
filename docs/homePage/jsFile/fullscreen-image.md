---
title: 动画帧方法
description: 如何使用js的动画帧加载一个全屏的图片
updated: 2025-2-27
---

# 如何使用js的动画帧加载一个全屏的图片
<UpdatedTime :updated="$frontmatter.updated" />

使用 JavaScript 的 `requestAnimationFrame` 加载并显示一张全屏图片，可以通过以下步骤实现。我们将结合 HTML、CSS 和 JavaScript 来创建一个平滑的全屏图片加载动画。

---

## **1. 实现思路**
1. **HTML**: 创建一个容器用于显示图片。
2. **CSS**: 设置容器和图片的样式，确保图片全屏显示。
3. **JavaScript**:
    - 使用 `requestAnimationFrame` 实现动画效果。
    - 动态加载图片并显示。

---

## **2. 代码实现**

### **HTML**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>全屏图片加载动画</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="loader"></div>
    <img id="fullscreen-image" src="" alt="Fullscreen Image">
    <script src="main.js"></script>
</body>
</html>
```

---

### **CSS**
在 `styles.css` 中设置样式，确保图片全屏显示，并添加加载动画效果。

```css
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    background-color: #000;
}

#loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #fff;
}

#fullscreen-image {
    display: none; /* 初始隐藏图片 */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 确保图片覆盖整个屏幕 */
}
```

---

### **JavaScript**
在 `main.js` 中实现图片加载和动画效果。

```javascript
// 获取元素
const loader = document.getElementById('loader');
const fullscreenImage = document.getElementById('fullscreen-image');

// 图片路径
const imageUrl = 'https://picsum.photos/seed/picsum/1920/1080'; // 替换为你的图片URL

// 加载图片
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

// 动画函数
function animate() {
    let opacity = 0;
    const duration = 2000; // 动画持续时间（毫秒）
    const startTime = performance.now();

    function step(timestamp) {
        const elapsed = timestamp - startTime;
        opacity = Math.min(elapsed / duration, 1); // 计算透明度

        // 更新加载器的透明度
        loader.style.opacity = 1 - opacity;

        if (opacity < 1) {
            requestAnimationFrame(step); // 继续动画
        } else {
            // 动画完成后隐藏加载器并显示图片
            loader.style.display = 'none';
            fullscreenImage.style.display = 'block';
        }
    }

    requestAnimationFrame(step);
}

// 初始化
async function init() {
    try {
        const img = await loadImage(imageUrl); // 加载图片
        fullscreenImage.src = img.src; // 设置图片源
        animate(); // 启动动画
    } catch (error) {
        console.error('图片加载失败:', error);
        loader.textContent = '图片加载失败，请刷新页面重试。';
    }
}

// 启动
init();
```

---

## **3. 代码说明**
1. **HTML**:
    - `#loader`: 用于显示加载动画的容器。
    - `#fullscreen-image`: 用于显示全屏图片的 `<img>` 元素。

2. **CSS**:
    - 设置 `#loader` 和 `#fullscreen-image` 的样式，确保它们全屏显示。
    - 使用 `object-fit: cover` 确保图片覆盖整个屏幕。

3. **JavaScript**:
    - 使用 `loadImage` 函数异步加载图片。
    - 使用 `requestAnimationFrame` 实现加载动画（淡出效果）。
    - 动画完成后隐藏加载器并显示图片。

---

## **4. 运行效果**
1. 打开页面时，显示加载动画。
2. 图片加载完成后，加载动画逐渐淡出，图片逐渐显示。
3. 图片全屏显示，覆盖整个浏览器窗口。

---

## **5. 进一步优化**
- **加载进度**: 可以添加加载进度条，显示图片加载的进度。
- **多图片预加载**: 如果需要加载多张图片，可以使用 `Promise.all` 实现并行加载。
- **错误处理**: 添加更完善的错误处理逻辑，例如网络错误或图片加载失败时的提示。

---

## **6. 总结**
通过 `requestAnimationFrame` 和 JavaScript 的异步加载能力，我们可以实现一个平滑的全屏图片加载动画。这种方法适用于需要高用户体验的场景，如全屏背景图、图片画廊等。

如果你有任何问题或需要进一步的帮助，请随时在评论区留言！