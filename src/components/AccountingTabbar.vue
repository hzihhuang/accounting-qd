<script lang="ts" setup>
import { tabBar } from '@/pages.json'

/** tabbarList 里面的 path 从 pages.config.ts 得到 */
const tabbarList = tabBar.list.map((item) => ({ ...item, path: `/${item.pagePath}` }))
const addItem = { name: 'add', icon: 'add' }
const midIndex = Math.floor(tabbarList.length / 2)
tabbarList.splice(midIndex, 0, addItem as any)

const currentTabbar = computed(() => uni.getStorageSync('app-tabbar-name') || tabbarList[0].name)

function selectTabBar({ value: name }: { value: string }) {
  const url = tabbarList.find((i) => i.name === name)?.path
  if (url) {
    uni.setStorageSync('app-tabbar-name', name)
    uni.switchTab({ url })
    return
  }
  // 这里是 add 逻辑
  handleAdd()
}

enum TypeEnum {
  expenditure = '支出',
  income = '收入',
}

const show = ref(false)
const current = ref(TypeEnum.expenditure)
const active = ref(1)
const handleAdd = () => {
  show.value = true
}
const handleCloseAdd = () => {
  show.value = false
}

// 选择日期
const showDate = ref(false)
const currentDate = ref(new Date().getTime())
const handleDateChange = (e: any) => {
  currentDate.value = e.detail.value
  showDate.value = false
}
</script>

<template>
  <wd-tabbar
    fixed
    shape="round"
    :modelValue="currentTabbar"
    bordered
    safeAreaInsetBottom
    placeholder
    @change="selectTabBar"
  >
    <wd-tabbar-item
      :class="`tabbar-item-${i.name}`"
      :name="i.name"
      :title="i.text"
      :icon="i.icon"
      v-for="i in tabbarList"
      :key="i.name"
    ></wd-tabbar-item>
  </wd-tabbar>

  <wd-popup
    v-model="show"
    @close="show = false"
    position="bottom"
    :close-on-click-modal="false"
    lock-scroll
    :safe-area-inset-bottom="true"
    custom-style="height: 80vh;z-index: 100;border-radius: 32rpx 32rpx 0 0;"
  >
    <view class="flex items-center justify-center relative h-100">
      <view
        class="absolute left-24 flex items-center gap-8 color-[var(--wot-color-theme)]"
        @click="showDate = true"
      >
        <wd-icon name="time-filled" size="38rpx"></wd-icon>
        <view class="fs-28">今天</view>
      </view>
      <view class="w-320">
        <wd-segmented :options="Object.values(TypeEnum)" v-model:value="current"></wd-segmented>
      </view>
      <view class="absolute right-24 fs-28" @click="handleCloseAdd">取消</view>
    </view>
    <view class="tags grid grid-cols-5 w-fit" :style="{ justifySelf: 'center' }">
      <view
        :class="`tags-item flex flex-col items-center gap-8 ${i === active ? 'active' : ''}`"
        v-for="i in 20"
        :key="i"
        @click="active = i"
      >
        <view class="tags-item-icon w-100 h-100 rounded-full bg-gray-4"></view>
        <view class="tags-item-text fs-24 color-gray-5">名字</view>
      </view>
    </view>
    <!-- <wd-number-keyboard v-model:visible="show" showDeleteKey closeText="完成" title="12321" extraKey="."
      mode="custom"></wd-number-keyboard> -->
  </wd-popup>

  <wd-action-sheet v-model="showDate" title="选择日期">
    <wd-calendar-view v-model="currentDate" @change="handleDateChange" />
    <view class="px-48 flex mt-48">
      <wd-button class="flex-1" type="primary" @click="handleDateChange">确定</wd-button>
    </view>
  </wd-action-sheet>
</template>

<style lang="scss" scoped>
.tabbar-item-add {
  flex: unset;
  width: 100rpx;
  height: 100rpx;
  color: white;
  background-color: #597fe8;
  border-radius: 999px;
  transform: translateY(-30%);
  --wot-tabbar-inactive-color: white;
}

.tags {
  gap: 24rpx 40rpx;
  margin: 40rpx auto 0;

  .tags-item {
    &.active {
      .tags-item-icon {
        background-color: var(--wot-color-theme);
      }

      .tags-item-text {
        color: var(--wot-color-theme);
      }
    }
  }
}
</style>
