<template>
  <div class="w-full sm:h-60 text-center flex items-center justify-center">
    <div>
      <img
        class="sm:hidden w-40 mx-auto box-border py-6 rounded-sm"
        src="https://avatars.githubusercontent.com/u/52589990?v=4"
        alt=""
      />
      <p class="font-sans text-4xl">NING OEX</p>
      <div class="p-2 text-xl h-20">
        <Transition name="fade" mode="out-in">
          <span v-if="currentItem" >{{ currentItem.content }}</span>
          <span v-else>黑暗中 是否找到来时的路</span>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from "vue";

const description = [
  {
    "content": "别让别人的评价定义你，真正的你是自己在不断塑造的"
  },
  {
    "content": "每一次努力都是为了更好的自己"
  },
  {
    "content": "人生的每一段旅程，都是为下一次飞翔积蓄力量"
  },
  {
    "content": "生命的意义在于追求，而非结果"
  }
] //数据


let timer:any; //定时器

const currentIndex = ref(-1); //当前索引

const duration = 4000; //切换的时间

const currentItem = computed(() => description[currentIndex.value]); // 计算当前项

const startSwitching = () => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % description.length; // 更新索引
  }, duration); // 每 2000 毫秒切换一次
};

onMounted(async () => {
  startSwitching();
});

onBeforeUnmount(() => {
  clearInterval(timer); // 组件卸载前清除定时器
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

.clip-path {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
</style>
