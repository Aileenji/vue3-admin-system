import { createRouter, createWebHistory } from 'vue-router'

const Layout = () => import('@/layout/Index.vue')

/* 静态路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'homepage',
          affix: true,
          KeepAlive: false,
          alwaysShow: false,
        },
      },
    ],
  },
]

/* 创建路由 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

/* 重置路由 */
export function resetRouter() {
  router.replace({ path: '/login' })
}

export default router
