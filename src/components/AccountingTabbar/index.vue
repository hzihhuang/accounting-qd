<script lang="ts" setup>
import { useTabbar } from './hook'
import AddBillsDialog from './AddBillsDialog.vue'
import { faHouse, faChartBar, faBookOpen, faUser, faAdd } from '@fortawesome/free-solid-svg-icons'
import Icon from '../Icon.vue'

const TabbarIcons = {
  home: faHouse,
  chart: faChartBar,
  list: faBookOpen,
  user: faUser,
  add: faAdd,
}

// 核心切换 tabbar 能力
const show = ref(false)
const { currentTabbar, selectTabBar, tabbarList } = useTabbar(() => {
  show.value = true
})
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
          :class="`mb-4 ${i.name === 'add' ? 'color-white fs-44' : ''} ${currentTabbar === i.name ? 'color-[var(--app-primary-color)]' : 'color-gray-700'}`"
        >
          <Icon :name="TabbarIcons[i.icon]" />
        </view>
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
  <AddBillsDialog v-model="show" />
</template>
