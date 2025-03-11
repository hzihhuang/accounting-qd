<script lang="ts" setup>
import { formatTime, isSameDay } from '@/utils/fun'
import { IAccountingTypeEnum, useAddBill, useBillDate } from './hook'
import Segmented from '../Segmented.vue'

const list = [
  {
    label: '支出',
    value: IAccountingTypeEnum.expense,
  },
  {
    label: '收入',
    value: IAccountingTypeEnum.income,
  },
]

const show = defineModel<boolean>()
// 添加账单功能
const {
  activeTagId,
  amount,
  date,
  useTags,
  currentType,
  handleCloseAddBill,
  handleSubmitAddBill,
  handleSwitchTag,
} = useAddBill(show)

const { DEFAULT_DATE, billDate, cacheDate, showDate, handleDateChange } = useBillDate()
</script>

<template>
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
    <view class="p-40 flex flex-col gap-40">
      <view class="fs-32 fw-600 color-[#2D3748]">新增账单</view>
      <Segmented class="mx-10" :list="list" v-model="currentType" />
      <wd-input
        class="add-bills-dialog-input"
        type="number"
        placeholder="¥0.00"
        inputmode="numeric"
      />
      <view>
        <view class="fs-28 color-[#718096] mb-20">选择分类</view>
      </view>
      <view></view>
      <view></view>
      <wd-button size="large" :round="false" @click="handleSubmitAddBill">保存</wd-button>
    </view>
    <view class="flex items-center gap-48 px-32 mt-16 h-80">
      <wd-button
        custom-class="flex items-center gap-8 w-160"
        plain
        size="small"
        icon="time-filled"
        @click="showDate = true"
      >
        {{ isSameDay(DEFAULT_DATE, billDate) ? '今天' : formatTime(billDate, 'YY/MM/DD') }}
      </wd-button>
    </view>
    <scroll-view
      class="h-[calc(100%-224rpx)]"
      scroll-anchoring
      scroll-with-animation
      scroll-y
      show-scrollbar
    >
      <view class="tags grid grid-cols-4 w-fit" :style="{ justifySelf: 'center' }">
        <view
          :class="`tags-item flex flex-col items-center gap-8 ${i.id === activeTagId ? 'active' : ''}`"
          v-for="i in useTags"
          :key="i.id"
          @click="handleSwitchTag(i.id)"
        >
          <view class="tags-item-icon w-110 h-110 rounded-full bg-gray-1 p-18">
            <image :src="i.icon" class="w-full h-full tags-item-img"></image>
          </view>
          <view class="tags-item-text fs-28 color-gray-5">{{ i.name }}</view>
        </view>
      </view>
    </scroll-view>
  </wd-popup>

  <!-- 日期 -->
  <wd-action-sheet v-model="showDate" title="选择日期" @close="billDate = DEFAULT_DATE">
    <wd-calendar-view v-model="cacheDate" @change="handleDateChange" />
    <view class="px-48 flex mt-48">
      <wd-button class="flex-1" type="primary" @click="handleDateChange('submit')">确定</wd-button>
    </view>
  </wd-action-sheet>
</template>
