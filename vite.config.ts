import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      /* 自动导入vue相关函数 */
      imports: ['vue', '@vueuse/core'],
      /* 自动导入element plus相关函数 */
      resolvers: [ElementPlusResolver()],
      dts: false,
      // dts: 'src/typings/auto-imports.d.ts',
    }),

    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components', 'src/**/components'],
      dts: false,
      // dts: 'src/typings/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
