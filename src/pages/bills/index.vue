<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="about">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '账单',
  },
}
</route>
<script lang="ts" setup>
import Bill from './components/Bill.vue'
import BillHeader from './components/BillHeader.vue'
import { useBills } from './index'

const { onDelete, onDetail, groupedData } = useBills()
</script>
<template>
  <BillHeader />
  <Bill
    :date="item.time"
    v-for="item in groupedData"
    :key="item.time"
    :list="item.list"
    @delete="onDelete"
    @detail="onDetail"
  />
</template>
