<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import gsap from "gsap";

interface Work {
  title: string;
  desc: string;
  img: string;
  link: string;
  color: string;
}

const works: Work[] = [
  { title: "TMDB Movie", desc: "在线影视数据库", img: new URL("./img/movie.png", import.meta.url).href, link: "https://tmdb-movie-tau.vercel.app/", color: "#f43f5e" },
  { title: "YUAN TU", desc: "帧 · 摄影画廊", img: new URL("./img/photo.png", import.meta.url).href, link: "https://frame-tailwind-vite-element.vercel.app/", color: "#06b6d4" },
  { title: "随心画布", desc: "SVG 在线画板", img: new URL("./img/svg-canvas.png", import.meta.url).href, link: "https://svg-canvas-demo.vercel.app/", color: "#a855f7" },
];

onMounted(() => {
  nextTick(() => {
    try {
      gsap.fromTo(".wk-card",
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.4)", clearProps: "transform" }
      );
      gsap.fromTo(".wk-title",
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } catch { /* ignore */ }
  });
});

const onEnter = (el: HTMLElement, color: string) => {
  gsap.to(el, { scale: 1.04, duration: 0.35, ease: "power2.out" });
  gsap.to(el.querySelector(".wk-overlay") as HTMLElement, { opacity: 1, duration: 0.3 });
  gsap.to(el.querySelector(".wk-label") as HTMLElement, { y: -4, color, duration: 0.3 });
};

const onLeave = (el: HTMLElement) => {
  gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
  gsap.to(el.querySelector(".wk-overlay") as HTMLElement, { opacity: 0, duration: 0.3 });
  gsap.to(el.querySelector(".wk-label") as HTMLElement, { y: 0, color: "#fff", duration: 0.3 });
};
</script>

<template>
  <div class="wk-root w-full">
    <h1 class="wk-title text-2xl font-bold mb-8 flex items-center gap-2 mt-10">
      <i class="fa-solid fa-rocket text-indigo-400"></i>
      作品集
    </h1>

    <div class="wk-grid">
      <a
        v-for="(w, i) in works" :key="i"
        class="wk-card group"
        :href="w.link" target="_blank" rel="noopener"
        @mouseenter="onEnter($event.currentTarget as HTMLElement, w.color)"
        @mouseleave="onLeave($event.currentTarget as HTMLElement)"
      >
        <div class="wk-card-inner">
          <img :src="w.img" :alt="w.title" class="wk-img" loading="lazy" />
          <!-- 渐变遮罩 -->
          <div class="wk-overlay" :style="{ background: `linear-gradient(to top, ${w.color}cc, transparent 60%)` }"></div>
          <!-- 底部信息 -->
          <div class="wk-info">
            <span class="wk-label text-white font-bold text-lg drop-shadow-lg">{{ w.title }}</span>
            <span class="wk-desc text-white/80 text-xs">{{ w.desc }}</span>
          </div>
          <!-- 角标 -->
          <span class="wk-badge" :style="{ background: w.color }">
            <i class="fa-solid fa-arrow-up-right-from-square text-white text-xs"></i>
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.wk-root {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
}

.wk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.wk-card {
  display: block;
  cursor: pointer;
  will-change: transform;
}

.wk-card-inner {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 30px -8px rgba(0, 0, 0, 0.4);
  background: #1a1a1a;
}

.wk-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
  transition: filter 0.3s;
}

.wk-card:hover .wk-img {
  filter: brightness(1.1);
}

.wk-overlay {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.wk-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wk-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.wk-card:hover .wk-badge {
  transform: scale(1);
}

@media (max-width: 768px) {
  .wk-root { padding: 0 16px; }
  .wk-grid { gap: 14px; }
  .wk-img { height: 260px; }
}

@media (max-width: 480px) {
  .wk-root { padding: 0 12px; }
}
</style>
