<script setup lang="ts">
import { onMounted, ref,watch } from "vue";
import { NavContent, Nav } from "../../model/navContent";

const { navLists } = defineProps<{
  navLists: NavContent[];
}>();
const collectTitle = '我的置顶';
const topList = ref<Nav[]>([]);

const collectEventHandle = (value :Nav[]) => {
  topList.value = value;

}

</script>

<template>
  <Transition>
    <div v-if="topList?.length" class="w-full">
    <p class="text-xl font-bold my-6">{{ collectTitle }}</p>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      <collect-item :collect-item="topList" ></collect-item>
    </div>
  </div>
  </Transition>
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
    <collect-item :collect-item="item.nav" @collect-event="collectEventHandle"></collect-item>
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
