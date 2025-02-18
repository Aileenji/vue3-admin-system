declare global {
  interface AppSetting {
    /** 语言( zh-cn| en) */
    language: string
    /* 字号 */
    size: number
  }
  interface IWaterFallProps {
    gap: number // 卡片间隔
    column: number // 瀑布流列数
    bottom: number // 距底距离（触底加载更多）
    pageSize: number
    request: (page: number, pageSize: number) => Promise<ICardItem[]>
  }

  interface ICardItem {
    id: string | number
    url: string
    width: number
    height: number
    [key: string]: any
  }

  // 单个卡片计算的位置信息，设置样式
  interface ICardPos {
    width: number
    height: number
    x: number
    y: number
  }
  export interface IBookCardPos {
    width: number
    imageHeight: number
    cardHeight: number
    x: number
    y: number
  }
}
export {}
