<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";

interface TagItem {
  name: string;
  colorIndex: number;
}

const palette = [
  { text: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.25)" },
  { text: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.25)" },
  { text: "#fb923c", bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.25)" },
  { text: "#fb7185", bg: "rgba(251,113,133,0.1)", border: "rgba(251,113,133,0.25)" },
  { text: "#22d3ee", bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.25)" },
  { text: "#e879f9", bg: "rgba(232,121,249,0.1)", border: "rgba(232,121,249,0.25)" },
];

const tags: TagItem[] = [
  "前端","CSS","javascript","HTML","vitePress","网络请求","自定义主题","DOM","BOM",
  "碎片","日记","DeepSeek","AI工具","码农","技术发展","构建工具","CLI",
  "算法与结构","JS新特性","微信小程序","Promise","编程学习",
].map((name, i) => ({ name, colorIndex: i }));

const tagStyle = (i: number) => {
  const p = palette[i % palette.length];
  return { color: p.text, background: p.bg, borderColor: p.border };
};

onMounted(() => {
  const els = document.querySelectorAll<HTMLElement>(".lb-tag, .lb-title, .lb-subtitle, .lb-line");
  els.forEach((el) => { el.style.opacity = "1"; });

  try {
    const tl = gsap.timeline({ delay: 2.6 });
    tl.fromTo(".lb-title",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    )
    .fromTo(".lb-subtitle",
      { x: 20, opacity: 0, letterSpacing: "0.5em" },
      { x: 0, opacity: 1, letterSpacing: "0.1em", duration: 0.5, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(".lb-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.4, ease: "power2.out" },
      "-=0.2"
    )
    .fromTo(".lb-tag",
      { scale: 0.6, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, stagger: 0.035, duration: 0.4, ease: "back.out(1.5)", clearProps: "transform" },
      "-=0.1"
    );
  } catch {
    els.forEach((el) => { el.style.opacity = "1"; });
  }
});

onUnmounted(() => gsap.killTweensOf(".lb-tag, .lb-title, .lb-subtitle, .lb-line"));
</script>

<template>
  <div class="w-full">
    <!-- 标题栏 -->
    <div class="lb-title flex items-center justify-between">
      <p class="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 tracking-wider">
        <i class="fa-solid fa-tags text-cyan-400"></i>
        技术标签
      </p>
      <span class="lb-subtitle text-[9px] text-gray-400 dark:text-gray-500 tracking-[0.1em]">TAGS</span>
    </div>
    <!-- 装饰线 -->
    <div class="lb-line h-px w-full mb-3 bg-gradient-to-r from-cyan-400/60 via-fuchsia-400/40 to-transparent origin-left"></div>

    <!-- 标签云 -->
    <div class="flex flex-wrap gap-x-2 gap-y-2.5">
      <span
        v-for="(tag, i) in tags" :key="i"
        class="lb-tag px-2 py-1 rounded-md cursor-pointer border text-xs font-medium
          hover:scale-110 hover:shadow-sm transition-all duration-200"
        :style="tagStyle(tag.colorIndex)"
      >
        {{ tag.name }}
      </span>
    </div>
  </div>
</template>
