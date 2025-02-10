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
import { reactive } from 'vue'
import { httpPost } from '@/utils/http'
import { useToast } from 'wot-design-uni'

const toast = useToast()

const token = uni.getStorageSync('token')
const user = reactive({
  username: '',
  password: '',
})
const formRef = ref()
const handleLogin = () => {
  formRef.value.validate().then(({ valid }) => {
    if (valid) {
      httpPost('auth/login', user)
        .then((res) => {
          uni.setStorageSync('token', res.token)
        })
        .then((res) => {})
        .catch((err) => {
          toast.error(err.data.message)
        })
    }
  })
}
const handleLogout = () => {
  uni.removeStorageSync('token')
}
</script>

<template>
  <view class="flex justify-center mb-48">
    <wd-img
      class="w-256 h-256 bg-gray-200 mt-180"
      radius="100%"
      src="https://nest.nodejs.cn/assets/logo-small-gradient.svg"
    />
  </view>

  <view class="px-64" v-if="!token">
    <wd-form class="flex flex-col gap-48" ref="formRef" :model="user">
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
      <view class="footer">
        <wd-button type="primary" @click="handleLogin" block>提交</wd-button>
      </view>
    </wd-form>
  </view>

  <view class="flex flex-col gap-48 items-center px-64" v-else>
    <view class="fs-48">名字</view>
    <wd-button class="w-full" @click="handleLogout">退出登录</wd-button>
  </view>
</template>
