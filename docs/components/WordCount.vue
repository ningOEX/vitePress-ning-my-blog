<template>
  <div v-if="wordCount >= 0">📝{{ wordCount }} 字</div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const wordCount = ref(0);

    onMounted(() => {
      // 获取页面内容
      const content = document.querySelector(".vp-doc")?.innerText || "";
      // 使用正则表达式计数单词数
      wordCount.value = content.trim().split(/\s+/).length;
    });

    return {
      wordCount,
    };
  },
};
</script>

<style scoped>
div {
  font-size: 0.9em;
  color: #555;
}
</style>
