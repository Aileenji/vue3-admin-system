<script setup lang="ts">
import FsBookCard from '@/components/waterfall/FsBookCard.vue'
import Waterfall from '@/components/waterfall/Waterfall.vue'
import { getWaterfallList } from '@/api/waterfallApi'

const column = ref(4)
const fContainerRef = ref<HTMLDivElement | null>(null)
const fContainerObserver = new ResizeObserver(entries => {
  changeColumn(entries[0].target.clientWidth)
})
const changeColumn = (width: number) => {
  if (width > 960) {
    column.value = 5
  } else if (width >= 690 && width < 960) {
    column.value = 4
  } else if (width >= 500 && width < 690) {
    column.value = 3
  } else {
    column.value = 2
  }
}
const getData = async (page: number, pageSize: number) => {
  const { data } = await getWaterfallList()

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
      )
    }, 1000)
  })
}

onMounted(() => {
  fContainerRef.value && fContainerObserver.observe(fContainerRef.value)
})

onUnmounted(() => {
  fContainerRef.value && fContainerObserver.unobserve(fContainerRef.value)
})
</script>

<template>
  <div class="app">
    <div class="container" ref="fContainerRef">
      <Waterfall
        :bottom="20"
        :column="column"
        :gap="10"
        :page-size="10"
        :request="getData"
      >
        <template #item="{ item, imageHeight }">
          
          <FsBookCard
            :detail="{
              imageHeight,
              item,
            }"
          >
          </FsBookCard>
        </template>
      </Waterfall>
    </div>
  </div>
  <!-- <Waterfall /> -->
</template>
<style scoped lang="scss">
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    width: 1400px;
    height: 600px;
    border: 1px solid red;
  }
  .card-box {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>
