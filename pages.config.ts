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
  pages: [
    {
      path: 'pages/home/index',
      style: {
        navigationBarTitleText: '首页',
      },
    },
    {
      path: 'pages/chart/index',
      style: {
        navigationBarTitleText: '图表',
      },
    },
  ],
  tabBar: {
    color: '#999',
    selectedColor: '#007AFF',
    backgroundColor: '#fff',
    borderStyle: 'black',
    height: '120rpx',
    fontSize: '20rpx',
    iconWidth: '50rpx',
    spacing: '4rpx',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/home-fill.png',
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar/chart.png',
        selectedIconPath: 'static/tabbar/chart-fill.png',
        pagePath: 'pages/chart/index',
        text: '图表',
      },
      {
        iconPath: 'static/tabbar/bills.png',
        selectedIconPath: 'static/tabbar/bills-fill.png',
        pagePath: 'pages/bills/index',
        text: '账目',
      },
      {
        iconPath: 'static/tabbar/my.png',
        selectedIconPath: 'static/tabbar/my-fill.png',
        pagePath: 'pages/my/index',
        text: '我的',
      },
    ],
  },
})
