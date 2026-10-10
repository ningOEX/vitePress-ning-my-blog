# webGL 常量
常用的webgl常量列表：
# WebGL 常用常量速查

下面按使用频率分类列出 WebGL 里最常出现的常量。**粗体**是最常用、必须记住的。

---

## 🔷 上下文与绘制模式

| 常量 | 用途 |
|---|---|
| **`gl.TRIANGLES`** | 每 3 个顶点组成独立三角形（最常用） |
| **`gl.TRIANGLE_STRIP`** | 三角形带，相邻三角形共享边 |
| **`gl.TRIANGLE_FAN`** | 三角形扇，共享第一个顶点 |
| **`gl.POINTS`** | 每个顶点画一个点 |
| **`gl.LINES`** | 每 2 个顶点一条独立线段 |
| **`gl.LINE_STRIP`** | 折线 |
| **`gl.LINE_LOOP`** | 闭合折线 |

---

## 🔷 缓冲区相关

### 绑定目标

| 常量 | 用途 |
|---|---|
| **`gl.ARRAY_BUFFER`** | 顶点属性缓冲区 |
| **`gl.ELEMENT_ARRAY_BUFFER`** | 索引缓冲区 |
| `gl.UNIFORM_BUFFER` | UBO（WebGL2） |
| `gl.COPY_READ_BUFFER` | 缓冲区拷贝读源（WebGL2） |
| `gl.COPY_WRITE_BUFFER` | 缓冲区拷贝写目标（WebGL2） |

### 用途提示（usage）

| 常量 | 用途 |
|---|---|
| **`gl.STATIC_DRAW`** | 上传一次，用很多次（静态模型） |
| **`gl.DYNAMIC_DRAW`** | 偶尔更新，用很多次 |
| **`gl.STREAM_DRAW`** | 每帧重建，用很少次 |
| `gl.STATIC_READ` / `gl.DYNAMIC_READ` / `gl.STREAM_READ` | 从 GPU 读回的缓冲区 |
| `gl.STATIC_COPY` / `gl.DYNAMIC_COPY` / `gl.STREAM_COPY` | GPU 内部拷贝用 |

---

## 🔷 着色器与程序

### 着色器类型

| 常量 | 用途 |
|---|---|
| **`gl.VERTEX_SHADER`** | 顶点着色器 |
| **`gl.FRAGMENT_SHADER`** | 片元着色器 |

### 查询参数

| 常量 | 用途 |
|---|---|
| **`gl.COMPILE_STATUS`** | 查询着色器编译是否成功 |
| **`gl.LINK_STATUS`** | 查询程序链接是否成功 |
| `gl.DELETE_STATUS` | 是否已被标记删除 |
| `gl.VALIDATE_STATUS` | 程序是否通过校验 |
| `gl.ACTIVE_ATTRIBUTES` | 活动属性数量 |
| `gl.ACTIVE_UNIFORMS` | 活动 uniform 数量 |

---

## 🔷 数据类型

| 常量 | 用途 |
|---|---|
| **`gl.FLOAT`** | 32 位浮点（最常用） |
| **`gl.UNSIGNED_BYTE`** | 8 位无符号整数（颜色、纹理） |
| **`gl.UNSIGNED_SHORT`** | 16 位无符号整数（索引，< 65536 顶点） |
| **`gl.UNSIGNED_INT`** | 32 位无符号整数（索引，WebGL2 支持） |
| `gl.BYTE` / `gl.SHORT` / `gl.INT` | 有符号整数 |
| `gl.HALF_FLOAT` | 16 位浮点（WebGL2） |

---

## 🔷 绘制缓冲区位（clear 用）

| 常量 | 用途 |
|---|---|
| **`gl.COLOR_BUFFER_BIT`** | 颜色缓冲 |
| **`gl.DEPTH_BUFFER_BIT`** | 深度缓冲 |
| **`gl.STENCIL_BUFFER_BIT`** | 模板缓冲 |

通常组合使用：

```js
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
```

---

## 🔷 能力开关（enable / disable）

| 常量 | 用途 |
|---|---|
| **`gl.DEPTH_TEST`** | 深度测试（3D 必开） |
| **`gl.CULL_FACE`** | 背面剔除（省一半 fragment） |
| **`gl.BLEND`** | 混合（透明必开） |
| `gl.STENCIL_TEST` | 模板测试 |
| `gl.SCISSOR_TEST` | 裁剪测试 |
| `gl.POLYGON_OFFSET_FILL` | 多边形偏移（阴影贴图防 z-fighting） |
| `gl.SAMPLE_ALPHA_TO_COVERAGE` | MSAA 透明边缘处理 |
| `gl.RASTERIZER_DISCARD` | 光栅化丢弃（WebGL2 transform feedback） |

---

## 🔷 深度、混合、剔除

### 深度函数

| 常量 | 含义 |
|---|---|
| **`gl.LESS`** | 新值 < 旧值时通过（默认） |
| `gl.LEQUAL` | ≤ 通过 |
| `gl.GREATER` / `gl.GEQUAL` / `gl.EQUAL` / `gl.NOTEQUAL` / `gl.ALWAYS` / `gl.NEVER` | 其他比较 |

### 混合因子

| 常量 | 含义 |
|---|---|
| **`gl.SRC_ALPHA`** | 源 alpha |
| **`gl.ONE_MINUS_SRC_ALPHA`** | 1 − 源 alpha |
| **`gl.ONE`** | 1 |
| **`gl.ZERO`** | 0 |
| `gl.DST_COLOR` / `gl.ONE_MINUS_DST_COLOR` | 目标颜色 |
| `gl.SRC_COLOR` / `gl.ONE_MINUS_SRC_COLOR` | 源颜色 |
| `gl.DST_ALPHA` / `gl.ONE_MINUS_DST_ALPHA` | 目标 alpha |

常用组合：

```js
// 标准透明
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
// 加法混合（发光）
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
// 预乘 alpha
gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
```

### 剔除与绕序

| 常量 | 用途 |
|---|---|
| **`gl.BACK`** | 剔除背面（默认） |
| `gl.FRONT` | 剔除正面 |
| `gl.FRONT_AND_BACK` | 都剔除 |
| **`gl.CCW`** | 逆时针为正面（默认） |
| `gl.CW` | 顺时针为正面 |

---

## 🔷 纹理相关

### 绑定目标

| 常量 | 用途 |
|---|---|
| **`gl.TEXTURE_2D`** | 2D 纹理 |
| **`gl.TEXTURE_CUBE_MAP`** | 立方体贴图（天空盒、环境反射） |
| `gl.TEXTURE_3D` | 3D 纹理（WebGL2） |
| `gl.TEXTURE_2D_ARRAY` | 2D 纹理数组（WebGL2） |

### 纹理参数

| 常量 | 用途 |
|---|---|
| **`gl.TEXTURE_MIN_FILTER`** | 缩小时的过滤方式 |
| **`gl.TEXTURE_MAG_FILTER`** | 放大时的过滤方式 |
| **`gl.TEXTURE_WRAP_S`** | S 方向（U）环绕 |
| **`gl.TEXTURE_WRAP_T`** | T 方向（V）环绕 |
| `gl.TEXTURE_WRAP_R` | R 方向（3D 纹理） |
| `gl.TEXTURE_BASE_LEVEL` / `gl.TEXTURE_MAX_LEVEL` | mipmap 层级范围 |

### 过滤方式

| 常量 | 含义 |
|---|---|
| **`gl.NEAREST`** | 最近邻（像素风） |
| **`gl.LINEAR`** | 双线性插值（平滑） |
| **`gl.LINEAR_MIPMAP_LINEAR`** | 三线性插值（最平滑） |
| `gl.NEAREST_MIPMAP_NEAREST` / `gl.LINEAR_MIPMAP_NEAREST` / `gl.NEAREST_MIPMAP_LINEAR` | 其他 mipmap 组合 |

### 环绕方式

| 常量 | 含义 |
|---|---|
| **`gl.CLAMP_TO_EDGE`** | 钳制到边缘（NPOT 纹理必须） |
| **`gl.REPEAT`** | 重复（需 2 的幂） |
| `gl.MIRRORED_REPEAT` | 镜像重复（需 2 的幂） |

### 纹理单元

| 常量 | 用途 |
|---|---|
| **`gl.TEXTURE0`** | 纹理单元 0 |
| `gl.TEXTURE1` ~ `gl.TEXTURE31` | 纹理单元 1~31（WebGL2 至少 32 个，WebGL1 至少 8 个） |

```js
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, tex);
gl.uniform1i(samplerLoc, 0);
```

### 纹理格式（常用）

| 常量 | 用途 |
|---|---|
| **`gl.RGBA`** | RGBA 四通道（最常用） |
| **`gl.RGB`** | RGB 三通道 |
| `gl.ALPHA` / `gl.LUMINANCE` / `gl.LUMINANCE_ALPHA` | 灰度相关 |
| `gl.RGBA8` / `gl.RGB8` | 8 位格式（WebGL2 内部格式） |
| `gl.SRGB8_ALPHA8` | sRGB 编码（WebGL2，正确光照必用） |
| `gl.RGBA16F` / `gl.RGBA32F` | 浮点纹理（HDR、GPGPU） |

---

## 🔷 帧缓冲与渲染缓冲

### 绑定目标

| 常量 | 用途 |
|---|---|
| **`gl.FRAMEBUFFER`** | 帧缓冲 |
| **`gl.RENDERBUFFER`** | 渲染缓冲 |
| `gl.DRAW_FRAMEBUFFER` / `gl.READ_FRAMEBUFFER` | 分离的读写帧缓冲（WebGL2） |

### 挂载点

| 常量 | 用途 |
|---|---|
| **`gl.COLOR_ATTACHMENT0`** | 颜色附件 0 |
| `gl.COLOR_ATTACHMENT1` ~ `15` | 多目标渲染 MRT（WebGL2） |
| **`gl.DEPTH_ATTACHMENT`** | 深度附件 |
| **`gl.STENCIL_ATTACHMENT`** | 模板附件 |
| `gl.DEPTH_STENCIL_ATTACHMENT` | 深度模板合一 |

### 状态查询

| 常量 | 用途 |
|---|---|
| **`gl.FRAMEBUFFER_COMPLETE`** | 帧缓冲完整（必须检查） |
| `gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT` | 附件不完整 |
| `gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT` | 缺少附件 |
| `gl.FRAMEBUFFER_UNSUPPORTED` | 格式不支持 |

### 渲染缓冲格式

| 常量 | 用途 |
|---|---|
| **`gl.DEPTH_COMPONENT16`** | 16 位深度 |
| **`gl.DEPTH_COMPONENT24`** | 24 位深度（最常用） |
| `gl.DEPTH24_STENCIL8` | 24 位深度 + 8 位模板 |
| `gl.STENCIL_INDEX8` | 8 位模板 |

---

## 🔷 像素存储（texImage2D 前设置）

| 常量 | 用途 |
|---|---|
| **`gl.UNPACK_FLIP_Y_WEBGL`** | 上传时上下翻转（解决纹理倒置） |
| **`gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL`** | 上传时预乘 alpha |
| `gl.UNPACK_ALIGNMENT` | 每行字节对齐（默认 4） |
| `gl.PACK_ALIGNMENT` | readPixels 时对齐 |

```js
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
```

---

## 🔷 实例化渲染（WebGL2 或扩展）

| 常量 | 用途 |
|---|---|
| **`gl.UNSIGNED_BYTE`** / `gl.UNSIGNED_SHORT` / `gl.UNSIGNED_INT` | 索引类型 |
| `gl.ARRAY_BUFFER` + `vertexAttribDivisor` | 设置实例化属性 |
| `drawArraysInstanced` / `drawElementsInstanced` | 实例化绘制命令 |

---

## 🔷 错误码

| 常量 | 含义 |
|---|---|
| **`gl.NO_ERROR`** | 0，无错误 |
| **`gl.INVALID_ENUM`** | 枚举参数错误 |
| **`gl.INVALID_VALUE`** | 数值参数错误 |
| **`gl.INVALID_OPERATION`** | 当前状态不允许此操作 |
| `gl.OUT_OF_MEMORY` | 显存不足 |
| `gl.INVALID_FRAMEBUFFER_OPERATION` | 帧缓冲不完整 |
| `gl.CONTEXT_LOST_WEBGL` | 上下文丢失 |

---

## 🔷 WebGL2 专属常用

| 常量 | 用途 |
|---|---|
| `gl.READ_BUFFER` / `gl.DRAW_BUFFER` | 多目标读写选择 |
| `gl.TRANSFORM_FEEDBACK` | 变换反馈 |
| `gl.RASTERIZER_DISCARD` | 丢弃光栅化（只做 transform feedback） |
| `gl.PIXEL_PACK_BUFFER` / `gl.PIXEL_UNPACK_BUFFER` | 像素缓冲（异步读取） |
| `gl.COPY_READ_BUFFER` / `gl.COPY_WRITE_BUFFER` | 缓冲区拷贝 |
| `gl.UNIFORM_BUFFER` | Uniform 缓冲对象 |
| `gl.TEXTURE_3D` / `gl.TEXTURE_2D_ARRAY` | 3D/数组纹理 |
| `gl.R8` / `gl.RG8` / `gl.R16F` / `gl.RG16F` / `gl.RGBA16F` / `gl.RGBA32F` | 各种内部格式 |
| `gl.SRGB8_ALPHA8` | sRGB 纹理（正确光照） |

---

## 🎯 最高频的 20 个

如果只想先记住最核心的：

```js
// 绘制模式
gl.TRIANGLES

// 缓冲区
gl.ARRAY_BUFFER
gl.ELEMENT_ARRAY_BUFFER
gl.STATIC_DRAW
gl.DYNAMIC_DRAW

// 着色器
gl.VERTEX_SHADER
gl.FRAGMENT_SHADER
gl.COMPILE_STATUS
gl.LINK_STATUS

// 数据类型
gl.FLOAT
gl.UNSIGNED_SHORT
gl.UNSIGNED_BYTE

// 清屏
gl.COLOR_BUFFER_BIT
gl.DEPTH_BUFFER_BIT

// 能力开关
gl.DEPTH_TEST
gl.CULL_FACE
gl.BLEND

// 纹理
gl.TEXTURE_2D
gl.TEXTURE0
gl.RGBA
gl.CLAMP_TO_EDGE
gl.LINEAR

// 帧缓冲
gl.FRAMEBUFFER
gl.FRAMEBUFFER_COMPLETE
```

---

## 💡 记忆技巧

- **`BIT` 结尾** → 用于 `gl.clear` 的位掩码。
- **`BUFFER` 结尾** → 缓冲区相关。
- **`_STATUS` 结尾** → 用于 `getShaderParameter` / `getProgramParameter` 查询。
- **`ATTACHMENT` 结尾** → 帧缓冲挂载点。
- **`_FILTER` 结尾** → 纹理过滤。
- **`_WRAP_` 中间** → 纹理环绕。
- **`TEXTUREn`（n 是数字）** → 纹理单元编号。
