<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { Nav } from "../../model/navContent";

const { collectItem } = defineProps<{ collectItem: Nav[] }>();

const emits = defineEmits<{ collectTopList: [Nav[]] }>();

const topList = ref<Nav[]>([]);

const collectionKey = "topList";

const change = (link: string) => {
  window.open(link, "_blank");
};
/**
 * 添加置顶
 * @param nav
 */
const handleBtnClick = (nav: Nav) => {
  if (includesFunc(nav)) {
    topList.value = topList.value.filter((item) => item.link !== nav.link);
    localStorage.setItem(collectionKey, JSON.stringify(topList.value));
    return;
  }
  topList.value.unshift(nav);
  localStorage.setItem(collectionKey, JSON.stringify(topList.value));
};

const includesFunc = (nav: Nav) => {
  return topList.value.some((item) => item.link === nav.link);
};

onMounted(() => {
  const topListStr = localStorage.getItem(collectionKey);
  if (topListStr) {
    topList.value = JSON.parse(topListStr);
    emits("collectTopList", topList.value);
  }
});
</script>

<template>
  <div
    v-for="(nav, index) in collectItem"
    :key="index"
    class="relative bg-gray-300/30 dark:bg-black/20 py-2 px-2 min-w-32 md:min-w-52 grid gap-2 cursor-default border rounded-md hover:bg-[#a8b1ff] dark:border-gray-500/30 dark:hover:border-[#a8b1ff] dark:hover:bg-black/20"
  >
    <div
      class="flex gap-2 items-center cursor-pointer hover:text-[#a8b1ff]"
      @click="change(nav.link)"
    >
      <div class="p-1 bg-gray-300/50 dark:bg-gray-700/50">
        <img
          class="h-8 w-8 rounded-sm"
          :src="
            nav.icon
              ? nav.icon
              : 'https://avatars.githubusercontent.com/u/52589990?v=4'
          "
          alt=""
        />
      </div>
      <span class="font-bold"> {{ nav.name }}</span>
    </div>
    <span class="text-xs text-slate-500 line-clamp-2">{{
      nav.abbreviation
    }}</span>
    <div
      class="absolute top-2 right-1 cursor-pointer"
      @click="handleBtnClick(nav)"
    >
      <el-tooltip
        effect="dark"
        :content="includesFunc(nav) ? '取消置顶' : '置顶'"
        placement="top"
      >
        <icon-top v-if="includesFunc(nav)"></icon-top>
        <icon-bottom v-else></icon-bottom>
      </el-tooltip>
    </div>
  </div>
</template>
