<script setup>
import { ref } from 'vue'
import qiunDataCharts from '@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'

const barData = defineModel()
const chartData = computed(() => ({
  categories: barData.value.map((item) => item.name),
  series: [
    {
      name: '金额',
      data: barData.value.map((item) => item.value),
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
  padding: [15, 15, 0, 5],
  enableScroll: false,
  legend: {},
  xAxis: {
    disableGrid: true,
  },
  yAxis: {
    data: [
      {
        min: 0,
      },
    ],
  },
  extra: {
    column: {
      type: 'group',
      width: 30,
      activeBgColor: '#000000',
      activeBgOpacity: 0.08,
    },
  },
})
</script>

<template>
  <view class="charts-box">
    <qiun-data-charts type="column" :opts="opts" :chartData="chartData" />
  </view>
</template>

<style scoped>
echarts {
  width: 100%;
  height: 500rpx;
}
</style>
