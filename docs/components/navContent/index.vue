<script setup lang="ts">
//
import { ref, onMounted, onBeforeUnmount } from "vue";
import data from "./navContent.json";

interface Nav {
  abbreviation: string; //简介
  icon: string; // 图标
  link: string; // 链接
  name: string; // 名称
}

interface NavContent {
  name: string; // 名称
  nav: Nav[]; // 导航
}

// card 数据源
const navLists = ref<NavContent[]>([]);

const containerRef = ref<HTMLElement | null>(null); // ref
const currentActive = ref<string>(""); // 当前锚点
const offset = 0; // 设置偏移量

// 点击card
const change = (link: string) => {
  window.open(link, "_blank");
};

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
        <div
          v-for="(item, index) in navLists"
          :key="index"
          class="mb-8 w-full"
          :id="`part${index}`"
        >
          <div
            class="line w-full h-[1px] my-4 bg-black/20 dark:bg-white/10 box-border"
          ></div>
          <p class="text-xl font-bold my-6">{{ item.name }}</p>
          <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
          >
            <div
              v-for="(nav, index) in item.nav"
              :key="index"
              @click="change(nav.link)"
              class="bg-gray-300/30 dark:bg-black/20 py-2 px-2 min-w-32 md:min-w-52 grid gap-2 cursor-pointer border rounded-md hover:bg-[#a8b1ff] dark:border-gray-500/30 dark:hover:border-[#a8b1ff] dark:hover:bg-black/20"
            >
              <div class="flex gap-2 items-center">
                <div class="p-1 bg-gray-300/50 dark:bg-gray-700/50">
                  <img
                    class="h-8 w-8 rounded-sm"
                    :src="
                      nav.icon
                        ? nav.icon
                        : 'https://avatars.githubusercontent.com/u/52589990?v=4'
                    "
                    alt=""
                  />
                </div>
                <span class="font-bold"> {{ nav.name }}</span>
              </div>
              <span class="text-xs text-slate-500 line-clamp-2">{{
                nav.abbreviation
              }}</span>
            </div>
          </div>
        </div>
        <div
          class="opacity-0 2xl:opacity-100 absolute top-0 xl:right-2 2xl:right-20"
        >
          <el-affix :offset="120">
            <p class="text-sm pb-2 cursor-default animate-bounce">指南针</p>
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

<style>
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
