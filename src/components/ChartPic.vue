<script setup>
import { ref } from 'vue'
import qiunDataCharts from '@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'

const picData = defineModel()
const chartData = computed(() => ({
  series: [
    {
      data: picData.value,
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
  padding: [5, 5, 5, 5],
  enableScroll: false,
  extra: {
    pie: {
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 15,
      border: true,
      borderWidth: 3,
      borderColor: '#FFFFFF',
      linearType: 'custom',
    },
  },
})
</script>

<template>
  <view class="charts-box">
    <qiun-data-charts type="pie" :opts="opts" :chartData="chartData" />
  </view>
</template>

<style scoped>
.charts-box {
  width: 100%;
}
</style>
