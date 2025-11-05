import { Pages } from '@/enums/pages'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  nickname: '',
  avatar: 'https://nest.nodejs.cn/assets/logo-small-gradient.svg',
  token: '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState, token: uni.getStorageSync('token') })

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
      uni.removeStorageSync('token')
      uni.navigateTo({ url: Pages.Login })
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
