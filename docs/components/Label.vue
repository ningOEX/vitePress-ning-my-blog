<template>
  <div class="p-4 br shadow-lg">
    <span class="text-sm">🏷 标签</span>

    <div class="flex flex-wrap items-center gap-x-2 gap-y-6 text-xs mt-2">
      <el-tag :type="getType(index)" v-for="(label, index) in Labels" effect="dark">{{
        label
      }}</el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { request } from "../utils/request.js";
import { ref, onMounted } from "vue";

const Labels = ref<string[]>([]);

const getType = (index: number) => {
  const types = ["primary", "success", "warning", "danger", "info"];
  if (index % 1 === 0) {
    return types[index % types.length];
  } else if (index % 2 === 0) {
    return types[index % types.length];
  } else if (index % 3 === 0) {
    return types[index % types.length];
  } else if (index % 4 === 0) {
    return types[index % types.length];
  } else {
    return types[index % types.length];
  }
};

onMounted(async () => {
  const res = await request("/data.json");
  Labels.value = res.labels;
});
</script>
