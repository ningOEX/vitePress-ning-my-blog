<template>
  <div class="border dark:border-[#23272e] border-[#e2e2e3] br p-2">
    <span class="text-sm">📢{{ title }}</span>
    <div>
      <div
        class="grid grid-cols-1 grid-rows-1 text-xs border-b border-emerald-400/50 my-3 gap-1 cursor-pointer"
        v-for="item in 10"
      >
        <span>完善中...</span>
        <span>2025-12-6</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = "优质日记";
</script>

<style lang="scss" scoped></style>
