// 根据角色动态生成路由
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/auth/login',
    method: 'post',
    response: ({ body }) => {
      return {
        success: true,
        data: {
          token: 'asdfghjkl', // 生成token
          user: {
            username: 'common',
            avatar: 'https://avatars.githubusercontent.com/u/52823142',
            nickname: '小林',
          },
        },
      }
    },
  },
  {
    url: '/auth/register',
    method: 'post',
    response: ({ body }) => {
      return {
        success: true,
        code: 200,
        data: {
          token: 'asdfghjkl', // 生成token
          user: {
            username: 'common',
            nickname: '小林',
          },
        },
      }
    },
  },
])
