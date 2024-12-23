<template>
  <div class="border dark:border-[#23272e] border-[#e2e2e3] p-2 br">
    <span class="text-sm">🏷 标签</span>

    <div class="flex flex-wrap items-center gap-x-2 gap-y-6 text-xs mt-2">
      <span
        :class="bgHandle(index)"
        style="padding: 2px 8px; cursor: pointer"
        v-for="(label, index) in Labels"
        >{{ label }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { request } from "../utils/request.js";
import { ref, onMounted } from "vue";

const Labels = ref<string[]>([]);

const bgHandle = (i: number) => {
  let className = "";
  if (i % 1 === 0) className = "note-1 br"; // 1的倍数
  if (i % 2 === 0) className = "note-2 br"; // 2的倍数
  if (i % 3 === 0) className = "note-3 br"; // 3的倍数
  if (i % 4 === 0) className = "note-4 br"; // 4的倍数
  return className;
};

onMounted(async () => {
  const res = await request("/data.json");
  Labels.value = res.labels;
});
</script>

<style>
/* 不同颜色的便签 */
.note-1 {
  color: #4caf50; /* 绿色 */
  background-color: #1c2518;
}

.note-2 {
  color: #2196f3; /* 蓝色 */
  background-color: #18222c;
}

.note-3 {
  color: #ff9800; /* 橙色 */
  background-color: #1b1b1f;
}

.note-4 {
  color: #f44336; /* 红色 */
  background-color: #2b1d1d;
}
</style>
