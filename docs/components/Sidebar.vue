<template>
  <div class="flex justify-around max-h-36 shadow-lg" style="border-radius: 5px">
    <div class="w-1/2 mx-auto p-2 pl-5 pt-5">
      <img class="w-28 hover:animate-spin" style="border-radius: 20px" src="../images/logo.png" alt="" />
    </div>
    <div class="w-2/3 p-4 grid grid-cols-1 grid-rows-1 gap-6">
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
        monthlyUpdates.value++
        // currentDateList.value.push({date:formattedDate,title:fileStat.__pageData.description,link:fileStat.__pageData.filePath})
      }
    });

  } catch (error) {
    console.error("Error fetching articles:", error);
  }
});
</script>

<style>

</style>

