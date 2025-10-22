// 根据角色动态生成路由
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/tags',
    method: 'get',
    response: ({ body }) => {
      return {
        success: true,
        data: [
          {
            id: 1,
            name: '餐饮',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'expense',
          },
          {
            id: 2,
            name: '房租',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'expense',
          },
          {
            id: 3,
            name: '交通',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'expense',
          },
          {
            id: 4,
            name: '工资',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'income',
          },
          {
            id: 5,
            name: '兼职',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'income',
          },
        ],
      }
    },
  },
])
