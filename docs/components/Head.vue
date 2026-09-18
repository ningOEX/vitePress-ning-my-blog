<template>
  <div class="w-full sm:h-60 text-center flex items-center justify-center">
    <div>
      <img
        class="sm:hidden w-40 mx-auto box-border py-6 rounded-sm"
        src="https://avatars.githubusercontent.com/u/52589990?v=4"
        alt=""
      />
      <div class="w-full flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="220" height="60" viewBox="-1 0 220 60">
          <defs>
            <filter id="f4">
              <feTurbulence baseFrequency="0.25" result="img4" />
              <feDisplacementMap in="SourceGraphic" in2="img4" xChannelSelector="B" yChannelSelector="R" scale="100">
                <animate id="animateMap" attributeType="XML" attributeName="scale" from="100" to="10" dur="1.5s"
                         fill="freeze" />
              </feDisplacementMap>
            </filter>
            <linearGradient id="lineGradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#caf" />
              <stop offset="1" stop-color="#fac" />
            </linearGradient>
          </defs>
          <text x="105" y="42" text-anchor="middle" font-size="40" fill="url(#lineGradient)" filter="url(#f4)">NING OEX</text>
          <path id="pathLine" d="M30 60 L180 60, M180 60 A30 30 0 1 0 180 0, M180 0 L30 0, M30 0 A30 30 0 1 0 30 60" fill="none" />
          <rect x="0" y="0" width="5" height="5" fill="url(#lineGradient)">
            <animateMotion dur="15s" rotate="auto-reverse" repeatCount="indefinite">
              <mpath href="#pathLine" />
            </animateMotion>
          </rect>
        </svg>
      </div>
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
