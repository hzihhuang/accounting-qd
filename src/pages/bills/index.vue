<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="about">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '账目',
  },
}
</route>
<script lang="ts" setup>
import { useToast } from 'wot-design-uni'
import Bill from './components/Bill.vue'
const list = [
  {
    type: 'income',
    tag: '工资',
    amount: 1000,
  },
  {
    type: 'expense',
    tag: '午餐',
    amount: -30,
  },
]

const show = ref(false)
const handleAdd = () => {}
</script>
<template>
  <Bill date="2025-02-10" :list="list" />

  <wd-fab
    type="primary"
    position="right-bottom"
    draggable
    :expandable="false"
    @click="show = true"
  ></wd-fab>

  <wd-popup
    v-model="show"
    position="bottom"
    custom-style="height: 80vh;"
    @close="show = false"
  ></wd-popup>
</template>

<style></style>
