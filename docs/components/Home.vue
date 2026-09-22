<template>
  <div>
    <Layout />
  </div>
</template>

<script setup>
import {onMounted,ref,onUnmounted,shallowRef} from "vue"
import video_src from "../images/mmw.mp4"

const ctxInfo = shallowRef(null)
let canvas = null
const vid = ref(null)

const sizeInfo = ref({
  width:1920,
  height:1080
})

onMounted(()=>{
  createVideo()
  createCanvas()
})

onUnmounted(() => {
  canvas?.remove()
  canvas = null
  ctxInfo.value = null
})

const createVideo = ()=>{
  const video = document.createElement('video')
  video.src = video_src
  video.width = window.innerWidth
  video.autoplay = true //加载一点就播放
  video.loop = true //循环播放
  video.muted = true // 静音
  video.play() // 播放
  vid.value = video
  video.addEventListener('play',function (){
    draw()
  })
}

const draw = ()=>{
  if(!ctxInfo.value) return
  ctxInfo.value.clearRect(0,0,sizeInfo.value.width,sizeInfo.value.height)
  ctxInfo.value.drawImage(vid.value,0,0,sizeInfo.value.width,sizeInfo.value.height)
  requestAnimationFrame(draw)
}

const createCanvas = ()=>{
  canvas = document.createElement('canvas')
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '-1',
    pointerEvents: 'none', // 避免遮挡交互
  })
  canvas.width = sizeInfo.value.width
  canvas.height = sizeInfo.value.height
  document.body.append(canvas)
  ctxInfo.value = canvas.getContext('2d')
}


</script>

<style>
.a{
  position: fixed;
}
</style>
