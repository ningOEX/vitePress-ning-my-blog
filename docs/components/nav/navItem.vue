<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";
import { NavContent, Nav } from "../../types/navContent";
import collectItem from "./collectItem.vue";

defineProps<{ navLists: NavContent[] }>();

const STORAGE_KEY = "nav_top_list";
const topList = ref<Nav[]>([]);

const onCollect = (list: Nav[]) => {
  topList.value = list;
};

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try { topList.value = JSON.parse(saved); } catch { /* ignore */ }
  }

  nextTick(() => {
    try {
      gsap.fromTo(".ci-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power3.out", clearProps: "transform" }
      );
      gsap.fromTo(".ni-section-title",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.2 }
      );
    } catch { /* ignore */ }
  });
});
</script>

<template>
  <!-- 置顶收藏区 -->
  <Transition name="fade">
    <div v-if="topList.length" class="mb-8">
      <p class="ni-section-title flex items-center gap-2 text-xl font-bold my-6 text-amber-500 dark:text-amber-400">
        <i class="fa-solid fa-star text-sm"></i>
        我的置顶
        <span class="text-xs font-normal text-gray-400">({{ topList.length }})</span>
      </p>
      <div class="ni-divider h-px w-full bg-gradient-to-r from-amber-400/50 to-transparent mb-4"></div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <collect-item :collect-item="topList" :top-list="topList" @collect-event="onCollect" />
      </div>
    </div>
  </Transition>

  <!-- 各分区 -->
  <div v-for="(item, index) in navLists" :key="index" class="mb-10" :id="`part${index}`">
    <div class="ni-divider h-px w-full bg-black/10 dark:bg-white/10 mb-4"></div>
    <p class="ni-section-title text-xl font-bold my-4 flex items-center gap-2">
      <span class="w-1 h-5 rounded-full bg-indigo-400 inline-block"></span>
      {{ item.name }}
    </p>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <collect-item :collect-item="item.nav" :top-list="topList" @collect-event="onCollect" />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
