<script lang="ts" setup>
import { useTabbar } from './hook'
import AddBillsDialog from './AddBillsDialog.vue'

// 核心切换 tabbar 能力
const show = ref(false)
const { currentTabbar, selectTabBar, tabbarList } = useTabbar(() => {
  show.value = true
})

const TabbarIcons = {
  home: 'i-carbon-home',
  chart: 'i-carbon-chart-line-smooth',
  list: 'i-carbon-list',
  user: 'i-carbon-user',
  add: 'i-carbon-add',
}
</script>

<template>
  <wd-tabbar
    custom-class="accounting-tabbar"
    fixed
    shape="round"
    :modelValue="currentTabbar"
    bordered
    safeAreaInsetBottom
    placeholder
    @change="selectTabBar"
  >
    <wd-tabbar-item
      :custom-class="`tabbar-item-${i.name}`"
      :name="i.name"
      :title="i.text"
      v-for="i in tabbarList"
      :key="i.name"
    >
      <template #icon>
        <view
          :class="`mb-4 ${i.name === 'add' ? 'color-white fs-64' : ''} ${currentTabbar === i.name ? 'color-[var(--app-primary-color)]' : 'color-gray-700'}`"
        >
          <text :class="TabbarIcons[i.icon]"></text>
        </view>
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
  <AddBillsDialog v-model="show" />
</template>
