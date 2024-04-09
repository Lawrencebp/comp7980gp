import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userId = ref('')
  const userAvatar = ref('')

  const setUserId = value => {
    userId.value = value
  }

  const removeId = () => {
    userId.value = ''
  }

  const setUserAvatar = value => {
    userAvatar.value = value
  }

  const removeAvatar = () => {
    userAvatar.value = ''
  }

  return {
    userId,
    userAvatar,
    setUserId,
    removeId,
    setUserAvatar,
    removeAvatar
  }
},{
  persist: true
})
