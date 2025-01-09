

<script setup lang="ts">
const title = "精选";

const list = [
  {
    title: "vitePress如何使用插件",
    link: "usePage/",
    time: "2024/12",
  },
  {
    title: "vitePress如何使用插件",
    link: "usePage/",
    time: "2024/12",
  },
  {
    title: "vitePress如何使用插件",
    link: "usePage/",
    time: "2024/12",
  },
  {
    title: "vitePress如何使用插件",
    link: "usePage/",
    time: "2024/12",
  },
  {
    title: "vitePress如何使用插件",
    link: "usePage/",
    time: "2024/12",
  },
  {
    title: "vitePress如何使用插件",
    link: "usePage/",
    time: "2024/12",
  },
  {
    title: "vitePress如何使用插件",
    link: "usePage/",
    time: "2024/12",
  },
];
</script>

<template>
  <div class="br p-4 shadow-lg">
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
