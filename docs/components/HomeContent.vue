<template>
  <div>123</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { request } from "../utils/request.js";

onMounted(async () => {
  const res = await request("/data.json");
  console.log(res);
});
</script>
