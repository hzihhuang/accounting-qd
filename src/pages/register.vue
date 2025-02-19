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
      httpPost('auth/register', registerUser)
        .then((res) => {
          runLogin()
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
  <view class="flex justify-center mb-48 mt-180">
    <wd-img
      width="256rpx"
      height="256rpx"
      radius="100%"
      src="https://nest.nodejs.cn/assets/logo-small-gradient.svg"
    />
  </view>
  <view class="px-64">
    <wd-form ref="formRef" :model="registerUser">
      <wd-cell-group border>
        <wd-input
          label="用户名"
          label-width="160rpx"
          prop="username"
          clearable
          v-model="registerUser.username"
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
          v-model="registerUser.password"
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
        <wd-input
          label="确认密码"
          label-width="160rpx"
          prop="confirmPassword"
          show-password
          clearable
          v-model="registerUser.confirmPassword"
          :rules="[
            { required: true, message: '确认密码不能为空' },
            {
              required: true,
              validator: (value) => value === registerUser.password,
              message: '两次输入的密码不一致',
            },
          ]"
          placeholder="请输入确认密码"
        />
      </wd-cell-group>
      <view class="mt-48 flex flex-col gap-24">
        <wd-button type="primary" @click="handleRegister" block>确认注册</wd-button>
        <wd-button type="info" @click="handleBack" block>返回</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<style lang="scss" scoped></style>
