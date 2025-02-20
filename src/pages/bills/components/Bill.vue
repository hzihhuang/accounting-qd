<script lang="ts" setup>
const { date, list } = defineProps<{
  date: string
  list: {
    id: number
    // 收入或支出
    type: 'income' | 'expense'
    // 金额
    amount: number
    // 备注
    note?: string
    // 标签
    tag: {
      name: string
      icon: string
    }
  }[]
}>()
const emits = defineEmits<{
  delete: [id: number]
}>()

// 格式化日期
const dateString = computed(() => {
  const currentDate = new Date(date)
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  const dayOfWeek = currentDate.getDay()
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${month}月${day}日 星期${weekdays[dayOfWeek]}`
})

// 计算总收入 和 总支出
const [totalIncome, totalExpense] = computed(() => {
  let income = 0
  let expense = 0
  for (const item of list) {
    income += item.amount
    expense += item.amount
  }
  return [income, expense]
}).value
</script>

<template>
  <wd-card class="overflow-hidden bill-card">
    <view class="flex justify-between items-center fs-24 color-gray-4 pt-32 pb-20 px-32">
      <view>{{ dateString }}</view>
      <view class="flex items-center gap-24">
        <view v-show="totalIncome > 0">收入: {{ totalIncome }}</view>
        <view v-show="totalExpense < 0">支出: {{ totalExpense }}</view>
      </view>
    </view>
    <wd-swipe-action v-for="item in list" :key="item.id">
      <view class="flex justify-between items-center py-16 px-32 bill-item relative">
        <view class="w-64 h-64 p-12 rounded-full mr-24 overflow-hidden bg-gray-1">
          <image :src="item.tag.icon" class="w-full h-full"></image>
        </view>
        <view class="flex-1 flex items-center justify-between bill-item-right color-gray-5">
          <view class="fs-24">{{ item.note ?? item.tag.name }}</view>
          <view class="fs-28">{{ item.amount }}</view>
        </view>
      </view>
      <template #right>
        <view
          class="w-100 h-full flex items-center justify-center bg-red-5 color-white fs-28"
          @click="emits('delete', item.id)"
        >
          删除
        </view>
      </template>
    </wd-swipe-action>
  </wd-card>
</template>

<style lang="scss" scoped>
.bill-card {
  padding: 0 0 12rpx;
}
.bill-item + .bill-item {
  .bill-item-right {
    &::before {
      position: absolute;
      top: 0;
      width: 100%;
      height: 1rpx;
      content: '';
      background-color: #f0f0f0;
    }
  }
}
</style>
