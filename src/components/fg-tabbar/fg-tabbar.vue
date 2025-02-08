<script setup lang="ts">
// unocss icon 默认不生效，需要在这里写一遍才能生效！注释掉也是生效的，但是必须要有！
// i-carbon-code
import { tabBar } from '@/pages.json'
import { tabbarStore } from './tabbar'

/** tabbarList 里面的 path 从 pages.config.ts 得到 */
const tabbarList = tabBar.list.map((item) => ({ ...item, path: `/${item.pagePath}` }))

function selectTabBar({ value: index }: { value: number }) {
  const url = tabbarList[index].path
  tabbarStore.setCurIdx(index)
  uni.switchTab({ url })
}

onLoad(() => {
  // 解决原生 tabBar 未隐藏导致有2个 tabBar 的问题
  uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
      console.log('hideTabBar success: ', res)
    },
  })
})
</script>

<template>
  <wd-tabbar
    fixed
    v-model="tabbarStore.curIdx"
    bordered
    safeAreaInsetBottom
    placeholder
    @change="selectTabBar"
  >
    <block v-for="item in tabbarList" :key="item.path">
      <wd-tabbar-item :title="item.text">
        <template #icon>
          <image :src="item.icon" h-40rpx w-40rpx />
        </template>
      </wd-tabbar-item>
    </block>
  </wd-tabbar>
</template>
