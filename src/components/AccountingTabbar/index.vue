<script lang="ts" setup>
import { formatDate, isSameDay } from '@/utils/fun'
import { IAccountingTypeEnum, useAddBill, useAddBillDate, useTabbar } from './'

// 核心切换 tabbar 能力
const { currentTabbar, selectTabBar, tabbarList } = useTabbar(() => {
  show.value = true
})

// 添加账单功能
const {
  show,
  useTags,
  activeTagId,
  currentType,
  handleCloseAddBill,
  handleSubmitAddBill,
  handleSwitchTag,
} = useAddBill()
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

  <!-- 添加标签 -->
  <wd-popup
    custom-class="add-tag-popup"
    v-model="show"
    @close="handleCloseAddBill"
    position="bottom"
    lock-scroll
    closable
    :safe-area-inset-bottom="true"
  >
    <view class="flex items-center justify-center relative h-100">
      <view class="w-320">
        <wd-segmented
          size="small"
          :options="[IAccountingTypeEnum.expense, IAccountingTypeEnum.income]"
          v-model:value="currentType"
        ></wd-segmented>
      </view>
    </view>
    <view class="flex items-center gap-48 px-32 mt-40">
      <wd-button custom-class="flex items-center gap-8 w-180" plain size="small" icon="time-filled">
        <!-- {{ isSameDay(DEFAULT_DATE, billDate) ? '今天' : formatDate(billDate) }} -->
      </wd-button>
      <wd-input
        class="flex-1 text-center"
        type="number"
        placeholder="请输入金额"
        inputmode="numeric"
      />
      <wd-button custom-class="w-180" size="small" @click="handleSubmitAddBill">确定</wd-button>
    </view>
    <view class="tags grid grid-cols-5 w-fit" :style="{ justifySelf: 'center' }">
      <view
        :class="`tags-item flex flex-col items-center gap-8 ${i.id === activeTagId ? 'active' : ''}`"
        v-for="i in useTags"
        :key="i.id"
        @click="handleSwitchTag(i.id)"
      >
        <view class="tags-item-icon w-100 h-100 rounded-full bg-gray-1 p-18">
          <image :src="i.icon" class="w-full h-full"></image>
        </view>
        <view class="tags-item-text fs-24 color-gray-5">{{ i.name }}</view>
      </view>
    </view>
  </wd-popup>

  <!-- 键盘 -->

  <!-- 日期 -->
  <!-- <wd-action-sheet v-model="showDate" title="选择日期" @close="billDate = DEFAULT_DATE">
    <wd-calendar-view v-model="cacheDate" @change="handleDateChange" />
    <view class="px-48 flex mt-48">
      <wd-button class="flex-1" type="primary" @click="handleDateChange('submit')">确定</wd-button>
    </view>
  </wd-action-sheet> -->
</template>
