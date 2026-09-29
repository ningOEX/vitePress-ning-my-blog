<template>
  <div ref="cardRef"
    class="sidebar-card relative flex rounded-xl overflow-hidden
      bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10
      shadow-lg hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-shadow duration-500">
    <!-- 头像区 -->
    <div ref="avatarRef" class="avatar-wrap w-2/5 p-4 flex items-center justify-center">
      <div class="avatar-ring relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" class="avatar-svg">
          <defs>
            <filter id="f6">
              <feTurbulence baseFrequency="0.05 0.5" result="img1">
                <animate attributeType="XML" attributeName="baseFrequency" from="0.05 0.5" to="0.15 0.25" dur="100s" fill="freeze" repeatDur="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="img" xChannelSelector="R" yChannelSelector="G" scale="8">
                <animate attributeType="XML" attributeName="scale" from="8" to="1" dur="2s" repeatCount="1" fill="freeze"/>
              </feDisplacementMap>
            </filter>
            <clipPath id="rounded-clip"><rect x="0" y="0" width="90" height="90" rx="12" ry="12"/></clipPath>
          </defs>
          <image href="https://avatars.githubusercontent.com/u/52589990?v=4" height="90" width="90" filter="url(#f6)" clip-path="url(#rounded-clip)" preserveAspectRatio="xMidYMid slice" />
        </svg>
        <span class="absolute inset-0 rounded-xl border-2 border-cyan-400/30 rotate-0 hover:rotate-3 transition-transform duration-500"></span>
      </div>
    </div>

    <!-- 信息区 -->
    <div class="info-wrap w-3/5 p-4 grid grid-cols-1 gap-2 content-center">
      <p ref="nameRef" class="name-text text-base font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1">
        <i class="fa-solid fa-terminal text-cyan-400 text-xs"></i>
        NING OEX
      </p>
      <p ref="sloganRef" class="slogan-text text-xs text-gray-500 dark:text-gray-400">不积跬步无以至千里</p>
      <div ref="statsRef" class="stats-grid grid grid-cols-2 gap-1 mt-1 text-center text-xs">
        <span class="text-gray-500 dark:text-gray-400">日记总量</span>
        <span class="text-gray-500 dark:text-gray-400">月更新+</span>
        <span ref="countRef" class="text-fuchsia-400 font-bold text-base tabular-nums">{{ totalArticles }}</span>
        <span class="text-cyan-400 font-bold text-base">{{ monthlyUpdates }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const cardRef = ref(null);
const avatarRef = ref(null);
const nameRef = ref(null);
const sloganRef = ref(null);
const statsRef = ref(null);
const countRef = ref(null);
const totalArticles = ref(0);
const monthlyUpdates = ref(0);
let ctx = null;

const getCurrentDate = (timestamp) => {
  const d = timestamp ? new Date(timestamp) : new Date();
  return d.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });
};
const isSameMonth = (d1, d2) => {
  const a = new Date(d1), b = new Date(d2);
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
};

const animateCount = (target) => {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 1.5,
    ease: "power2.out",
    delay: 2.2,
    onUpdate: () => { totalArticles.value = Math.round(obj.val); },
  });
};

onMounted(async () => {
  try {
    const modules = import.meta.glob("../../**/*.md", { eager: true });
    const count = Object.keys(modules).length;
    const currentDate = getCurrentDate();
    let mCount = 0;
    Object.keys(modules).forEach((fp) => {
      const { lastUpdated } = modules[fp].__pageData;
      if (isSameMonth(currentDate, getCurrentDate(lastUpdated))) mCount++;
    });
    monthlyUpdates.value = mCount;
    animateCount(count);
  } catch (e) { console.error(e); }

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 2.0 });
    tl.from(cardRef.value, { x: 80, opacity: 0, duration: 0.7, ease: "power3.out" })
      .from(avatarRef.value, { scale: 0, rotate: -180, duration: 0.6, ease: "back.out(2)" }, "-=0.3")
      .from([nameRef.value, sloganRef.value], { x: 30, opacity: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }, "-=0.2")
      .from(statsRef.value, { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.1");
  });
});

onUnmounted(() => ctx?.revert());
</script>

<style scoped>
.avatar-ring:hover .avatar-svg { filter: drop-shadow(0 0 8px rgba(34,211,238,0.4)); transition: filter 0.3s; }
</style>
