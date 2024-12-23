<template>
  <div class="border dark:border-[#23272e] border-[#e2e2e3] rounded-sm">123</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { request } from "../utils/request.js";

onMounted(async () => {
  const res = await request("/data.json");
  console.log(res);
});
</script>
