<script lang="ts" setup>
const paddingTop = ref()
onBeforeMount(() => {
  if (process.env.UNI_PLATFORM === 'h5') return
  const { top } = uni.getMenuButtonBoundingClientRect()
  paddingTop.value = top + 'px'
})
</script>

<template>
  <view
    class="flex flex-col gap-32 pt-32 px-32 sticky top-0 bg-[#f8f9fa] z-100"
    :style="{ paddingTop }"
  >
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
</template>
