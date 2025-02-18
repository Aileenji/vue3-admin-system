<template>
  <div class="fs-waterfall-container" ref="containerRef" @scroll="handleScroll">
    <div class="fs-waterfall-list" ref="listRef">
      <div
        class="fs-waterfall-item"
        v-for="(item, index) of state.cardList"
        :key="item.id"
        :style="{
          width: `${state.cardPos[index].width}px`,
          transform: `translate(${state.cardPos[index].x}px, ${state.cardPos[index].y}px)`,
        }"
      >
        <!-- <img
          :src="item.note_card.cover.url_pre"
          alt=""
          style="width: 100%; border-radius: 10px"
        /> -->
        <slot
          name="item"
          :item="item"
          :index="index"
          :imageHeight="state.cardPos[index].imageHeight"
        ></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { debounce, rafThrottle } from '@/utils/tool'

const props = defineProps({
  column: {
    type: Number,
    default: 3,
  }, // 列数
  gap: {
    type: Number,
    default: 10,
  }, // 卡片间距
  request: {
    type: Function,
    default: () => {},
  }, // 请求数据方法
  pageSize: {
    type: Number,
    default: 10,
  }, // 每页请求数据条数
  bottom: {
    type: Number,
    default: 20,
  }, // 距离底部多少距离触发加载
})
const containerRef = ref<HTMLDivElement | null>(null) // 绑定 template 上的 container，需要容器宽度
const listRef = ref<HTMLDivElement | null>(null)
const state = reactive({
  isFinish: false, // 判断是否已经没有数据，后续不再发送请求
  page: 1,
  cardWidth: 0, // // 容器内卡片宽度
  cardList: [] as ICardItem[], // 卡片数据源
  cardPos: [] as IBookCardPos[], // 卡片摆放位置信息
  columnHeight: new Array(props.column).fill(0) as number[], // 存储每列的高度，进行初始化操作
  loading: false, // 是否正在加载数据
  preLen: 0,
})
const minColumn = computed(() => {
  let minIndex = -1,
    minHeight = Infinity

  state.columnHeight.forEach((item, index) => {
    if (item < minHeight) {
      minHeight = item
      minIndex = index
    }
  })

  return {
    minIndex,
    minHeight,
  }
})
const resizeObserver = new ResizeObserver(() => {
  handleResize()
})
watch(
  () => props.column,
  () => {
    handleResize()
  },
)

/* 获取列表数据 */
const getCardList = async (page: number, pageSize: number) => {
  if (state.isFinish) return
  state.loading = true
  const data = await props.request(page, pageSize)
  // const { data } = await getWaterfallList()
  state.page++
  if (!data.length) {
    state.isFinish = true
    return
  }
  state.cardList = [...state.cardList, ...data]
  computedCardPos(data) // key：根据请求的数据计算卡片位置
  state.loading = false
}
const computedImageHeight = (list: ICardItem[]) => {
  list.forEach(item => {
    const imageHeight = Math.floor(
      (item.note_card.cover.height * state.cardWidth) /
        item.note_card.cover.width,
    )
    state.cardPos.push({
      width: state.cardWidth,
      imageHeight: imageHeight,
      cardHeight: 0,
      x: 0,
      y: 0,
    })
  })
}
const computedRealDomPos = (list: ICardItem[]) => {
  const children = listRef.value!.children
  list.forEach((_, index) => {
    const nextIndex = state.preLen + index
    const cardHeight = children[nextIndex].getBoundingClientRect().height
    console.log(
      'code line-124 \n\r😂 cardHeight:\n\r',
      nextIndex * (state.cardWidth + props.gap),
    )

    if (index < props.column && state.cardList.length <= props.pageSize) {
      state.cardPos[nextIndex] = {
        ...state.cardPos[nextIndex],
        cardHeight: cardHeight,
        x:
          nextIndex % props.column !== 0
            ? nextIndex * (state.cardWidth + props.gap)
            : 0,
        y: 0,
      }
      state.columnHeight[nextIndex] = cardHeight + props.gap
    } else {
      const { minIndex, minHeight } = minColumn.value
      state.cardPos[nextIndex] = {
        ...state.cardPos[nextIndex],
        cardHeight: cardHeight,
        x: minIndex ? minIndex * (state.cardWidth + props.gap) : 0,
        y: minHeight,
      }
      state.columnHeight[minIndex] += cardHeight + props.gap
    }
  })
  console.log('list', state.cardPos)
  state.preLen = state.cardPos.length
}
const computedCardPos = async (list: ICardItem[]) => {
  computedImageHeight(list)
  await nextTick()
  computedRealDomPos(list)
}
const handleScroll = rafThrottle(() => {
  const { scrollTop, scrollHeight, clientHeight } = containerRef.value!
  const bottom = scrollHeight - scrollTop - clientHeight
  if (bottom <= props.bottom) {
    !state.loading && getCardList(state.page, props.pageSize)
  }
})
const init = () => {
  if (containerRef.value) {
    const containerWidth = containerRef.value.clientWidth
    state.cardWidth =
      (containerWidth - props.gap * (props.column - 1)) / props.column
    getCardList(state.page, props.pageSize)
    resizeObserver.observe(containerRef.value)
  }
}
const handleResize = debounce(() => {
  const containerWidth = containerRef.value!.clientWidth
  state.cardWidth =
    (containerWidth - props.gap * (props.column - 1)) / props.column
  state.columnHeight = new Array(props.column).fill(0)
  state.cardPos = []
  state.preLen = 0
  computedCardPos(state.cardList)
})

onMounted(() => {
  init()
})
onUnmounted(() => {
  containerRef.value && resizeObserver.unobserve(containerRef.value)
})
</script>
<style scoped lang="scss">
.fs-waterfall {
  &-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll; // 注意需要提前设置展示滚动条，如果等数据展示再出现滚动造成计算偏差
    overflow-x: hidden;
    background-color: antiquewhite;
  }

  &-list {
    width: 100%;
    position: relative;
  }
  &-item {
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
  }
}
</style>
