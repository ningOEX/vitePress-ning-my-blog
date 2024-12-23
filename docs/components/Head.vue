<template>
  <div class="w-full sm:h-60 text-center flex items-center justify-center">
    <div>
     <img class="sm:hidden w-40 mx-auto box-border  py-6 clip-path" src="https://avatars.githubusercontent.com/u/52589990?v=4" alt="">
      <p class="font-sans text-4xl"> <h1 >人生如戏</h1></p>
      <div class="p-2 text-xl">
        <Transition name="fade" mode="out-in">
          <span v-if="currentItem" :key="currentItem">{{ currentItem.content }}</span>
          <span v-else>黑暗中 是否找到来时的路</span>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { request } from "../utils/request.js";

const description = ref<string[]>([]); //数据

const timer = ref(null); //定时器

const currentIndex = ref(null); //当前索引

const duration = 4000; //切换的时间

const currentItem = computed(() => description.value[currentIndex.value]); // 计算当前项

const startSwitching = () => {
  timer.value = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % description.value.length; // 更新索引
  }, duration); // 每 2000 毫秒切换一次
};

onMounted(async () => {
  const res = await request("/data.json"); // 请求 JSON 文件
  description.value = res.description;
  startSwitching();
});

onBeforeUnmount(() => {
  clearInterval(timer.value); // 组件卸载前清除定时器
});
</script>

<style scoped>
/* 过渡效果的 CSS */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
h1 {
  font-size: inherit;
}

.clip-path{
 clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
</style>
