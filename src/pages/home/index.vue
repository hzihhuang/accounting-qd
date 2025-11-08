<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import { useHomeStore } from '@/store/home'
import { formatNumber, getDateString } from '@/utils/fun'

const homeStore = useHomeStore()
onMounted(() => {
  homeStore.onSearch()
})
</script>
<template>
  <view class="page-header px-24 pb-24">
    <StatusBar>记账本</StatusBar>
    <view class="home-header-budget flex text-center">
      <div class="flex-1">
        <div class="fs-28 color-[#718096]">本月支出</div>
        <div class="mt-10 fs-40 fw-600 color-[#E53E3E]">
          ¥{{ formatNumber(homeStore.info.monthPay) }}
        </div>
      </div>
      <div class="flex-1">
        <div class="fs-28 color-[#718096]">本月收入</div>
        <div class="mt-10 fs-40 fw-600 color-[#48BB78]">
          ¥{{ formatNumber(homeStore.info.monthIncome) }}
        </div>
      </div>
      <div class="flex-1">
        <div class="fs-28 color-[#718096]">结余</div>
        <div class="mt-10 fs-40 fw-600 color-[#2D3748]">
          ¥{{ formatNumber(homeStore.info.balance) }}
        </div>
      </div>
    </view>
    <!-- <view class="home-header-budget">
      <view class="mb-20">本月预算剩余</view>
      <wd-progress custom-class="h-16" :percentage="30" hide-text />
      <view class="flex justify-between mt-20">
        <text>已使用: ¥{{ formatNumber(homeStore.info.monthPay) }}</text>
        <text>总预算: ¥5,000</text>
      </view>
    </view> -->
  </view>
  <view class="px-24">
    <view class="home-transaction-item" v-for="item in homeStore.info.bills" :key="item.id">
      <view
        class="w-80 h-80 bg-[#eef4fc] color-[#4299e1] mr-30 flex items-center justify-center radius-40"
      ></view>
      <view class="flex-1">
        <view class="flex gap-16 items-center mb-8">
          <view class="color-[#2D3748] fs-28 fw-500">{{ item.remark || '-' }}</view>
          <view class="fs-24 color-[#4299e1] radius-20 py-4 px-16 bg-[#eef4fc]">
            {{ item.category.name }}
          </view>
        </view>
        <view class="fs-24 color-[#718096]">{{ getDateString(item.date) }}</view>
      </view>
      <view class="fs-28 fw-500 color-[#E53E3E]" v-if="item.category.type === 'expense'">
        -¥{{ formatNumber(item.price) }}
      </view>
      <view class="fs-28 fw-500 color-[#48BB78]" v-else>+¥{{ formatNumber(item.price) }}</view>
    </view>
  </view>
</template>

<style lang="scss">
.home-header-budget {
  --wot-progress-height: 16rpx;
  padding: 30rpx;
  margin-top: 30rpx;
  font-size: 28rpx;
  color: #718096;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.home-transaction-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  margin-top: 20rpx;
  border-radius: 24rpx;
  transition: transform 0.2s ease;
}
</style>
