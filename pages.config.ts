import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#fff', // 导航栏背景颜色
  },
  pages: [],
  tabBar: {
    custom: true,
    color: '#999',
    selectedColor: '#007AFF',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        icon: 'home',
        name: 'home',
      },
      {
        pagePath: 'pages/chart/index',
        text: '图表',
        icon: 'chart',
        name: 'chart',
      },
      {
        pagePath: 'pages/bills/index',
        text: '账单',
        icon: 'list',
        name: 'bills',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        icon: 'user',
        name: 'my',
      },
    ],
  },
})
