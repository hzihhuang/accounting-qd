import { Pages } from '@/enums/pages'
import { useUserStore } from '@/store'
import { httpPost } from '@/utils/http'
import { useToast } from 'wot-design-uni'

const useLogin = (user: { username: string; password: string }) => {
  const toast = useToast()
  const { setUserInfo } = useUserStore()

  return () => {
    httpPost('auth/login', user)
      .then((res: any) => {
        uni.setStorageSync('token', res.token)
        setUserInfo({
          token: res.token,
          username: user.username,
          // 使用env中的头像
          avatar: res.avatar ?? 'https://nest.nodejs.cn/assets/logo-small-gradient.svg',
          nickname: res.nickname ?? user.username,
        })
        // 跳转首页
        uni.switchTab({ url: Pages.Home })
        toast.success('登录成功')
      })
      .catch((err) => {
        toast.error(err.data.message)
      })
  }
}

export default useLogin
