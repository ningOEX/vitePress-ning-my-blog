<template>
  <div class="container">
    <div><i class="fa-sharp fa-regular fa-user"></i> ningOEX</div>
    <div v-if="updatedDate">更新于⏰ {{ formattedDate }}</div>
    <WordCount />
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    updated: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const updatedDate = ref(new Date(props.updated));

    const formattedDate = computed(() => {
      return updatedDate.value.toLocaleDateString(); // 只显示年月日
    });

    return {
      updatedDate,
      formattedDate,
    };
  },
};
</script>

<style scoped>
div {
  font-size: 0.9em;
  color: #555;
}
.container {
  display: flex;
  gap: 0.6em;
}
</style>
