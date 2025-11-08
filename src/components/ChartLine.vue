<script lang="ts" setup>
import { ref } from 'vue'
import qiunDataCharts from '@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
import { TimeTypeEnum } from '@/enums/global'
import dayjs from 'dayjs'

const timeType = defineModel<TimeTypeEnum>('timeType')
const lineData = defineModel<{ value: number; name: string }[]>()

const categories = computed(() => {
  switch (timeType.value) {
    case TimeTypeEnum.Week:
      return lineData.value.map?.((i) => dayjs(i.name).format('ddd'))
    case TimeTypeEnum.Month:
      return lineData.value.map?.((i) => dayjs(i.name).format('D') + '日')
    case TimeTypeEnum.Year:
      return lineData.value.map?.((i) => dayjs(i.name).month() + 1 + '月')
    default:
      return lineData.value.map?.((i) => dayjs(i.name).format('D') + '日')
  }
})

const chartData = computed(() => ({
  categories: categories.value,
  series: [
    {
      name: '金额',
      data: lineData.value.map?.((i) => i.value),
    },
  ],
}))

const opts = ref({
  color: [
    '#1890FF',
    '#91CB74',
    '#FAC858',
    '#EE6666',
    '#73C0DE',
    '#3CA272',
    '#FC8452',
    '#9A60B4',
    '#ea7ccc',
  ],
  padding: [15, 10, 0, 15],
  enableScroll: false,
  legend: {},
  xAxis: {
    disableGrid: true,
  },
  yAxis: {
    gridType: 'dash',
    dashLength: 2,
  },
  extra: {
    line: {
      type: 'curve',
      width: 2,
      activeType: 'hollow',
    },
  },
})
</script>
<template>
  <view class="charts-box">
    <qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
  </view>
</template>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
}
</style>
