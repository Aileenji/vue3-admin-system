import server from '@/utils/request'
export function getWaterfallList() {
  return server.get('/waterfall/list')
}
