<script lang="ts" setup>
import { useTabbar } from './hook'
import AddBillsDialog from './AddBillsDialog.vue'

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
      :icon="i.icon"
      v-for="i in tabbarList"
      :key="i.name"
    ></wd-tabbar-item>
  </wd-tabbar>
  <AddBillsDialog v-model="show" />
</template>
