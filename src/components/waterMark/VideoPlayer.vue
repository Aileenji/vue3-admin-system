<template>
  <video
    class="wh100"
    style="background-color: #000"
    v-if="videoType === 'mp4'"
    autoplay
    controls
    muted
    :loop="true"
    :src="props.url"
  />
  <div class="watermark">{{ textContent }}</div>
  <div
    v-if="videoType === 'flv'"
    :class="className + ' radius5'"
    :id="props.id"
    ref="container"
    style="background-color: black"
  />
  <div style="margin-top: 5px">
    <el-button type="primary" @click="takeScreenshot">截屏</el-button>
    <el-button type="primary" @click="startRecording">开始录制</el-button>
    <el-button type="primary" @click="stopRecording">结束录制</el-button>
  </div>
</template>
<script setup lang="ts">
import { fixWebmDuration } from '@fix-webm-duration/fix'
const emit = defineEmits()
const props = defineProps({
  url: {
    type: String,
    default: '',
  },
  isResize: {
    type: Boolean,
    default: () => true,
  },
  isFullResize: {
    type: Boolean,
    default: () => false,
  },
  id: {
    type: String,
    default: 'container',
  },
  className: {
    type: String,
    default: '',
  },
  isNotMute: {
    type: Boolean,
    default: () => false,
  },
})

const player = ref<any>()
const container = ref()
const videoType = ref('')
const textContent = ref('22222')
let recordedChunks = reactive<any>([])
let mediaRecorder = reactive<any>(null)
const duration = ref<any>(0)
const startTime = ref<any>(0)
function playAbxVideo() {
  if (!props.url) return
  if (props.url.includes('.mp4')) return (videoType.value = 'mp4')
  videoType.value = 'flv'

  destroyAbxPlayers()
  initAbxPlayer().then((res: any) => {
    console.log('code line-60 \n\r😀 res:\n\r', res)
    res.play(props.url)
  })
}
function initAbxPlayer() {
  return new Promise(resolve => {
    nextTick(() => {
      player.value = new window.Jessibuca(
        Object.assign({
          container: container.value,
          videoBuffer: 1, // 缓存时长
          isResize: props.isResize, //等比填充
          isFullResize: props.isFullResize, //是否铺满全屏
          useWCS: true,
          useMSE: false,
          text: '',
          //   background: "bg.jpg",
          loadingText: '疯狂加载中...',
          // hasAudio:false,
          debug: false,
          decoder: `http://localhost:5173/video/decoder.js`,
          supportDblclickFullscreen: true,
          showBandwidth: true, // 显示网速
          operateBtns: {
            fullscreen: true,
            screenshot: false,
            play: true,
            audio: true,
          },
          vod: false,
          forceNoOffscreen: true,
          isNotMute: props.isNotMute, //是否静音
          timeout: 10,
          scale: 1,
          playing: false,
        }),
      )
      resolve(player.value)
    })
  })
}
function destroyAbxPlayers() {
  if (player.value?.player) {
    player.value?.destroy()
    player.value = null
  }
}
function takeScreenshot() {
  console.log(
    'takeScreenshot',
    container.value.getElementsByTagName('canvas')[0],
  )

  const canvas = document.createElement('canvas')
  canvas.width = container.value.offsetWidth
  canvas.height = container.value.offsetHeight
  const ctx: any = canvas.getContext('2d')
  ctx.drawImage(
    container.value.getElementsByTagName('canvas')[0],
    0,
    0,
    canvas.width,
    canvas.height,
  )
  ctx.font = '24px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(
    textContent.value,
    canvas.width / 2 - (textContent.value.length || 0) * 6,
    canvas.height / 2 + 10,
  )
  const link = document.createElement('a')
  link.href = canvas.toDataURL('image/png')
  link.download = 'screenshot.png'
  link.click()
}
function startRecording() {
  recordedChunks = []
  const canvas = document.createElement('canvas')
  canvas.width = container.value.offsetWidth
  canvas.height = container.value.offsetHeight
  const ctx = canvas.getContext('2d')
  const canvasStream = canvas.captureStream() //创建一个实时视频捕获的画布
  mediaRecorder = new MediaRecorder(canvasStream)
  mediaRecorder.ondataavailable = (event: any) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data)
    }
  }
  mediaRecorder.start()

  startTime.value = Date.now()
  console.log('code line-149 \n\r😄 startTime.value:\n\r', startTime.value)

  drawFrame(ctx, canvas)
}

function drawFrame(ctx: any, canvas: any) {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    ctx.drawImage(
      container.value.getElementsByTagName('canvas')[0],
      0,
      0,
      canvas.width,
      canvas.height,
    )
    ctx.font = '24px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText(
      textContent.value,
      canvas.width / 2 - (textContent.value.length || 0) * 6,
      canvas.height / 2 + 10,
    )
    requestAnimationFrame(() => drawFrame(ctx, canvas))
  }
}

async function stopRecording() {
  mediaRecorder.stop()
  mediaRecorder.onstop = async () => {
    duration.value = Date.now() - startTime.value
    console.log('code line-187 \n\r😄 duration.value:\n\r', duration.value)

    const blob = new Blob(recordedChunks, { type: 'video/webm' })
    const newBlob = await fixWebmDuration(blob, duration.value)
    const url = URL.createObjectURL(newBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'recording.webm'
    link.click()
  }
}
playAbxVideo()

onBeforeUnmount(() => {
  //组件销毁时将url清空，防止在历史/超时未处理模块查看普通报警的详情后在SOS详情页还有url的数据
  emit('update:url', '')
  destroyAbxPlayers()
})
defineExpose({ destroyAbxPlayers })
</script>
<style scoped>
.container {
  background-color: black;
  width: 100%;
  height: 100%;
}
.watermark {
  position: absolute;
  z-index: 9999;
  color: white;
  font-size: 20px;
}
</style>
