---
title: Three.js 常用API
description: 一切开发中常用的API
updated: 2024-2-27
---
# Three.js 实际开发中常用的API

<UpdatedTime :updated="$frontmatter.updated" />

在 Three.js 的实际开发中，有一些 API 是频繁使用的。以下是一些常用的 API 和它们的典型应用场景，帮助你更高效地开发 Three.js 项目。

---

## **1. 核心类**
### **1.1 `THREE.Scene`**
- **作用**: 场景是所有 3D 对象的容器。
- **常用方法**:
    - `scene.add(object)`: 将对象添加到场景中。
    - `scene.remove(object)`: 从场景中移除对象。
    - `scene.traverse(callback)`: 遍历场景中的所有对象。

### **1.2 `THREE.PerspectiveCamera`**
- **作用**: 透视相机，模拟人眼的视角。
- **常用属性**:
    - `camera.position.set(x, y, z)`: 设置相机位置。
    - `camera.lookAt(x, y, z)`: 设置相机看向的目标点。
- **常用方法**:
    - `camera.updateProjectionMatrix()`: 更新相机的投影矩阵（通常在窗口大小变化时调用）。

### **1.3 `THREE.WebGLRenderer`**
- **作用**: 渲染器，用于将场景渲染到屏幕上。
- **常用方法**:
    - `renderer.setSize(width, height)`: 设置渲染器的大小。
    - `renderer.render(scene, camera)`: 渲染场景。
    - `renderer.setClearColor(color, alpha)`: 设置背景颜色。

---

## **2. 几何体**
### **2.1 `THREE.BoxGeometry`**
- **作用**: 创建立方体几何体。
- **常用参数**:
    - `width`, `height`, `depth`: 立方体的尺寸。

### **2.2 `THREE.SphereGeometry`**
- **作用**: 创建球体几何体。
- **常用参数**:
    - `radius`: 球体半径。
    - `widthSegments`, `heightSegments`: 球体的分段数。

### **2.3 `THREE.PlaneGeometry`**
- **作用**: 创建平面几何体。
- **常用参数**:
    - `width`, `height`: 平面的宽度和高度。

---

## **3. 材质**
### **3.1 `THREE.MeshBasicMaterial`**
- **作用**: 基础材质，不受光照影响。
- **常用属性**:
    - `color`: 材质颜色。
    - `wireframe`: 是否显示为线框。

### **3.2 `THREE.MeshLambertMaterial`**
- **作用**: 漫反射材质，对光照有反应。
- **常用属性**:
    - `color`: 材质颜色。
    - `map`: 贴图。

### **3.3 `THREE.MeshPhongMaterial`**
- **作用**: 高光材质，支持高光反射。
- **常用属性**:
    - `color`: 材质颜色。
    - `specular`: 高光颜色。
    - `shininess`: 光泽度。

### **3.4 `THREE.MeshStandardMaterial`**
- **作用**: 基于物理渲染的标准材质。
- **常用属性**:
    - `color`: 材质颜色。
    - `metalness`: 金属度。
    - `roughness`: 粗糙度。

---

## **4. 光源**
### **4.1 `THREE.AmbientLight`**
- **作用**: 环境光，均匀照亮所有物体。
- **常用参数**:
    - `color`: 光的颜色。
    - `intensity`: 光的强度。

### **4.2 `THREE.DirectionalLight`**
- **作用**: 平行光，模拟太阳光。
- **常用属性**:
    - `position.set(x, y, z)`: 设置光源位置。
    - `target`: 设置光源的目标点。

### **4.3 `THREE.PointLight`**
- **作用**: 点光源，模拟灯泡。
- **常用属性**:
    - `position.set(x, y, z)`: 设置光源位置。
    - `distance`: 光的衰减距离。

---

## **5. 加载器**
### **5.1 `THREE.TextureLoader`**
- **作用**: 加载纹理贴图。
- **常用方法**:
    - `textureLoader.load(url, onLoad, onProgress, onError)`: 加载贴图。

### **5.2 `THREE.GLTFLoader`**
- **作用**: 加载 GLTF 格式的 3D 模型。
- **常用方法**:
    - `gltfLoader.load(url, onLoad, onProgress, onError)`: 加载模型。

---

## **6. 动画与交互**
### **6.1 `requestAnimationFrame`**
- **作用**: 创建动画循环。
- **示例**:
  ```javascript
  function animate() {
      requestAnimationFrame(animate);
      // 更新场景
      renderer.render(scene, camera);
  }
  animate();
  ```

### **6.2 `THREE.Raycaster`**
- **作用**: 用于检测鼠标与 3D 对象的交互。
- **常用方法**:
    - `raycaster.setFromCamera(mouse, camera)`: 从相机和鼠标位置创建射线。
    - `raycaster.intersectObjects(objects)`: 检测射线与对象的交点。

---

## **7. 实用工具**
### **7.1 `THREE.OrbitControls`**
- **作用**: 提供鼠标控制的相机轨道控制器。
- **常用方法**:
    - `controls.update()`: 在动画循环中更新控制器。

### **7.2 `THREE.AxesHelper`**
- **作用**: 显示坐标轴辅助线。
- **示例**:
  ```javascript
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
  ```

---

## **8. 示例代码**
以下是一个简单的 Three.js 示例，展示如何使用上述 API：

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

// 立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
```

---

## **9. 总结**
以上是 Three.js 实际开发中常用的 API 和典型应用场景。掌握这些 API 可以帮助你快速构建 3D 场景、添加交互和动画效果。如果你有更多问题或需要进一步的帮助，请随时在评论区留言！