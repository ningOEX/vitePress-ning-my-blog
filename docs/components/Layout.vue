<template>
  <div>
    <div class="head">
      <Head />
    </div>
    <div
      class="xl:flex lg:flex md:flex md:justify-between lg:justify-between xl:justify-between sm:grid gap-4"
    >
      <div class="xl:w-3/4 lg:w-3/4 md:w-3/4"><HomeContent /></div>
      <div class="xl:w-1/4 lg:w-1/4 md:w-1/4 grid grid-rows-1 grid-cols-1 gap-2">
        <Sidebar />
        <FineMd />
        <Label />
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeContent from "./HomeContent.vue";
import Head from "./Head.vue";
import Sidebar from "./Sidebar.vue";
import Label from "./Label.vue";
import FineMd from "./FineMd.vue";
</script>
