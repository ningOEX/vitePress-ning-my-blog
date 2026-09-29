<template>
  <div class="layout-root">
    <div class="head">
      <Head />
    </div>
    <div class="layout-body">
      <div class="home-content">
        <HomeContent />
      </div>
      <div class="home-sidebar">
        <div class="home-sidebar-card"><Sidebar /></div>
        <div class="home-sidebar-card py-4"><FineMd /></div>
        <div class="home-sidebar-card"><Label /></div>
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

<style scoped>
.layout-root {
  width: 100%;
}

/* 主体容器：与导航栏同宽，居中，响应式 */
.layout-body {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
}

/* 平板：768px 以下改为单列 */
@media (max-width: 768px) {
  .layout-body {
    grid-template-columns: 1fr;
    padding: 0 16px;
  }
}

/* 手机：更小间距 */
@media (max-width: 480px) {
  .layout-body {
    padding: 0 12px;
    gap: 12px;
  }
}
</style>
