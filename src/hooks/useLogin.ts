import { Pages } from '@/enums/pages'
import { useUserStore } from '@/store'
import { showToast } from '@/utils/globalToast'
import { httpPost } from '@/utils/http'

const useLogin = (user: { username: string; password: string }) => {
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
        showToast().success('登录成功')
      })
      .catch((err) => {
        showToast().error(err.data.message)
      })
  }
}

export default useLogin
