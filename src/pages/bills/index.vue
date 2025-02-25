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
import StatusBar from '@/components/StatusBar.vue'
import Bill from './components/Bill.vue'
import BillFilter from './components/BillFilter.vue'
import { useBills } from './index'

const time = ref(new Date().getTime())
const { onDelete, onDetail, groupedData } = useBills(time)

const expenses = computed(() => groupedData.value.reduce((sum, item) => sum + item.expenseSum, 0))
const incomes = computed(() => groupedData.value.reduce((sum, item) => sum + item.incomeSum, 0))
</script>
<template>
  <StatusBar>账单</StatusBar>
  <BillFilter
    :time="time"
    :expenses="expenses"
    :incomes="incomes"
    @changeTime="(t) => (time = t)"
  />
  <Bill
    :date="item.time"
    v-for="item in groupedData"
    :key="item.time"
    :list="item.list"
    @delete="onDelete"
    @detail="onDetail"
  />
</template>
