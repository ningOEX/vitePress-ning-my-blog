---
title: three网格漫反射材质
description: 案例
updated: 2024-2-26
---

# 网格漫反射材质
<UpdatedTime :updated="$frontmatter.updated" />
在 Three.js 中，**网格漫反射材质（MeshLambertMaterial）** 是一种基于 Lambertian 反射模型的材质，适用于漫反射表面（如粗糙的表面）。它对光照有反应，但不产生高光效果。`MeshLambertMaterial` 是 Three.js 中较为简单的材质之一，适合用于性能要求较高的场景。

以下是如何创建和使用 `MeshLambertMaterial` 的完整示例。

---

## **1. 创建网格漫反射材质**
使用 `THREE.MeshLambertMaterial` 创建漫反射材质。你可以设置颜色、透明度、贴图等属性。

```javascript
const lambertMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ff00,       // 颜色
    transparent: true,     // 是否透明
    opacity: 0.8,          // 透明度
    map: new THREE.TextureLoader().load('path/to/texture.png') // 贴图
});
```

---

## **2. 创建网格对象**
将 `MeshLambertMaterial` 应用到几何体上，创建网格对象。

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1); // 创建立方体几何体
const mesh = new THREE.Mesh(geometry, lambertMaterial); // 创建网格对象
scene.add(mesh); // 将网格添加到场景中
```

---

## **3. 添加光源**
`MeshLambertMaterial` 对光照有反应，因此需要为场景添加光源。

```javascript
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 点光源
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
```

---

## **4. 完整示例代码**
以下是一个完整的示例，展示如何创建带有 `MeshLambertMaterial` 的立方体，并添加光源。

### **HTML 文件**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Three.js 网格漫反射材质示例</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r146/three.min.js"></script>
    <script src="main.js"></script>
</body>
</html>
```

### **JavaScript 文件（main.js）**
```javascript
// 场景
const scene = new THREE.Scene();

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建立方体几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 创建漫反射材质
const lambertMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ff00,       // 颜色
    transparent: true,     // 是否透明
    opacity: 0.8           // 透明度
});

// 创建网格对象
const cube = new THREE.Mesh(geometry, lambertMaterial);
scene.add(cube);

// 添加光源
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1); // 点光源
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

// 窗口大小调整
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
```

---

## **5. 示例说明**
1. **几何体**：使用 `THREE.BoxGeometry` 创建立方体几何体。
2. **漫反射材质**：使用 `THREE.MeshLambertMaterial` 创建材质，并设置颜色和透明度。
3. **光源**：添加环境光和点光源，使材质对光照有反应。
4. **动画**：在动画循环中旋转立方体。

---

## **6. 进阶用法**
### **6.1 使用贴图**
你可以为 `MeshLambertMaterial` 添加贴图：
```javascript
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('path/to/texture.png');
const lambertMaterial = new THREE.MeshLambertMaterial({ map: texture });
```

### **6.2 动态修改材质属性**
你可以动态修改材质的属性，例如颜色、透明度等：
```javascript
lambertMaterial.color.set(0xff0000); // 修改颜色为红色
lambertMaterial.opacity = 0.5;       // 修改透明度
```

### **6.3 使用其他几何体**
除了立方体，你还可以使用其他几何体，例如球体、圆柱体等：
```javascript
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, lambertMaterial);
scene.add(sphere);
```

---

## **7. 总结**
`MeshLambertMaterial` 是一种简单且高效的材质，适合用于漫反射表面。它对光照有反应，但不产生高光效果。通过设置颜色、透明度、贴图等属性，你可以创建各种不同的视觉效果。

如果你有任何问题或需要进一步的帮助，请随时在评论区留言！