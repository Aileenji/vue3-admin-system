import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import defaultSettings from '@/setting'

// 导入 Element Plus 中英文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

export const useAppAStore = defineStore('app', () => {
  /* 语言 */
  const language = useStorage('language', defaultSettings.language)
  /* 字号 */
  const size = useStorage('size', defaultSettings.size)
  /* 根据语言表示选择对应语言包 */
  const locale = computed(() => {
    if (language?.value == 'en') {
      return en
    } else {
      return zhCn
    }
  })
  return {
    language,
    locale,
    size
  }
})
