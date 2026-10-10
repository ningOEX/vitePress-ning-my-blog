# webgl

webgl绘制的三种基本图形/基本图元：
- 点
- 线条
- 三角形


## 着色器源码
### 顶点着色器
```javascript
const vertexShaderSource = `#version 300 es
in vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;
```
- ***#version 300 es*** 必须是着色器源码的第一个 token
- ***300 es*** 对应 ***WebGL2*** 的 ***GLSL ES 3.00*** 版本
- ***in vec2 a_position;*** 声明一个输入变量
- ***gl_Position = vec4(a_position, 0.0, 1.0);*** 顶点着色器必须做的一件事。

### 片元着色器
````javascript
const fragmentShaderSource = `#version 300 es
precision highp float;

out vec4 outColor;

void main() {
  outColor = vec4(1.0, 0.5, 0.2, 1.0);
}
`;
````
- ***precision highp float;*** 声明 float 的默认精度为 highp（高精度）。

三个精度等级：highp（最高，24 位）、mediump（16 位）、lowp（10 位）。移动端上 mediump 会快一些，但精度不够。

- ***out vec4 outColor*** 声明一个输出变量。

## 数据流的三种通道 —— attribute / uniform / varying

### attribute（顶点属性）
特性：每个顶点不同。数据来自顶点缓冲区。
用途：位置、法线、UV、颜色、权重……
顶点着色器里声明：
```glsl
in vec2 a_position;
in vec3 a_color;
in vec2 a_uv;
```

### uniform（全局变量）
特性：一次 draw call 内所有顶点/fragment 共用同一个值。
用途：变换矩阵、时间、光照方向、纹理采样器、颜色系数……
着色器里声明：
```glsl
uniform mat4 u_matrix;
uniform float u_time;
uniform vec3 u_lightPos;
uniform sampler2D u_texture;
```

### varying（插值变量）
特性：顶点着色器每个顶点写一个值，GPU 会在三角形内部按位置线性插值，然后片元着色器读到插值后的值。
用途：颜色渐变、UV 传递、法线传递、世界坐标传递……
顶点着色器：
```glsl
in vec2 a_position;
in vec3 a_color;
out vec3 v_color;    // 输出到下一阶段

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_color = a_color;
}
```

片元着色器：
```glsl
in vec3 v_color;     // 名字必须与顶点着色器的 out 完全一致
out vec4 outColor;

void main() {
  outColor = vec4(v_color, 1.0);
}
```
