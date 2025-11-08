<script lang="ts" setup>
const statusBarOption = reactive({
  statusBarHeight: 0,
  navBarHeight: 0,
})
onShow(() => {
  if (process.env.UNI_PLATFORM === 'h5') {
    Object.assign(statusBarOption, {
      statusBarHeight: 0,
      navBarHeight: 52,
    })
  } else {
    const { statusBarHeight } = uni.getSystemInfoSync()
    const { top, height } = uni.getMenuButtonBoundingClientRect()
    const navBarHeight = (top - statusBarHeight) * 2 + height
    statusBarOption.statusBarHeight = statusBarHeight
    statusBarOption.navBarHeight = navBarHeight
  }
})
</script>

<template>
  <view
    class="color-black flex items-center justify-center fs-32 fw-bold sticky top-0 z-100"
    :style="{
      paddingTop: `${statusBarOption.statusBarHeight}px`,
      height: `${statusBarOption.navBarHeight + statusBarOption.statusBarHeight}px`,
    }"
  >
    <slot />
  </view>
</template>
