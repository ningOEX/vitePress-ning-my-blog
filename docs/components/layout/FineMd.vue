<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

interface FeaturedItem {
  title: string;
  link: string;
  time: string;
  tag: string;
}

const list: FeaturedItem[] = [
  { title: "DeepSeek 对前端开发的影响及开发人员的机遇", link: "aiPage/deepSeek/deepSeek-1", time: "2025.02.08", tag: "AI" },
  { title: "如何在新时代利用DeepSeek发展个人特长——技术爱好者的进阶指南", link: "aiPage/deepSeek/deepSeek-2", time: "2024.02.10", tag: "AI" },
];

onMounted(() => {
  // 标题栏兜底可见
  const titleEls = document.querySelectorAll<HTMLElement>(".fm-title, .fm-featured");
  titleEls.forEach((el) => { el.style.opacity = "1"; });

  // 卡片兜底可见
  const items = document.querySelectorAll<HTMLElement>(".fm-card");
  items.forEach((el) => { el.style.opacity = "1"; });

  try {
    const tl = gsap.timeline({ delay: 2.0 });
    tl.fromTo(".fm-title",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    )
    .fromTo(".fm-featured",
      { x: 20, opacity: 0, letterSpacing: "0.5em" },
      { x: 0, opacity: 1, letterSpacing: "0.1em", duration: 0.5, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(".fm-title-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.4, ease: "power2.out", transformOrigin: "left center" },
      "-=0.2"
    )
    .fromTo(".fm-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out", clearProps: "all" },
      "-=0.1"
    );
  } catch {
    [...titleEls, ...items].forEach((el) => { el.style.opacity = "1"; });
  }
});

onUnmounted(() => gsap.killTweensOf(".fm-card, .fm-title, .fm-featured, .fm-title-line"));
</script>

<template>
  <div class="fm-wrap">
    <!-- 标题栏 -->
    <div class="fm-title flex items-center justify-between">
      <p class="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 tracking-wider">
        <i class="fa-solid fa-star text-amber-400"></i>
        精选推荐
      </p>
      <span class="fm-featured text-[9px] text-gray-400 dark:text-gray-500 tracking-[0.1em]">FEATURED</span>
    </div>
    <!-- 标题装饰线 -->
    <div class="fm-title-line h-px w-full mb-3 bg-gradient-to-r from-fuchsia-400/60 via-cyan-400/40 to-transparent origin-left"></div>

    <!-- 卡片列表 -->
    <div class="grid gap-2.5">
      <a v-for="(item, i) in list" :key="i" :href="item.link"
        class="fm-card group relative block rounded-xl overflow-hidden
          bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/[0.03]
          border border-gray-200/50 dark:border-white/10
          hover:border-fuchsia-400/40 dark:hover:border-fuchsia-400/40
          hover:shadow-[0_4px_24px_-4px_rgba(232,121,249,0.3)] dark:hover:shadow-[0_4px_24px_-4px_rgba(232,121,249,0.35)]
          transition-all duration-300 hover:-translate-y-0.5">

        <!-- 序号水印 -->
        <span class="absolute -right-1 -top-2 text-5xl font-black text-gray-100/50 dark:text-white/[0.03] select-none pointer-events-none transition-colors duration-300 group-hover:text-fuchsia-200/30 dark:group-hover:text-fuchsia-400/10">
          0{{ i + 1 }}
        </span>

        <div class="relative p-3 pl-3.5">
          <!-- 左侧色条 -->
          <span class="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-full bg-gradient-to-b from-fuchsia-400 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></span>

          <!-- 标签 -->
          <div class="flex items-center gap-1.5 mb-1.5">
            <span class="text-[9px] px-1.5 py-px rounded font-medium text-fuchsia-500 dark:text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20">
              {{ item.tag }}
            </span>
            <span class="text-[9px] text-gray-400">{{ item.time }}</span>
          </div>

          <!-- 标题 -->
          <p class="text-xs font-medium text-gray-700 dark:text-gray-200 leading-5 line-clamp-2 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300 transition-colors duration-300 pr-6">
            {{ item.title }}
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.fm-wrap { width: 100%; }
</style>
