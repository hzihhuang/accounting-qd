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
import { useBillsStore } from '@/store/bills'

const billsStore = useBillsStore()
onMounted(() => {
  billsStore.onSearch()
})

const expenses = computed(() =>
  billsStore.groupedData.reduce((sum, item) => sum + item.expenseSum, 0),
)
const incomes = computed(() =>
  billsStore.groupedData.reduce((sum, item) => sum + item.incomeSum, 0),
)
</script>
<template>
  <StatusBar class="bg-white">账单</StatusBar>
  <BillFilter
    :time="billsStore.time"
    :expenses="expenses"
    :incomes="incomes"
    @changeTime="(t) => (billsStore.time = t)"
  />
  <wd-status-tip
    v-if="billsStore.groupedData.length === 0 && !billsStore.loading"
    image="content"
    tip="暂无数据"
  />
  <Bill
    :date="item.time"
    v-for="item in billsStore.groupedData"
    :key="item.time"
    :list="item.list"
    @delete="billsStore.onDelete"
    @detail="billsStore.onDetail"
  />
</template>
