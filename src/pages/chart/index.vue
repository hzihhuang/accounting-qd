<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="about">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '图表',
  },
}
</route>
<template>
  <view class="mt-4">图表</view>
</template>

<script lang="ts" setup></script>

<style></style>
