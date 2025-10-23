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
          {
            id: 6,
            name: '日用',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'expense',
          },
          {
            id: 7,
            name: '蔬菜',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'expense',
          },
          {
            id: 8,
            name: '水果',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'expense',
          },
          {
            id: 9,
            name: '零食',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'expense',
          },
          {
            id: 10,
            name: '房租',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'expense',
          },
          {
            id: 11,
            name: '娱乐',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'expense',
          },
          {
            id: 12,
            name: '通讯',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'expense',
          },
          {
            id: 13,
            name: '服饰',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'expense',
          },
          {
            id: 14,
            name: '美容',
            img: 'https://avatars.githubusercontent.com/u/52823142',
            type: 'expense',
          },
        ],
      }
    },
  },
  {
    url: '/bills',
    method: 'get',
    response: ({ body }) => {
      return {
        success: true,
        data: {
          list: [
            {
              id: 1,
              type: 'expense',
              price: 100,
              remark: '无',
              date: new Date().toLocaleDateString(),
              tag: {
                id: 3,
                name: '交通',
                img: 'https://avatars.githubusercontent.com/u/52823142',
              },
            },
            {
              id: 2,
              type: 'expense',
              price: 100,
              remark: '无',
              date: new Date().toLocaleDateString(),
              tag: {
                id: 3,
                name: '交通',
                img: 'https://avatars.githubusercontent.com/u/52823142',
              },
            },
            {
              id: 3,
              type: 'income',
              price: 100,
              remark: '无',
              date: new Date().toLocaleDateString(),
              tag: {
                id: 3,
                name: '交通',
                img: 'https://avatars.githubusercontent.com/u/52823142',
              },
            },
          ],
        },
      }
    },
  },
])
