<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="about">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '账单',
  },
}
</route>
<script lang="ts" setup>
import Bill from './components/Bill.vue'
import { useBills } from './index'

const { onDelete, onDetail, groupedData } = useBills()
</script>
<template>
  <view class="flex flex-col gap-32 pt-32 px-32 sticky top-0 bg-[#f8f9fa] z-100">
    <view class="text-center fs-36">账单</view>
    <view class="radius-16 px-24 py-20 flex items-center justify-between bg-blue-5 color-white">
      <view class="flex flex-col fs-28">
        <view class="">2025年</view>
        <view class="">01月</view>
      </view>
      <view class="flex items-center fs-24">
        <wd-divider color="white" vertical></wd-divider>
        <view>收入: 1000</view>
        <view class="ml-32">支出: 3000</view>
      </view>
    </view>
  </view>
  <Bill
    :date="item.time"
    v-for="item in groupedData"
    :key="item.time"
    :list="item.list"
    @delete="onDelete"
    @detail="onDetail"
  />
</template>
