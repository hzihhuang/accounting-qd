<route lang="json5" type="bills">
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
const { onDelete, onDetail, groupedData, loading } = useBills(time)

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
  <wd-status-tip v-if="groupedData.length === 0 && !loading" image="content" tip="暂无数据" />
  <Bill
    :date="item.time"
    v-for="item in groupedData"
    :key="item.time"
    :list="item.list"
    @delete="onDelete"
    @detail="onDetail"
  />
</template>
