<script lang="ts" setup>
import { getDate, formatTime } from '@/utils/fun'
import { httpGet } from '@/utils/http'

const { incomes, expenses, time } = defineProps<{
  incomes: number
  expenses: number
  time: number
}>()
const emits = defineEmits<{
  changeTime: [time: number]
}>()

// 粘性高度
const filterTop = ref(0)
onMounted(() => {
  if (process.env.UNI_PLATFORM === 'h5') {
    filterTop.value = 52
  } else {
    const { statusBarHeight } = uni.getSystemInfoSync()
    const { top, height } = uni.getMenuButtonBoundingClientRect()
    const navBarHeight = (top - statusBarHeight) * 2 + height
    filterTop.value = statusBarHeight + navBarHeight
  }
})

// 筛选日期
const show = ref(false)
const timeCache = ref(new Date().getTime())
const handleCancel = () => {
  show.value = false
  setTimeout(() => {
    timeCache.value = time
  }, 100)
}
const handleChangeTime = () => {
  show.value = false
  emits('changeTime', timeCache.value)
}

// 控制只出现存在数据的日期
const dates = ref([])
onShow(() => {
  httpGet<string[]>('bills/dates').then((res) => {
    const uniqueMonths = Array.from(
      new Set(
        res.data.map((date) => date.slice(0, 7)), // 截取前 7 位（YYYY-MM）
      ),
    )
    dates.value = uniqueMonths
  })
})
const formatter = (v, value) => {
  const [year, month] = formatTime(new Date().getTime(), 'YYYY-MM').split('-')
  if (v === 'year') {
    const yearDates = dates.value.map((item) => item.slice(0, 4))
    return [...yearDates, year].includes(value) ? value : ''
  }
  if (v === 'month') {
    const monthDates = dates.value.map((item) => item.slice(5, 7))
    return [...monthDates, month].includes(value) ? value : ''
  }
}
</script>

<template>
  <view class="px-32 bg-app sticky z-100" :style="{ top: `${filterTop}px` }">
    <view
      class="radius-16 p-24 flex items-center justify-end gap-16 bg-blue-5 color-white"
      @click="show = true"
    >
      <view class="flex items-center gap-32 fs-26 flex-1">
        <view>收入: {{ incomes }}</view>
        <view>支出: {{ expenses }}</view>
      </view>
      <wd-divider color="white" vertical></wd-divider>
      <view class="flex items-center justify-end gap-14">
        <view class="fs-32 fw-bold">{{ getDate(time).getFullYear() }}</view>
        <view class="fs-26">年</view>
        <view class="fs-32 fw-bold">{{ getDate(time).getMonth() + 1 }}</view>
        <view class="fs-26">月</view>
        <wd-icon custom-class="mr-12" name="filter1" size="18px"></wd-icon>
      </view>
    </view>
  </view>

  <!-- 选择日期 -->
  <wd-popup v-model="show" position="bottom" @close="handleCancel">
    <view class="flex items-center justify-between px-32 py-24 fs-28 color-gray-5">
      <view @click="handleCancel">取消</view>
      <view class="fs-32 fw-bold color-black">日期</view>
      <view @click="handleChangeTime">确定</view>
    </view>
    <wd-datetime-picker-view
      type="year-month"
      :max-date="new Date().getTime()"
      :formatter="formatter"
      v-model="timeCache"
      label="年月"
    />
  </wd-popup>
</template>
