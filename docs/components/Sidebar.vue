<template>
  <div class="flex justify-around max-h-36 shadow-lg" style="border-radius: 5px">
    <div class="w-1/2 mx-auto p-2 pl-5 pt-5">
      <img class="w-28" style="border-radius: 20px" src="../images/logo.png" alt="" />
    </div>
    <div class="w-2/3 p-4 grid grid-cols-1 grid-rows-1 gap-6">
      <span class="text-sm flex items-center mt-4">人生如戏</span>
      <span class="text-xs">不积跬步无以至千里</span>
      <div class="grid grid-cols-2 grid-rows-2 items-center text-center text-xs gap-2">
        <span>日记总量</span>
        <span>月更新+</span>
        <span class="text-[#9facba]">{{ totalArticles }}</span>
        <span class="text-[#9facba]">{{ monthlyUpdates }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 响应式变量
const totalArticles = ref(0);
const monthlyUpdates = ref(0);

onMounted(async () => {
  try {
    // 获取所有页面的列表
    const modules = import.meta.glob("../**/*.md", { eager: true });
    const articles = Object.values(modules);

    totalArticles.value = articles.length; // 统计总文章数量

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    monthlyUpdates.value = articles.filter((article) => {
      const { frontmatter } = article;

      // 检查 frontmatter 和 date 是否存在
      if (frontmatter && frontmatter.date) {
        const articleDate = new Date(frontmatter.date);
        return (
          articleDate.getMonth() === currentMonth &&
          articleDate.getFullYear() === currentYear
        );
      }
      return false; // 如果没有 date 字段，返回 false
    }).length; // 统计本月更新的文章数量
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
});
</script>
