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
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useToast } from 'wot-design-uni'

const toast = useToast()

const { setUserInfo, clearUserInfo } = useUserStore()
const { isLogined, userInfo } = storeToRefs(useUserStore())

const user = reactive({
  username: '',
  password: '',
})
const formRef = ref()
const handleLogin = () => {
  formRef.value.validate().then(({ valid }) => {
    if (valid) {
      toast.loading('登录中')
      httpPost('auth/login', user)
        .then((res) => {
          toast.success('登录成功')
          uni.setStorageSync('token', res.token)
          setUserInfo({
            token: res.token,
            username: user.username,
            avatar: res.avatar ?? userInfo.value.avatar,
            nickname: res.nickname,
          })
        })
        .catch((err) => {
          toast.error(err.data.message)
        })
    }
  })
}
const handleLogout = () => {
  uni.removeStorageSync('token')
  clearUserInfo()
  toast.info('已退出登录')
}
</script>

<template>
  <view class="flex justify-center mb-48 mt-180">
    <wd-img width="256rpx" height="256rpx" radius="100%" :src="userInfo.avatar" />
  </view>

  <view class="px-64" v-if="!isLogined">
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
      <view class="mt-48">
        <wd-button type="primary" @click="handleLogin" block>登录</wd-button>
      </view>
    </wd-form>
  </view>

  <view class="flex flex-col gap-48 items-center px-64" v-else>
    <view class="fs-48">{{ userInfo.nickname }}</view>
    <wd-button class="w-full" @click="handleLogout">退出登录</wd-button>
  </view>
</template>
