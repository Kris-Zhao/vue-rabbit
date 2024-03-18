import { defineStore } from "pinia";
import { ref } from "vue";
import { userAPI } from '@/apis/user';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})

  const getUserInfo = async ({ account, password }) => {
    const res = await userAPI({ account, password })
    userInfo.value = res.result
  }

  const clearUserInfo = () => {
    userInfo.value = {}
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true
})