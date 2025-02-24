// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/workspace/demo/vue3-admin-system/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.19_sass@1.85.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/workspace/demo/vue3-admin-system/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@5.4.14_@types+node@20.17.19_sass@1.85.0__vue@3.5.13_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/workspace/demo/vue3-admin-system/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.1.1_vite@5.4.14_@types+node@20.17.19_sass@1.85.0__vue@3.5.13_typescript@5.5.4_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///D:/workspace/demo/vue3-admin-system/node_modules/.pnpm/vite-plugin-vue-devtools@7.7.2_@nuxt+kit@3.15.4_rollup@4.34.7_vite@5.4.14_@types+node@20.17.1_llpclwjztlj474yqwuwcg27t6e/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import AutoImport from "file:///D:/workspace/demo/vue3-admin-system/node_modules/.pnpm/unplugin-auto-import@0.18.6_@nuxt+kit@3.15.4_@vueuse+core@11.3.0_vue@3.5.13_typescript@5.5.4___rollup@4.34.7/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/workspace/demo/vue3-admin-system/node_modules/.pnpm/unplugin-vue-components@0.27.5_@babel+parser@7.26.9_@nuxt+kit@3.15.4_rollup@4.34.7_vue@3.5.13_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/workspace/demo/vue3-admin-system/node_modules/.pnpm/unplugin-vue-components@0.27.5_@babel+parser@7.26.9_@nuxt+kit@3.15.4_rollup@4.34.7_vue@3.5.13_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/resolvers.js";
import IconsResolver from "file:///D:/workspace/demo/vue3-admin-system/node_modules/.pnpm/unplugin-icons@22.1.0_@vue+compiler-sfc@3.5.13/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_import_meta_url = "file:///D:/workspace/demo/vue3-admin-system/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      /* 自动导入vue相关函数 */
      imports: ["vue", "@vueuse/core"],
      /* 自动导入element plus相关函数 */
      resolvers: [ElementPlusResolver(), IconsResolver({})],
      dts: false
      // dts: 'src/typings/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ["src/components", "src/**/components"],
      dts: false
      // dts: 'src/typings/components.d.ts',
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3Jrc3BhY2VcXFxcZGVtb1xcXFx2dWUzLWFkbWluLXN5c3RlbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya3NwYWNlXFxcXGRlbW9cXFxcdnVlMy1hZG1pbi1zeXN0ZW1cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dvcmtzcGFjZS9kZW1vL3Z1ZTMtYWRtaW4tc3lzdGVtL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcidcblxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlSnN4KCksXG4gICAgdnVlRGV2VG9vbHMoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIC8qIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NXZ1ZVx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MCAqL1xuICAgICAgaW1wb3J0czogWyd2dWUnLCAnQHZ1ZXVzZS9jb3JlJ10sXG4gICAgICAvKiBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVlbGVtZW50IHBsdXNcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzAgKi9cbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKSwgSWNvbnNSZXNvbHZlcih7fSldLFxuICAgICAgZHRzOiBmYWxzZSxcbiAgICAgIC8vIGR0czogJ3NyYy90eXBpbmdzL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICB9KSxcblxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnLCAnc3JjLyoqL2NvbXBvbmVudHMnXSxcbiAgICAgIGR0czogZmFsc2UsXG4gICAgICAvLyBkdHM6ICdzcmMvdHlwaW5ncy9jb21wb25lbnRzLmQudHMnLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtUyxTQUFTLGVBQWUsV0FBVztBQUV0VSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBQ3BDLE9BQU8sbUJBQW1CO0FBVDJKLElBQU0sMkNBQTJDO0FBWXRPLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQTtBQUFBLE1BRVQsU0FBUyxDQUFDLE9BQU8sY0FBYztBQUFBO0FBQUEsTUFFL0IsV0FBVyxDQUFDLG9CQUFvQixHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFBQSxNQUNwRCxLQUFLO0FBQUE7QUFBQSxJQUVQLENBQUM7QUFBQSxJQUVELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLE1BQ2pDLE1BQU0sQ0FBQyxrQkFBa0IsbUJBQW1CO0FBQUEsTUFDNUMsS0FBSztBQUFBO0FBQUEsSUFFUCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
