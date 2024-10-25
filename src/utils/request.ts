import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStore } from '@/stores/modules/user'
import { error } from 'console'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: '',
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    if (code == '200') {
      return response.data
    }
    ElMessage.error(msg || '系统出错')
    return Promise.reject(new Error(msg || 'Error'))
  },
  (error: any) => {
    if (error.response.data) {
      const { code, msg } = error.response.data
      if (code === 'A0230') {
        ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        }).then(() => {
          const userStore = useUserStoreHook()
          userStore.resetToken().then(() => {
            location.reload()
          })
        })
      }
    } else {
      ElMessage.error(msg || '系统出错')
    }
    return Promise.reject(error.message)
  },
)

export default service
