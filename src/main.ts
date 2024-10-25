import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { setupStore } from './stores'

/* element plus */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
/* 全局注册store */
setupStore(app)

app.use(router).use(ElementPlus).mount('#app')
