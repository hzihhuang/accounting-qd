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
import Bubbles from '@/components/Bubbles.vue'
import ChartBar from '@/components/ChartBar.vue'
import ChartLine from '@/components/ChartLine.vue'
import ChartPic from '@/components/ChartPic.vue'
import StatusBar from '@/components/StatusBar.vue'
import { useChartStore } from '@/store/chart'
import { storeToRefs } from 'pinia'

const { type, timeType, list, curActive, lineData, picData, barData } = storeToRefs(useChartStore())
const { onSearch } = useChartStore()
</script>

<template>
  <view class="page-header">
    <StatusBar>消费统计</StatusBar>
    <view class="flex gap-20 mt-30 px-24">
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
    <Bubbles
      class="mt-20 mb-20 px-24"
      @change="
        (i) => {
          onSearch(i.start, i.end)
        }
      "
      v-model="curActive"
      :list="list"
    />
  </view>
  <view class="flex flex-col gap-40 p-24">
    <view class="chart-card">
      <view class="fs-32 fw-600 color-[#2D3748] mb-30 px-40">趋势分析</view>
      <ChartLine v-model:timeType="timeType" v-model="lineData" />
    </view>
    <view class="chart-card">
      <view class="fs-32 fw-600 color-[#2D3748] mb-30 px-40">分类占比</view>
      <ChartPic v-model="picData" />
    </view>
    <view class="chart-card">
      <view class="fs-32 fw-600 color-[#2D3748] mb-30 px-40">金额排行</view>
      <ChartBar v-model="barData" />
    </view>
  </view>
</template>

<style lang="scss">
.chart-card {
  height: auto;
  padding: 40rpx 12rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.18);
  border-radius: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.06);
}
</style>
