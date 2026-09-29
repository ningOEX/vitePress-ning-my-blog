<template>
  <div class="home-root relative min-h-screen overflow-hidden bg-slate-50 dark:bg-[#09090b]">

    <!-- 星云晕染层 -->
    <div class="fixed inset-0 z-0 pointer-events-none" :style="nebulaStyle"></div>

    <!-- 静态噪点层 -->
    <div class="grain-layer fixed inset-0 z-[1] pointer-events-none opacity-[0.14] dark:opacity-[0.18] mix-blend-overlay"
      :style="{ backgroundImage: grainUrl }">
    </div>

    <!-- 动态细胞组织网 -->
    <canvas ref="canvasRef" class="particle-canvas fixed inset-0 z-[2] pointer-events-none"></canvas>

    <!-- 内容层 -->
    <div class="content-layer relative z-10">
      <Layout />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, shallowRef } from "vue";
import Layout from "./Layout.vue";
import gsap from "gsap";

// ---------------- 主题感知 ----------------
const isDark = ref(false);
const checkDark = () => { isDark.value = document.documentElement.classList.contains("dark"); };

const getAccent = () => (isDark.value ? "#c084fc" : "#6366f1");
const getAccent2 = () => (isDark.value ? "#22d3ee" : "#06b6d4");

// 噪点 SVG data URL（内联，无需外部资源）
const grainUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// 星云渐变（暗/亮主题切换）
const nebulaStyle = computed(() => {
  if (isDark.value) {
    return {
      background:
        "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(217,70,239,0.15), transparent 70%)," +
        "radial-gradient(ellipse 50% 40% at 80% 70%, rgba(34,211,238,0.10), transparent 70%)," +
        "radial-gradient(ellipse 40% 30% at 60% 20%, rgba(139,92,246,0.08), transparent 70%)",
    };
  }
  return {
    background:
      "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(99,102,241,0.08), transparent 70%)," +
      "radial-gradient(ellipse 50% 40% at 80% 70%, rgba(6,182,212,0.06), transparent 70%)",
  };
});

// ---------------- Canvas 细胞组织网 ----------------
const canvasRef = ref(null);
const ctx = shallowRef(null);
const particles = shallowRef([]);
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
const dpr = Math.min(window.devicePixelRatio || 1, 2);
const PARTICLE_COUNT = 90;
const LINK_DISTANCE = 150;

let rafId = 0;

const resizeCanvas = () => {
  const c = canvasRef.value;
  if (!c) return;
  c.width = window.innerWidth * dpr;
  c.height = window.innerHeight * dpr;
  c.style.width = window.innerWidth + "px";
  c.style.height = window.innerHeight + "px";
};

const initParticles = () => {
  const arr = [];
  const w = window.innerWidth;
  const h = window.innerHeight;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      baseAlpha: isDark.value ? 0.4 + Math.random() * 0.5 : 0.2 + Math.random() * 0.25,
      twinkleSpeed: Math.random() * 0.015 + 0.003,
      twinklePhase: Math.random() * Math.PI * 2,
      pulse: Math.random() * Math.PI * 2,
      colorType: Math.random() > 0.85 ? 1 : 0,
    });
  }
  particles.value = arr;
};

const render = () => {
  const c = canvasRef.value;
  const cx = ctx.value;
  if (!c || !cx) return;

  cx.clearRect(0, 0, c.width, c.height);

  mouse.x += (mouse.tx - mouse.x) * 0.04;
  mouse.y += (mouse.ty - mouse.y) * 0.04;

  const accent = getAccent();
  const accent2 = getAccent2();
  const lineAlpha = isDark.value ? 0.15 : 0.08;
  const mx = mouse.x * 0.015;
  const my = mouse.y * 0.015;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const pts = particles.value;

  // 连接线
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const ax = (a.x - mx) * dpr;
    const ay = (a.y - my) * dpr;
    for (let j = i + 1; j < pts.length; j++) {
      const b = pts[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < LINK_DISTANCE) {
        cx.beginPath();
        cx.moveTo(ax, ay);
        cx.lineTo((b.x - mx) * dpr, (b.y - my) * dpr);
        cx.strokeStyle = i % 3 === 0 ? accent2 : accent;
        cx.globalAlpha = lineAlpha * (1 - dist / LINK_DISTANCE);
        cx.lineWidth = 0.7 * dpr;
        cx.stroke();
      }
    }
  }

  // 节点
  pts.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.twinklePhase += p.twinkleSpeed;
    p.pulse += 0.02;
    const twinkle = 0.5 + 0.5 * Math.sin(p.twinklePhase);
    const pulseR = p.r + Math.sin(p.pulse) * 0.3;

    if (p.x < -20) p.x = w + 20;
    if (p.x > w + 20) p.x = -20;
    if (p.y < -20) p.y = h + 20;
    if (p.y > h + 20) p.y = -20;

    const px = (p.x - mx) * dpr;
    const py = (p.y - my) * dpr;
    const color = p.colorType ? accent2 : accent;

    cx.beginPath();
    cx.arc(px, py, pulseR * dpr * 4, 0, Math.PI * 2);
    const grad = cx.createRadialGradient(px, py, 0, px, py, pulseR * dpr * 4);
    grad.addColorStop(0, color + (isDark.value ? "50" : "30"));
    grad.addColorStop(1, color + "00");
    cx.fillStyle = grad;
    cx.globalAlpha = twinkle;
    cx.fill();

    cx.beginPath();
    cx.arc(px, py, pulseR * dpr, 0, Math.PI * 2);
    cx.fillStyle = color;
    cx.globalAlpha = p.baseAlpha * twinkle;
    cx.fill();
  });

  cx.globalAlpha = 1;
  rafId = requestAnimationFrame(render);
};

const onMouseMove = (e) => {
  mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
};

let themeObserver = null;
const onThemeChange = () => {
  checkDark();
  particles.value.forEach((p) => {
    p.baseAlpha = isDark.value ? 0.4 + Math.random() * 0.5 : 0.2 + Math.random() * 0.25;
  });
};

const playEntrance = () => {
  gsap.from(".head", {
    scale: 0.6,
    opacity: 0,
    filter: "blur(20px)",
    duration: 1.1,
    ease: "power4.out",
  });
};

onMounted(() => {
  checkDark();
  resizeCanvas();
  ctx.value = canvasRef.value.getContext("2d");
  initParticles();
  render();
  playEntrance();

  themeObserver = new MutationObserver(onThemeChange);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", onMouseMove);
});

onUnmounted(() => {
  cancelAnimationFrame(rafId);
  themeObserver?.disconnect();
  window.removeEventListener("resize", resizeCanvas);
  window.removeEventListener("mousemove", onMouseMove);
});
</script>

<style scoped>
.grain-layer {
  animation: grain-shift 0.5s steps(3) infinite;
}
@keyframes grain-shift {
  0%   { transform: translate(0, 0); }
  33%  { transform: translate(-2%, 1%); }
  66%  { transform: translate(1%, -2%); }
  100% { transform: translate(0, 0); }
}
</style>
