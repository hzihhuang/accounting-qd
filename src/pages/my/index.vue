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

const handleLogout = () => {
  clearUserInfo()
  showToast().info('已退出登录')
}
</script>

<template>
  <view class="flex justify-center mb-48 mt-180">
    <wd-img width="256rpx" height="256rpx" radius="100%" :src="userInfo.avatar" />
  </view>
  <view class="flex flex-col gap-48 items-center px-64">
    <view class="fs-48">{{ userInfo.nickname }}</view>
    <wd-button class="w-full" @click="handleLogout">退出登录</wd-button>
  </view>
</template>
