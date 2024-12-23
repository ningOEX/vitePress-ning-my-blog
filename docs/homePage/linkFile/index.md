---

title: 周边
description: 周边的一些三方库
updated: 2024-12-04

---

# 周边

<UpdatedTime :updated="$frontmatter.updated" />



记录一些三方库, 用于日常开发用到的辅助库, 可在需求用到时方便查看.


<button class="brutalist-button">
  <div class="button-text">
    <span>行走的艺术 </span>
    <span>OEX NIng</span>
  </div>
</button>

- [!!!各大技术栈一览清单 📚 ✨✨✨ - zh-cn  🥇](https://quickref.cn/index.html)

## vue UI 库

- [vuetify.js - 工制作的精美材料组件 触手可及](https://vuetifyjs.com/en/) 


## 数据可视化图

- [AntV · 让数据栩栩如生 - g2 ](https://antv.antgroup.com/)

- [Echarts - 图表可视化 👑](https://echarts.apache.org/zh/index.html) ↓同源

- [PPChart - 图标可视化 2 👑](https://ppchart.com/#/)

## 轮播图

- [swiper.js - 轮播图 👑](https://swiperjs.com/demos#navigation)


## 动画库

- [AOS - 卷轴库动画 👑](https://michalsnik.github.io/aos/) 

- [ScrollReveal - 滚动视觉](https://michalsnik.github.io/aos/) 

- [locomotive-scroll - 滚动视觉](https://github.com/locomotivemtl/locomotive-scroll) 

- [Animate.css - 文字动画效果](https://animate.style/) 

- [anime.js - 视觉偏移](https://animejs.com/documentation/#propertyKeyframes) 

- [locomotive-scroll - 滚动视觉](https://github.com/locomotivemtl/locomotive-scroll) 


## css 库

- [tailwindcss - CSS 框架  🥇](https://www.tailwindcss.cn/)

- [Primer - Primer 是 GitHub 所使用的 CSS 框架](https://primer.style/css/storybook/?path=/docs/introduction--docs)

- [unocss - css框架](https://unocss.nodejs.cn/guide/)


## 未分类

- [mock.js - 生成随机数据，拦截 Ajax 请求](http://mockjs.com/) 

- [axios.js - 网络请求](http://www.axios-js.com/) 

- [driver.js - 醒目焦点](https://driverjs.com/docs/installation) 

- [verse UI - 开源界面css 👑](https://uiverse.io/)

- [clipboard.js - copy 剪贴板 3kb](https://clipboardjs.com/)

- [nprogress - 进度条 👑](https://github.com/rstacruz/nprogress)

- [moment.js - 在JavaScript中解析、验证、操作和显示日期和时间](https://momentjs.com/)

- [ASCII艺术字（图）集 ！](https://www.bootschool.net/ascii-art)

- [css clip-path maker - 裁剪](https://bennettfeely.com/clippy/)

- [lightbox2 - 图片预览 👑](https://lokeshdhakar.com/projects/lightbox2/)

<Card />

<style>
/* From Uiverse.io by lucifer4330k */ 
.brutalist-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 169px;
  height: 60px;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-weight: bold;
  border: 3px solid #fff;
  outline: 3px solid #000;
  box-shadow: 6px 6px 0 #00a4ef;
  transition: all 0.1s ease-out;
  padding: 0 15px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.brutalist-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
  z-index: 1;
  transition: none;
  /* Initially hide the pseudo-element */
  opacity: 0;
}

@keyframes slide {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.brutalist-button:hover::before {
  /* Show the pseudo-element on hover */
  opacity: 1;
  animation: slide 2s infinite;
}

.brutalist-button:hover {
  transform: translate(-4px, -4px);
  box-shadow: 10px 10px 0 #000;
  background-color: #000;
  color: #fff;
}

@keyframes slide {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.brutalist-button:active {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0 #00a4ef;
  background-color: #fff;
  color: #000;
  border-color: #000;
}

.button-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  transition: transform 0.2s ease-out;
  position: relative;
  z-index: 1;
}

.brutalist-button:hover .button-text {
  transform: skew(-5deg);
}

.brutalist-button:active .button-text {
  transform: skew(5deg);
}

.button-text span:first-child {
  font-size: 11px;
  text-transform: uppercase;
}

.button-text span:last-child {
  font-size: 16px;
  text-transform: uppercase;
}

</style>