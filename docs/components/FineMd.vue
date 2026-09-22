

<script setup lang="ts">
const title = "精选";

const list = [
  {
    title: "DeepSeek 对前端开发的影响及开发人员的机遇",
    link: "aiPage/deepSeek/deepSeek-1",
    time: "2025/2-8",
  },
  {
    title: "如何在新时代利用DeepSeek发展个人特长——技术爱好者的进阶指南✔",
    link: "aiPage/deepSeek/deepSeek-2",
    time: "2024/2-10",
  }
];



</script>

<template>
  <div class="br p-4 shadow-lg bg-neutral-50 dark:bg-neutral-800 my-4">
    <span class="text-xs">📢{{ title }}</span>
    <div>
      <div
          v-for="(item, index) in list"
          :key="index"
          class="my-3 cursor-pointer text-xs"
      >
        <a :href="item.link" class="grid grid-cols-1 grid-rows-1 gap-1 border">
          <span>{{ item.title }}</span>
          <span>{{ item.time }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style>
a {
  color: inherit; /* 继承父元素的文字颜色 */
  text-decoration: none; /* 去掉下划线 */
  background: none; /* 去掉背景 */
  border: none; /* 去掉边框 */
  padding: 0; /* 去掉内边距 */
  margin: 0; /* 去掉外边距 */
}
</style>
