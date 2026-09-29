<script setup lang="ts">
import gsap from "gsap";
import { Nav } from "../../types/navContent";

const props = defineProps<{
  collectItem: Nav[];
  topList: Nav[];
}>();
const emit = defineEmits<{ (e: "collectEvent", list: Nav[]): void }>();

const STORAGE_KEY = "nav_top_list";

const isCollected = (nav: Nav) => props.topList.some((i) => i.link === nav.link);

const toggleCollect = (nav: Nav, el: HTMLElement) => {
  let next: Nav[];
  if (isCollected(nav)) {
    next = props.topList.filter((i) => i.link !== nav.link);
  } else {
    next = [nav, ...props.topList];
    gsap.fromTo(el, { scale: 1.4, rotate: 0 }, { scale: 1, rotate: 360, duration: 0.5, ease: "back.out(2)" });
  }
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  emit("collectEvent", next);
};
</script>

<template>
  <div
    v-for="nav in collectItem" :key="nav.link"
    class="ci-card group relative rounded-xl p-3 cursor-default overflow-hidden
      bg-white/60 dark:bg-white/5 backdrop-blur-sm
      border border-gray-200/50 dark:border-white/10
      hover:border-indigo-400/40 dark:hover:border-indigo-400/40
      hover:shadow-[0_4px_20px_-4px_rgba(168,177,255,0.3)]
      transition-all duration-300 hover:-translate-y-1"
  >
    <a
      class="flex gap-2.5 items-center cursor-pointer"
      :href="nav.link" target="_blank" rel="noopener"
    >
      <div class="shrink-0 w-9 h-9 rounded-lg overflow-hidden bg-gray-200/50 dark:bg-gray-700/50 flex items-center justify-center">
        <img
          v-if="nav.icon"
          class="w-7 h-7 object-contain"
          :src="nav.icon" :alt="nav.name"
          loading="lazy"
        />
        <i v-else class="fa-solid fa-link text-gray-400 text-sm"></i>
      </div>
      <div class="min-w-0 flex-1">
        <p class="font-bold text-sm text-gray-800 dark:text-gray-100 truncate group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">{{ nav.name }}</p>
      </div>
    </a>

    <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1.5 leading-5">{{ nav.abbreviation }}</p>

    <button
      class="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
      :class="isCollected(nav) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600 hover:text-amber-300'"
      @click.stop="toggleCollect(nav, $event.currentTarget as HTMLElement)"
      :title="isCollected(nav) ? '取消置顶' : '置顶收藏'"
    >
      <i class="fa-star text-base" :class="isCollected(nav) ? 'fa-solid' : 'fa-regular'"></i>
    </button>
  </div>
</template>
