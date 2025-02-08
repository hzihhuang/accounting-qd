<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="about">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的',
  },
}
</route>

<script lang="ts" setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const titleHeight = ref(0)
onMounted(() => {
  if (uni.getSystemInfoSync().uniPlatform === 'web') return
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  titleHeight.value = menuButtonInfo.top + menuButtonInfo.height + 8
})
</script>

<template>
  <view
    class="p-32 flex flex-col gap-48"
    :style="{ paddingTop: titleHeight ? `${titleHeight}px` : undefined }"
  >
    <view class="flex flex-col gap-24">
      <wd-input type="text" v-model="username" placeholder="请输入用户名" />
      <wd-input type="text" v-model="password" clearable show-password placeholder="请输入密码" />
    </view>

    <view class="flex flex-col gap-24">
      <wd-button>登录</wd-button>
      <!-- <wd-button type="info">退出登录</wd-button> -->
    </view>
  </view>
</template>
