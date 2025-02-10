import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  nickname: '名字',
  avatar: 'https://nest.nodejs.cn/assets/logo-small-gradient.svg',
  token: uni.getStorageSync('token') || '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }

    const isLogined = computed(() => !!userInfo.value.token)

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
    }
  },
  {
    persist: true,
  },
)
