<script setup lang="ts">
import {ref} from "vue"

import { useRouter } from 'vitepress';

// use
const router  = useRouter();

// data
  const list = ref([
    {title:'AI 图像工具大全：从制图到修图，这些热门工具让你轻松成为设计大师！',time:'2025-2-12',describe:'AI 制图、修图和 P 图工具正在改变图像创作和编辑的方式。无论是专业设计师还是普通用户，都可以通过这些工具轻松实现高质量的图像处理。如果你对 AI 图像技术感兴趣，不妨尝试文章中的工具，探索更多创意可能性！',link:'/aiPage/draw/draw-1'},
    {title:'',time:'2025-2-12',describe:'',link:''},
    {title:'',time:'2025-2-12',describe:'',link:''},
    {title:'',time:'2025-2-12',describe:'',link:''},
    {title:'',time:'2025-2-12',describe:'',link:''},
    {title:'',time:'2025-2-12',describe:'',link:''},
  ])

// methods
  const handleClick = (item)=>{
    router.go(item.link)
  }


</script>
<template>
  <div class="rounded-sm text-sm grid gap-4 overflow-hidden py-6 pt-4 box-border ">
    <div
      v-for="(item, index) in list"
      :key="index"
      @click="handleClick(item)"
      class="grid rounded-sm grid-cols-1 grid-rows-1 gap-2 shadow-lg p-4 cursor-pointer hover:outline hover:outline-gray-700/20 hover:hover:shadow-gray-700/50 dark:hover:shadow-gray-700 dark:hover:outline dark:hover:outline-gray-700"
    >
      <span class="text-xl font-bold">{{item.title}}</span>
      <span class="text-sm text-ellipsis line-clamp-2 w-full leading-6 text-slate-400"
      >{{item.describe}}</span>
      <span class="text-xs text-gray-300">{{item.time}}</span>
    </div>
  </div>
</template>


<style></style>
