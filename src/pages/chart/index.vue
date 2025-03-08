<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="about">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '统计',
  },
}
</route>
<script setup lang="ts">
import Segmented from '@/components/Segmented.vue'
import { TimeTypeEnum, TransactionTypeEnum } from '@/enums/global'
import { getWeeks, getMonths, getYears } from './utils'
import Bubbles from '@/components/Bubbles.vue'

// 收入 or 支出
const type = ref<TransactionTypeEnum>(TransactionTypeEnum.Expense)
// 周月年
const timeType = ref<TimeTypeEnum>(TimeTypeEnum.Week)

// 周期

const filterList = computed(() => {
  switch (timeType.value) {
    case TimeTypeEnum.Week:
      return getWeeks()
    case TimeTypeEnum.Month:
      return getMonths()
    case TimeTypeEnum.Year:
      return getYears()
    default:
      return getWeeks()
  }
})
const bubbleType = ref(filterList.value[0].value)
watch(filterList, (v) => {
  bubbleType.value = v[0].value
})
</script>
<template>
  <view class="page-header pt-40 pb-40">
    <view>消费统计</view>
    <view class="flex gap-20 px-40 mt-30">
      <Segmented
        class="flex-1"
        v-model="type"
        :list="[
          { label: '支出', value: TransactionTypeEnum.Expense },
          { label: '收入', value: TransactionTypeEnum.Income },
        ]"
      />
      <Segmented
        class="flex-1"
        v-model="timeType"
        :list="[
          { label: '按周', value: TimeTypeEnum.Week },
          { label: '按月', value: TimeTypeEnum.Month },
          { label: '按年', value: TimeTypeEnum.Year },
        ]"
      />
    </view>
    <Bubbles class="mt-40 mb-20 px-60" v-model="bubbleType" :list="filterList" />
  </view>
  <view class="flex flex-col gap-40 p-40">
    <view class="chart-overview-card">
      <view class="fs-28 opacity-90">本周总支出</view>
      <view class="my-20 fs-56 fw-600">¥2,750</view>
      <view class="fs-28 opacity-90">较上周减少12.5%</view>
    </view>
    <view class="chart-card">
      <view class="fs-32 fw-600 color-[#2D3748] mb-30">趋势分析</view>
    </view>
    <view class="chart-card">
      <view class="fs-32 fw-600 color-[#2D3748] mb-30">分类占比</view>
    </view>
    <view class="chart-card">
      <view class="fs-32 fw-600 color-[#2D3748] mb-30">金额排行</view>
    </view>
  </view>
</template>

<style lang="scss">
.chart-overview-card {
  padding: 40rpx;
  margin-bottom: 40rpx;
  color: white;
  background: linear-gradient(135deg, #4299e1, #63b3ed);
  border-radius: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(66, 153, 225, 0.2);
}

.chart-card {
  height: 400rpx;
  padding: 40rpx;
  margin-bottom: 40rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.18);
  border-radius: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.06);
}
</style>
