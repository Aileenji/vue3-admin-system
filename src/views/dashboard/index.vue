<template>
  <div class="container">
    <VideoPlayer
      url="https://chsvideo.shaobing.ltd/0402b05801806332/1.flv?appId=bjch20211215&datetime=20250224T104208&sign=1d8968e08e73156a6b392534397173a"
    />
  </div>
</template>

<script setup lang="ts">
import VideoPlayer from '@/components/waterMark/VideoPlayer.vue'
function sum(...args) {
  console.log('code line-11 \n\r😅 args:\n\r', args)

  let total = 0
  total += args.reduce((acc, val) => acc + val, 0)

  function innerSum(...newArgs) {
    console.log('code line-17 \n\r😆 newArgs:\n\r', newArgs)

    total += newArgs.reduce((acc, val) => acc + val, 0)
    return innerSum
  }
  innerSum.value = () => {
    return total
  }
  return innerSum
}
// sum(1, 2, 3, 4, 5)(1)
console.log(
  'code line-27 \n\r😉 sum(1, 2, 3, 4, 5)(1):\n\r',
  sum(1, 2, 3, 4, 5)(1)(1, 2, 3, 4, 5).value(),
)
</script>
<style scoped>
.container {
  width: 80vh;
  height: 80vh;
  background-color: aqua;
}
</style>
