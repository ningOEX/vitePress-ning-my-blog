<script setup lang="ts">
//
import { ref, onMounted, onBeforeUnmount,nextTick } from "vue";
import data from "./navContent.json";
import { NavContent } from "../../model/navContent";

// card 数据源
const navLists = ref<NavContent[]>([]);


const containerRef = ref<HTMLElement | null>(null); // ref
const currentActive = ref<string>(""); // 当前锚点
const offset = 0; // 设置偏移量

// 滚动时间 主要为了监测滚动高亮锚点
const handleScroll = () => {
  const scrollPosition = window.scrollY + offset; // 加上偏移量
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  // 如果滚动到底部，直接返回
  if (scrollPosition + windowHeight >= documentHeight) {
    currentActive.value = `part${navLists.value.length - 1}`; // 设置为最后一个部分
  } else {
    currentActive.value = "";
  }

  navLists.value.forEach((item, index) => {
    const element = document.getElementById(`part${index}`);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetHeight = element.offsetHeight;
      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        currentActive.value = `part${index}`;
      }
    }
  });
};

// 点击锚点进行滚动到对应侧边栏
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY - offset;
    element.scrollIntoView({ behavior: "smooth" });
  }
};


// 注册滚动时间
onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  navLists.value = data.navContent;
});

// 销毁滚动时间
onBeforeUnmount(() => {
  // 清除事件监听器
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div ref="containerRef" class="w-full p-2 relative">
    <div class="px-4 md:px-6 lg:px-6 xl:px-6 2xl:px-64">
      <div class="flex flex-wrap">
        <p class="text-2xl font-bold my-6">指南针</p>
        <nav-item :nav-lists="navLists"></nav-item>
        <div
          class=" hidden 2xl:block w-40 absolute top-0 xl:right-2 2xl:right-20"
        >
          <el-affix :offset="120">
            <p class="text-sm pb-2 cursor-default animate-bounce w-20">指南针</p>
            <div class="w-40 border-l border-gray-500/50 pl-1 box-border">
              <ul class="w-full">
                <li
                  v-for="(item, index) in navLists"
                  :key="index"
                  @click.prevent="scrollToSection(`part${index}`)"
                  class="text-sm py-1 cursor-pointer"
                  :class="
                    currentActive === `part${index}`
                      ? 'text-[#a8b1ff] '
                      : 'text-slate-500'
                  "
                >
                  <span
                    class="pl-2 rounded-xs -ml-[5px]"
                    :class="
                      currentActive === `part${index}`
                        ? ' border-[#a8b1ff] border-l-2'
                        : 'border-[#1b1b1f]'
                    "
                    >{{ item.name }}</span
                  >
                </li>
              </ul>
            </div>
          </el-affix>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.el-anchor {
  background-color: initial !important;
}
.is-active {
  color: #a8b1ff !important;
}
.el-anchor__marker {
  background-color: #a8b1ff !important;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-30%);
  } /* 这里调整为 -50% */
}

@keyframes scroll-right {
  0% {
    transform: translateX(-30%);
  }
  100% {
    transform: translateX(0);
  } /* 这里调整为 -50% */
}
</style>
