

import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia()
store.use(piniaPluginPersistedstate)

/**
 * @description: 全局注册store
 * @param {App} app
 * @return {*}
 */
export function setupStore(app: App<Element>) {
  app.use(store)
}
export { store }
