<template>
  <div class="flex justify-around max-h-36 rounded-sm bg-neutral-50 dark:bg-neutral-800 dark:text-gray-50 shadow-md shadow-gray-400 " style="border-radius: 5px">
    <div class="w-1/2 mx-auto p-2 pl-5 pt-5">
      <svg xmlns="http://www.w3.org/2000/svg" width="105" height="105">
        <defs>
          <filter id="f6">
            <feTurbulence baseFrequency="0.05 0.5" result="img1">
              <animate attributeType="XML" attributeName="baseFrequency" from="0.05 0.5" to="0.15 0.25" dur="100s"
                       fill="freeze" repeatDur="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="img" xChannelSelector="R" yChannelSelector="G" scale="10">
              <animate attributeType="XML"
                       attributeName="scale"
                       from="10" to="1"
                       dur="2s"
                       repeatCount="1"
                       fill="freeze"/>
            </feDisplacementMap>
            <feDropShadow dx="3" dy="3" stdDeviation="0.2" flood-color="#ffc"></feDropShadow>
          </filter>
          <clipPath id="rounded">
            <rect x="0" y="0" width="100" height="100" rx="10" ry="10"/>
          </clipPath>
        </defs>
        <image href="https://avatars.githubusercontent.com/u/52589990?v=4" height="100" width="100" filter="url(#f6)" clip-path="url(#rounded)" preserveAspectRatio="xMidYMid slice" />
      </svg>
    </div>
    <div class="w-2/3 p-4 grid grid-cols-1 grid-rows-1 gap-6 bg">
      <span class="text-sm flex items-center mt-4">NING OEX</span>
      <span class="text-xs">不积跬步无以至千里</span>
      <div class="grid grid-cols-2 grid-rows-2 items-center text-center text-xs gap-2">
        <span>日记总量</span>
        <span>月更新+</span>
        <span class="text-[#9facba]">{{ totalArticles }}</span>
        <span class="text-[#9facba] cursor-pointer" >{{ monthlyUpdates }}</span>
      </div>
    </div>
  </div>
</template>

<script setup >
import { ref, onMounted } from "vue";


// 响应式变量
const totalArticles = ref(0);
const monthlyUpdates = ref(0);

// 获取时间，以及转换时间戳
const getCurrentDate = (timestamp )=>{
  let currentDate;
  if(timestamp){
    currentDate = new Date(timestamp);
  }else{
    currentDate = new Date();
  }
  return currentDate.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

// 对比时间 是否等于当月
const isSameMonth = (date1 , date2 )=> {
  // 创建 Date 对象
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  // 比较年份和月份
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
}

onMounted(async () => {
  monthlyUpdates.value = 0
  try {
    const currentDate = getCurrentDate() // 得到当前日期
    const modules = import.meta.glob('../**/*.md', { eager: true }); // 导入所有 Markdown 文件

    totalArticles.value = Object.keys(modules).length;  // 统计 Markdown 文件数量
    // 遍历所有文件获元数据
    Object.keys(modules).forEach((filePath) => {
      const fileStat = modules[filePath]; // 获取头部元数据
      const {lastUpdated} = fileStat.__pageData // 最后更新时间
      const formattedDate = getCurrentDate(lastUpdated) // 转换时间戳
      const isCurrentDate = isSameMonth(currentDate,formattedDate) // 对比是否等于当月更新
      if(isCurrentDate){
        // 当月更新日记统计
        // monthlyUpdates.value++
      }
    });

  } catch (error) {
    console.error("Error fetching articles:", error);
  }
});
</script>

<style>

</style>

