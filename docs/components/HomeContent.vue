<template>
  <div class="rounded-sm text-sm grid gap-4 overflow-hidden py-6 pt-2 box-border">
    <div
      v-for="(item, index) in bookList"
      :key="index"
      class="grid rounded-sm grid-cols-1 grid-rows-1 gap-2 shadow-lg p-4 cursor-pointer hover:outline hover:outline-gray-700/20 hover:hover:shadow-gray-700/50 dark:hover:shadow-gray-700 dark:hover:outline dark:hover:outline-gray-700"
    >
      <span class="text-xl font-bold">关于如何快速建站VitePress</span>
      <span class="text-sm text-ellipsis line-clamp-2 w-full leading-6 text-slate-400"
        >标题陈述内容写在这里标题陈述内容写在这里标题陈述内容写在这里标题陈述内容写在这里标题陈述内容写在这里标题陈述内容写在这里标题陈述内容写在这里标题陈述内容写在这里标题陈述内容写在这里</span
      >
      <span class="text-xs text-gray-300">2024-12-09</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { request } from "../utils/request.js";

interface Book {
  description: string;
  links: string;
  time: string;
  title: string;
}

const bookList = ref<Book[]>([]);

const currentPage = ref(5);
const pageSize = ref(100);

onMounted(async () => {
  const res = await request("/data.json");
  bookList.value = res.blogs;
  console.log(res);
});
</script>

<style></style>
