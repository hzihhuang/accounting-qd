<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '注册',
  },
}
</route>

<script lang="ts" setup>
import { Pages } from '@/enums/pages'
import { showToast } from '@/utils/globalToast'
import { httpPost } from '@/utils/http'

const registerUser = reactive({
  username: '',
  password: '',
  confirmPassword: '',
})
const runLogin = useLogin(registerUser)
const formRef = ref()
const handleRegister = () => {
  formRef.value.validate().then(({ valid }) => {
    if (valid) {
      showToast().loading('注册中')
      httpPost('auth/register', {
        username: registerUser.username,
        password: registerUser.password,
      })
        .then((res) => {
          if (res.code === 200) {
            runLogin()
          }
        })
        .catch((err) => {
          showToast().error(err.message)
        })
    }
  })
}
const handleBack = () =>
  getCurrentPages().length > 1 ? uni.navigateBack() : uni.redirectTo({ url: Pages.Login })
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
    <wd-form ref="formRef" :model="registerUser">
      <wd-input
        prefix-icon="user"
        prop="username"
        clearable
        v-model="registerUser.username"
        :rules="[
          { required: false, pattern: /^[\s\S]{4,20}$/, message: '用户名必须在 4-20 个字符之间' },
        ]"
        placeholder="用户名"
      />
      <wd-input
        class="mt-40"
        prefix-icon="lock-on"
        prop="password"
        show-password
        clearable
        v-model="registerUser.password"
        :rules="[
          {
            required: false,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,32}$/,
            message: '密码必须包含字母和数字，且长度为 6-32 个字符',
          },
        ]"
        placeholder="设置密码"
      />
      <wd-input
        class="mt-40"
        prefix-icon="lock-on"
        prop="confirmPassword"
        show-password
        clearable
        v-model="registerUser.confirmPassword"
        :rules="[
          {
            required: false,
            validator: (value) => value === registerUser.password,
            message: '两次输入的密码不一致',
          },
        ]"
        placeholder="确认密码"
      />
      <wd-button
        class="mt-50"
        size="large"
        :round="false"
        type="primary"
        @click="handleRegister"
        block
      >
        注册
      </wd-button>
      <view class="mt-40 fs-28 text-center">
        还没有账号？
        <text class="color-primary" @click="handleBack">返回登录</text>
      </view>
    </wd-form>
  </view>
</template>

<style lang="scss" scoped></style>
