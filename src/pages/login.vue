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
  <view class="flex justify-center mb-48 pt-180">
    <wd-img
      width="256rpx"
      height="256rpx"
      radius="100%"
      src="https://nest.nodejs.cn/assets/logo-small-gradient.svg"
    />
  </view>
  <view class="px-64">
    <wd-form ref="formRef" :model="user">
      <wd-cell-group border>
        <wd-input
          label="用户名"
          label-width="160rpx"
          prop="username"
          clearable
          v-model="user.username"
          :rules="[
            { required: true, message: '用户名不能为空' },
            { required: true, pattern: /^[\s\S]{4,20}$/, message: '用户名必须在 4-20 个字符之间' },
          ]"
          placeholder="请输入用户名"
        />
        <wd-input
          label="密码"
          label-width="160rpx"
          prop="password"
          show-password
          clearable
          v-model="user.password"
          :rules="[
            { required: true, message: '密码不能为空' },
            {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,32}$/,
              message: '密码必须包含字母和数字，且长度为 6-32 个字符',
            },
          ]"
          placeholder="请输入密码"
        />
      </wd-cell-group>
      <view class="mt-48 flex flex-col gap-24">
        <wd-button type="primary" @click="handleLogin" block>登录</wd-button>
        <wd-button type="info" @click="handleGoRegister" block>注册</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<style lang="scss" scoped></style>
