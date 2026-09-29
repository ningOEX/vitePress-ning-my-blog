<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";
import data from "../../data/navContent.json";
import { NavContent } from "../../types/navContent";
import navItem from "./navItem.vue";

const navLists = ref<NavContent[]>([]);
const currentActive = ref("");
// 固定导航栏高度，滚动时预留偏移避免标题被遮挡
const HEADER_OFFSET = 80;

const handleScroll = () => {
  const scrollPosition = window.scrollY + HEADER_OFFSET;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollPosition + windowHeight >= documentHeight) {
    currentActive.value = `part${navLists.value.length - 1}`;
    return;
  }

  navLists.value.forEach((_, index) => {
    const el = document.getElementById(`part${index}`);
    if (el) {
      const { offsetTop, offsetHeight } = el;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        currentActive.value = `part${index}`;
      }
    }
  });
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  navLists.value = data.navContent;

  await nextTick();
  try {
    gsap.fromTo(".nav-page-title",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  } catch { /* ignore */ }
});

onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <div class="nav-root w-full">
    <div class="nav-container">
      <h1 class="nav-page-title text-2xl font-bold my-6 flex items-center gap-2">
        <i class="fa-solid fa-compass text-indigo-400"></i>
        指南针
      </h1>

      <div class="nav-layout">
        <!-- 主内容区 -->
        <div class="nav-main">
          <nav-item :nav-lists="navLists" />
        </div>

        <!-- 右侧目录（2xl+ 显示） -->
        <aside class="nav-toc hidden 2xl:block">
          <div class="nav-toc-inner rounded-xl p-3 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10">
            <p class="text-sm pb-2 cursor-default text-indigo-400 font-medium flex items-center gap-1.5">
              <i class="fa-solid fa-list-ul"></i>目录
            </p>
            <div class="border-l border-gray-300/40 dark:border-white/10 pl-2">
              <ul class="space-y-1">
                <li
                  v-for="(item, index) in navLists" :key="index"
                  @click="scrollToSection(`part${index}`)"
                  class="text-sm py-1 px-2 rounded-md cursor-pointer transition-all duration-200"
                  :class="currentActive === `part${index}`
                    ? 'text-indigo-500 dark:text-indigo-300 bg-indigo-500/10 font-medium'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'"
                >{{ item.name }}</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-root {
  width: 100%;
}

/* 与导航栏同宽，居中 */
.nav-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
}

.nav-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* 主内容占满，目录占据固定宽度 */
.nav-main {
  flex: 1;
  min-width: 0;
}

.nav-toc {
  width: 180px;
  flex-shrink: 0;
  position: sticky;
  top: 96px;
  align-self: flex-start;
}

/* 平板及以下：目录隐藏，内容全宽 */
@media (max-width: 1535px) {
  .nav-layout {
    display: block;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 12px;
  }
}
</style>

