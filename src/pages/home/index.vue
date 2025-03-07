<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<script setup lang="ts"></script>
<template>
  <view class="home-header">
    <view class="home-header-title">记账本</view>
    <view class="home-header-budget">
      <view class="mb-20">本月预算剩余</view>
      <wd-progress custom-class="h-16" :percentage="30" hide-text />
      <view class="flex justify-between mt-20">
        <text>已使用: ¥3,500</text>
        <text>总预算: ¥5,000</text>
      </view>
    </view>
  </view>
  <view class="px-40 pt-40">
    <view class="flex text-center radius-40 p-40 mb-40 bg-[#fafafa]">
      <div class="flex-1">
        <div class="fs-28 color-[#718096]">本月支出</div>
        <div class="mt-10 fs-40 fw-600 color-[#E53E3E]">¥3500</div>
      </div>
      <div class="flex-1">
        <div class="fs-28 color-[#718096]">本月收入</div>
        <div class="mt-10 fs-40 fw-600 color-[#48BB78]">¥8000</div>
      </div>
      <div class="flex-1">
        <div class="fs-28 color-[#718096]">结余</div>
        <div class="mt-10 fs-40 fw-600 color-[#2D3748]">¥4500</div>
      </div>
    </view>
    <view class="home-transaction-item" v-for="item in 24" :key="item">
      <view
        class="w-80 h-80 bg-[#eef4fc] color-[#4299e1] mr-30 flex items-center justify-center radius-40"
      ></view>
      <view class="flex-1">
        <view class="flex gap-16 items-center mb-8">
          <view class="color-[#2D3748] fs-28 fw-500">午餐</view>
          <view class="fs-24 color-[#4299e1] radius-20 py-4 px-16 bg-[#eef4fc]">餐饮</view>
        </view>
        <view class="fs-24 color-[#718096]">今天 12:30</view>
      </view>
      <!-- <view class="fs-28 fw-500 color-[#E53E3E]">-¥35</view> -->
      <view class="fs-28 fw-500 color-[#48BB78]">+¥3000</view>
    </view>
  </view>
</template>

<style lang="scss">
.home-header {
  position: sticky;
  top: 0;
  padding: 40rpx;
  color: #333;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  .home-header-title {
    font-size: 48rpx;
    font-weight: 600;
  }
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
