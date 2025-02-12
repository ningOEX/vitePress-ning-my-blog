<template>
  <div class="p-4 br shadow-lg">
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
//data
const Labels = [
  "前端",
  "CSS",
  "javascript",
  "HTML",
  "vitePress",
  "网络请求",
  "自定义主题使用手册",
  "DOM",
  "BOM",
  "碎片",
  "日记",
  "DeepSeek",
  "AI工具",
  "码农",
  "技术发展",
  "构建工具",
  "CLI",
  "算法与结构",
  "JS新特性",
  "微信小程序",
  "Promise",
  "编程学习",
];
const bgHandle = (i: number) => {
  let className = "";
  if (i % 1 === 0) className = "note-1 br "; // 1的倍数
  if (i % 2 === 0) className = "note-2 br"; // 2的倍数
  if (i % 3 === 0) className = "note-3 br"; // 3的倍数
  if (i % 4 === 0) className = "note-4 br"; // 4的倍数
  return className;
};

</script>

<style>
/* 不同颜色的便签 */
.note-1 {
  color: #4caf50; /* 绿色 */
}

.note-2 {
  color: #2196f3; /* 蓝色 */
}

.note-3 {
  color: #ff9800; /* 橙色 */
}

.note-4 {
  color: #f44336; /* 红色 */
}
</style>
