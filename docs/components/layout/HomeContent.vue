<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vitepress";
import gsap from "gsap";
import homeContent from "../../data/homeContent.json";

interface ArticleItem {
  title: string;
  time: string;
  describe: string;
  link: string;
}

const router = useRouter();
const list = ref<ArticleItem[]>([]);

const accents = ["#c084fc", "#22d3ee", "#a78bfa", "#67e8f9", "#e879f9"];

const handleClick = (item: ArticleItem) => router.go(item.link);
const accentOf = (i: number) => accents[i % accents.length];

onMounted(async () => {
  list.value = homeContent.list;
  await nextTick();

  // 兜底：确保卡片可见
  const cards = document.querySelectorAll<HTMLElement>(".hc-card");
  cards.forEach((c) => { c.style.opacity = "1"; });

  try {
    gsap.fromTo(".hc-card",
      { y: 60, opacity: 0, scale: 0.92 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.6)",
        delay: 1.0,
        clearProps: "all",
      }
    );
  } catch {
    cards.forEach((c) => { c.style.opacity = "1"; c.style.transform = ""; });
  }
});

onUnmounted(() => gsap.killTweensOf(".hc-card"));
</script>

<template>
  <div class="grid gap-4 box-border">
    <article
      v-for="(item, index) in list"
      :key="index"
      @click="handleClick(item)"
      class="hc-card group relative grid gap-2 rounded-xl p-4 pl-5 cursor-pointer overflow-hidden
        bg-white/60 dark:bg-white/5 backdrop-blur-md
        border border-gray-200/60 dark:border-white/10
        hover:border-transparent
        hover:shadow-[0_8px_40px_-8px_rgba(192,132,252,0.25)]
        dark:hover:shadow-[0_8px_40px_-8px_rgba(192,132,252,0.35)]
        transition-all duration-300"
    >
      <!-- 左侧色条 -->
      <span
        class="absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all duration-300 group-hover:top-1 group-hover:bottom-1"
        :style="{ background: accentOf(index) }"
      ></span>

      <!-- 悬浮光晕 -->
      <span
        class="pointer-events-none absolute -right-10 -top-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500"
        :style="{ background: accentOf(index) }"
      ></span>

      <!-- 标题行 -->
      <header class="flex items-center justify-between gap-2">
        <h3
          class="text-lg font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300"
          :class="{ 'group-hover:text-fuchsia-500 dark:group-hover:text-fuchsia-400': index % 2 === 0, 'group-hover:text-cyan-500 dark:group-hover:text-cyan-400': index % 2 !== 0 }"
        >
          {{ item.title }}
        </h3>
        <time
          class="shrink-0 text-[10px] px-2 py-0.5 rounded-full border transition-colors duration-300"
          :style="{ borderColor: accentOf(index) + '40', color: accentOf(index) }"
        >
          {{ item.time }}
        </time>
      </header>

      <!-- 描述 -->
      <p class="text-sm line-clamp-2 leading-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
        {{ item.describe }}
      </p>

      <!-- 底部阅读提示 -->
      <span
        class="flex items-center gap-1 text-[10px] font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        :style="{ color: accentOf(index) }"
      >
        阅读全文
        <i class="fa-solid fa-arrow-right text-[8px]"></i>
      </span>
    </article>
  </div>
</template>
