<template>
  <div class="rounded-sm text-sm grid gap-4 overflow-hidden py-6 pt-4 box-border ">
    <div
      v-for="(item, index) in 6"
      :key="index"
      class="grid rounded-sm grid-cols-1 grid-rows-1 gap-2 shadow-lg p-4 cursor-pointer hover:outline hover:outline-gray-700/20 hover:hover:shadow-gray-700/50 dark:hover:shadow-gray-700 dark:hover:outline dark:hover:outline-gray-700"
    >
      <span class="text-xl font-bold">关于如何快速建站</span>
      <span class="text-sm text-ellipsis line-clamp-2 w-full leading-6 text-slate-400"
        ><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis cumque delectus error et fugiat harum in itaque labore magni molestiae officia officiis quaerat quas reiciendis, repellat sequi suscipit voluptatem.</span><span>Aliquid atque autem commodi culpa cum delectus deserunt exercitationem harum magnam modi nam porro quos rem repellendus sequi temporibus veniam veritatis, voluptatum? Accusamus atque dolores, excepturi molestias quibusdam sapiente veniam?</span></span
      >
      <span class="text-xs text-gray-300">2024-12-09</span>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style></style>
