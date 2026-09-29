<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
const canvas = ref(null);
const ctx = ref(null);
const fireworks = ref([]);
const colors = ['#FF0044', '#00FF44', '#4400FF', '#FF4400', '#0044FF'];

const createFirework = () => {
  const x = Math.random() * canvas.value.width;
  const y = Math.random() * canvas.value.height;
  const color = colors[Math.floor(Math.random() * colors.length)];
  fireworks.value.push(new Firework(x, y, color));
};

const animate = () => {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  fireworks.value.forEach((firework, index) => {
    firework.update(ctx.value);
    if (firework.alpha <= 0) {
      fireworks.value.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
};

const resizeCanvas = () => {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
};

onMounted(() => {
  ctx.value = canvas.value.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  start();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
});

const start = () => {
  // 每5秒产生一次新的烟花
  setInterval(createFirework, 2000);
  animate();
};

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.alpha = 1;
    this.radius = Math.random() * 3 + 2;
    this.sparks = Array.from({ length: 100 }, () => ({
      x: x,
      y: y,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 3 + 1,
      alpha: 1,
    }));
  }

  update(ctx) {
    this.alpha -= 0.01;
    this.sparks.forEach((spark) => {
      spark.x += spark.speed * Math.cos(spark.angle);
      spark.y += spark.speed * Math.sin(spark.angle);
      spark.alpha -= 0.02;
    });

    ctx.globalAlpha = this.alpha;
    this.sparks.forEach((spark) => {
      ctx.globalAlpha = spark.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

</script>

<template>
  <div  class="grid gap-6  py-6 relative z-20 my-24 ">
    <div v-for="item in 1" :key="item" class="overflow-hidden w-full relative">
      <div class="flex" :style="{  animation: `scroll-${item % 2 === 0 ? 'left' : 'right'} 10s linear infinite` }">
        <div class="flex space-x-4 ml-10 shadow-2xl " v-for="item in 50" :key="item">
          <div class=" rounded-lg">
            <img :src="`https://picsum.photos/400/600?random=${item}`" class="min-w-72 min-h-96 rounded-lg shadow-lg shadow-black" alt="">
          </div>
        </div>
        <div class="flex space-x-4 ml-10 shadow-2xl " v-for="icon in 20" :key="icon">
          <div class="  rounded-lg">
            <img :src="`https://picsum.photos/400/600?random=${item}`" class="min-w-72 min-h-96 rounded-lg shadow-lg shadow-black" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed top-20 left-0 h-screen w-full">
    <div class=" relative w-full h-screen  overflow-hidden">
      <canvas ref="canvas" class="absolute inset-0"></canvas>
    </div>
  </div>

</template>

<style  scoped>
canvas {
  display: block;
}
</style>