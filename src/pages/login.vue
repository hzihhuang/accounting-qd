<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '登录',
  },
}
</route>

<script lang="ts" setup>
import { Pages } from '@/enums/pages'
import { useUserStore } from '@/store'
import { showToast } from '@/utils/globalToast'
import { storeToRefs } from 'pinia'

const { isLogined } = storeToRefs(useUserStore())
const user = reactive({
  username: '',
  password: '',
})
const runLogin = useLogin(user)
const formRef = ref()
const handleLogin = () => {
  formRef.value.validate().then(({ valid }) => {
    if (valid) {
      showToast().loading('登录中')
      runLogin()
    }
  })
}

const handleGoRegister = () => {
  uni.navigateTo({
    url: '/pages/register',
    animationType: 'slide-in-right', // 从右侧滑入
    animationDuration: 300, // 动画持续时间（单位：ms）
  })
}

onShow(() => {
  if (isLogined.value) {
    uni.switchTab({ url: Pages.Home })
  }
})
</script>

<template>
  <view class="flex flex-col items-center gap-32 mb-48 pt-180">
    <wd-img
      width="224rpx"
      height="224rpx"
      radius="100%"
      src="https://nest.nodejs.cn/assets/logo-small-gradient.svg"
    />
    <view class="fs-48 fw-bold">记账本</view>
  </view>
  <view class="px-64">
    <wd-form ref="formRef" :model="user">
      <wd-input
        class="radius-18 border px-24 py-8"
        prefix-icon="user"
        prop="username"
        clearable
        v-model="user.username"
        :rules="[
          { required: false, pattern: /^[\s\S]{4,20}$/, message: '用户名必须在 4-20 个字符之间' },
        ]"
        placeholder="用户名"
      />
      <wd-input
        class="mt-40 radius-18 border px-24 py-8"
        prefix-icon="lock-on"
        prop="password"
        show-password
        clearable
        v-model="user.password"
        :rules="[
          {
            required: false,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,32}$/,
            message: '密码必须包含字母和数字，且长度为 6-32 个字符',
          },
        ]"
        placeholder="密码"
      />
      <wd-button
        class="mt-50"
        size="large"
        type="primary"
        @click="handleLogin"
        :round="false"
        block
      >
        登录
      </wd-button>
      <view class="mt-40 fs-28 text-center">
        还没有账号？
        <text class="color-primary" @click="handleGoRegister">立即注册</text>
      </view>
    </wd-form>
  </view>
</template>

<style lang="scss" scoped></style>
