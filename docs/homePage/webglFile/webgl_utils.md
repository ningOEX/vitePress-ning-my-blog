# webgl工具

## webgl-utils.js
webgl-utils.js 的核心是提供最基础的样板代码封装，主要包含四个公开方法。它侧重于着色器编译链接和画布尺寸管理，旨在避免在每个示例中重复编写相同的代码。

```javascript
<script src="https://webglfundamentals.org/webgl/resources/webgl-utils.js"></script>
```

| 方法 | 签名 | 作用 | 参数说明 | 返回值 |
|---|---|---|---|---|
| **createProgramFromSources** | `createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback)` | 从 **GLSL 源码字符串数组**编译并链接程序 | `shaderSources`：`[顶点源码, 片元源码]`；`opt_attribs`：自定义属性名数组；`opt_locations`：属性位置数组；`opt_errorCallback`：错误回调 | `WebGLProgram`，失败返回 `null` |
| **createProgramFromScripts** | `createProgramFromScripts(gl, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback)` | 从 DOM 中 **`<script>` 标签的 ID** 读取源码并编译链接 | `shaderScriptIds`：`[顶点 scriptId, 片元 scriptId]` | `WebGLProgram`，失败返回 `null` |
| **createProgram** | `createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback)` | 将**已编译好的 `WebGLShader` 对象**链接成程序 | `shaders`：`WebGLShader` 对象数组 | `WebGLProgram`，失败返回 `null` |
| **resizeCanvasToDisplaySize** | `resizeCanvasToDisplaySize(canvas, multiplier)` | 让画布**绘制缓冲区尺寸**匹配 **CSS 显示尺寸** | `multiplier`：通常是 `window.devicePixelRatio`，解决高分屏模糊 | `true`（尺寸变化）/ `false`（无变化） |

### 使用要点

| 项目 | 说明 |
|---|---|
| **挂载位置** | 通过 `<script>` 引入后挂载在全局 `webglUtils` 对象上 |
| **调用方式** | `webglUtils.createProgramFromSources(gl, [...])` |
| **错误处理** | 编译/链接失败时通过 `opt_errorCallback` 返回带**行号标注**的详细日志 |
| **典型场景** | 写简单 demo 时用来省掉着色器编译样板代码；生产项目建议用 `twgl.js` 或自封装 |
| **局限** | 只管着色器编译链接和画布尺寸；顶点缓冲、矩阵运算等由其他库（`m3.js` / `m4.js` / `twgl.js`）负责 |

## m3.js
`m3.js` 是 WebGL Fundamentals 的 2D 矩阵库，内部用 `Float32Array(9)` 表示 3×3 矩阵。

```javascript
<script src="https://webglfundamentals.org/webgl/resources/m3.js"></script>
```

### 构建矩阵（生成新的 3×3）

| 方法 | 作用 |
|---|---|
| `m3.identity(dst)` | 单位矩阵 |
| `m3.projection(w, h, dst)` | 像素坐标 → 裁剪空间（**翻转 Y**，原点左上） |
| `m3.translation(tx, ty, dst)` | 平移矩阵 |
| `m3.rotation(rad, dst)` | 旋转矩阵（弧度） |
| `m3.scaling(sx, sy, dst)` | 缩放矩阵 |

### 组合变换（在已有矩阵上叠乘）

| 方法 | 作用 |
|---|---|
| `m3.multiply(a, b, dst)` | 矩阵相乘 |
| `m3.translate(m, tx, ty, dst)` | 在 m 上叠加平移 |
| `m3.rotate(m, rad, dst)` | 在 m 上叠加旋转 |
| `m3.scale(m, sx, sy, dst)` | 在 m 上叠加缩放 |
| `m3.project(m, w, h, dst)` | 在 m 上叠加投影 |

### 向量与数学工具

| 方法 | 作用 |
|---|---|
| `m3.dot(x1, y1, x2, y2)` | 点积 |
| `m3.distance(x1, y1, x2, y2)` | 两点距离 |
| `m3.normalize(x, y)` | 归一化为单位向量 |
| `m3.reflect(ix, iy, nx, ny)` | 反射向量 |
| `m3.radToDeg(r)` | 弧度 → 角度 |
| `m3.degToRad(d)` | 角度 → 弧度 |
| `m3.transformPoint(m, v)` | 用矩阵变换点（含透视除法） |
| `m3.inverse(m, dst)` | 逆矩阵 |
| `m3.setDefaultType(Ctor)` | 设置矩阵类型（默认 `Float32Array`） |

### 要点
- **`dst` 可选**：传入则复用目标数组（动画循环中推荐），省略则新建 `Float32Array(9)`。
- **`projection` 会翻转 Y**，让 (0,0) 位于左上角，和 Canvas 2D 一致。
- **构建类**（`identity` / `projection` / `translation`…）生成新矩阵；**组合类**（`translate` / `rotate`…）在已有矩阵上叠加。


## webgl-lessons-ui.js
用于在 WebGL 教程中快速生成交互式 UI 控件的辅助库。它对外暴露了 5 个方法，核心是 setupUI 和 updateUI。
```javascript
<script src="https://webglfundamentals.org/webgl/resources/webgl-lessons-ui.js"></script>
```
`webgl-lessons-ui.js` 是一个用于在 WebGL 教程中快速生成交互式 UI 控件的辅助库。它对外暴露了 5 个方法，核心是 `setupUI` 和 `updateUI`。

### 📋 方法速查

| 方法 | 签名 | 作用 | 返回值 |
| :--- | :--- | :--- | :--- |
| **`setupUI`** | `setupUI(parent, object, uiInfos)` | **核心方法**。根据配置数组，批量创建滑块、复选框等控件，并自动与一个对象的数据绑定。 | `widgets` 对象，用于后续更新 |
| **`updateUI`** | `updateUI(widgets, data)` | 根据传入的数据对象，更新一组已创建控件的显示值。 | 无 |
| **`setupSlider`** | `setupSlider(selector, options)` | 在指定的 CSS 选择器元素内创建一个滑块。 | 滑块控件对象，含 `updateValue` |
| **`makeSlider`** | `makeSlider(options)` | 创建一个脱离文档流的滑块控件（不自动插入页面）。 | 滑块控件对象，含 `updateValue` |
| **`makeCheckbox`** | `makeCheckbox(options)` | 创建一个复选框控件。 | 复选框控件对象，含 `updateValue` |

---

### 🔧 `setupUI` 详解 (最常用)

这是你几乎唯一需要直接调用的方法。它把创建控件的繁琐工作全部封装了。

**参数说明：**

*   **`parent`**: 一个 DOM 元素，所有生成的控件都会被添加为它的子元素。
*   **`object`**: 一个普通 JavaScript 对象。控件的值会自动读写这个对象的属性。
*   **`uiInfos`**: 一个数组，每个元素描述一个控件。每个描述对象的常用字段如下：

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| **`type`** | `string` | 控件类型，可选 `'slider'`、`'checkbox'`、`'option'`。 |
| **`key`** | `string` | 绑定到 `object` 上的属性名。 |
| **`name`** | `string` (可选) | 控件显示的标签文字。默认使用 `key`。 |
| `min` / `max` | `number` | 滑块的最小值/最大值。 |
| `step` | `number` | 滑块的步长。 |
| `value` | `any` | 控件的初始值。 |
| `precision` | `number` | 滑块显示数值的小数位数。 |
| `change` | `function` | 控件值改变时触发的回调函数。 |
| `options` | `array` | `type: 'option'` 时，下拉菜单的选项列表。 |

**用法示例：**

```javascript
// 1. 定义数据对象
const settings = {
  translation: [0, 0],
  rotation: 0,
  scale: 1,
  color: [1, 0, 0, 1],
};

// 2. 定义控件配置
const uiInfos = [
  { type: 'slider', key: 'rotation', name: '旋转', min: -Math.PI, max: Math.PI, step: 0.01 },
  { type: 'slider', key: 'scale', name: '缩放', min: 0.1, max: 5, step: 0.01 },
];

// 3. 创建 UI，并绑定到 settings 对象
const widgets = webglLessonsUI.setupUI(document.querySelector('#ui'), settings, uiInfos);

// 现在，拖动滑块会自动更新 settings.rotation 和 settings.scale 的值
```

### 🔄 `updateUI` 用法

当你需要在代码中**主动改变** `settings` 的值，并希望界面同步更新时使用：

```javascript
// 手动修改数据
settings.rotation = Math.PI / 2;

// 同步更新 UI 控件的显示
webglLessonsUI.updateUI(widgets, settings);
```