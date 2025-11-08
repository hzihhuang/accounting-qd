<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="about">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的',
  },
}
</route>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { showToast } from '@/utils/globalToast'
import { storeToRefs } from 'pinia'

const { clearUserInfo } = useUserStore()
const { userInfo } = storeToRefs(useUserStore())

const statusBarHeightRef = ref(0)
onShow(() => {
  if (process.env.UNI_PLATFORM === 'h5') {
    const { statusBarHeight } = uni.getSystemInfoSync()
    statusBarHeightRef.value = statusBarHeight
  }
})

const handleLogout = () => {
  clearUserInfo()
  showToast().info('已退出登录')
}
</script>

<template>
  <view class="my-header" :style="{ marginTop: statusBarHeightRef + 'px' }">
    <image class="my-avatar" :src="userInfo.avatar"></image>
    <view class="my-username">「{{ userInfo.username }}」 {{ userInfo.nickname }}</view>
    <view class="my-userID">ID: {{ userInfo.id }}</view>
  </view>
  <view class="my-menu-list">
    <!-- <view class="my-menu-group">
      <view class="my-menu-item">
        <text class="fs-40 i-carbon-calculator"></text>
        <text class="flex-1">预算管理</text>
        <text class="i-carbon-chevron-right" />
      </view>
      <view class="my-menu-item">
        <text class="fs-40 i-carbon-tag"></text>
        <text class="flex-1">类别管理</text>
        <text class="i-carbon-chevron-right" />
      </view>
      <view class="my-menu-item">
        <text class="fs-40 i-carbon-settings"></text>
        <text class="flex-1">通用设置</text>
        <text class="i-carbon-chevron-right" />
      </view>
    </view> -->
    <view class="my-menu-group">
      <view class="my-menu-item logout" @click="handleLogout">
        <text class="fs-40 i-carbon-logout" />
        <text class="flex-1">退出登录</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.my-header {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 60rpx 40rpx;
  color: #333;
  text-align: center;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .my-avatar {
    box-sizing: border-box;
    width: 180rpx;
    height: 180rpx;
    padding: 16rpx;
    margin-bottom: 30rpx;
    background-color: rgba(245, 245, 245, 0.9);
    border: 6rpx solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    box-shadow: 0 16rpx 64rpx rgba(0, 0, 0, 0.1);
    transition: transform 0.3 sease;
  }

  .my-username {
    margin-bottom: 10rpx;
    font-size: 32rpx;
    font-weight: bold;
  }

  .my-userID {
    font-size: 28rpx;
    opacity: 0.8;
  }
}

.my-menu-list {
  box-sizing: border-box;
  padding: 40rpx 24rpx;

  .my-menu-group {
    margin-bottom: 40rpx;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.6);
    -webkit-backdrop-filter: blur(20rpx);
    backdrop-filter: blur(20rpx);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 40rpx;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

    .my-menu-item {
      display: flex;
      gap: 24rpx;
      align-items: center;
      padding: 36rpx;
      font-size: 32rpx;
      font-weight: bold;

      color: #2d3748;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.7);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;

      &:active {
        background-color: rgba(245, 245, 245, 0.9);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transform: scale(0.98);
      }

      &.logout {
        color: #e53e3e;
      }
    }
  }
}
</style>
