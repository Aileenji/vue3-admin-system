import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const user = {
    roles: [],
    perms: [],
  }

  const token = useStorage('accessToken', '')

  function resetToken() {
    token.value = ''
  }
  return {
    user,
    token,
    resetToken,
  }
})
