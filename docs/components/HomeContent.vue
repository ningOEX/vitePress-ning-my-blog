<script setup lang="ts">
import {ref,onMounted} from "vue"

import { useRouter } from 'vitepress';

import homeContent from "../JSON/homeContent.json"

interface List{
  title:string, // 标题
  time:string, //  时间
  describe:string, // 描述
  link:string, // 链接
}

// use
const router  = useRouter();

// data
  const list = ref<List[]>([])

// methods
  const handleClick = (item)=>{
    router.go(item.link)
  }

onMounted(()=>{
  list.value = homeContent.list;
})


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
