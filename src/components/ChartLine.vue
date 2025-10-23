<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import UCharts from '@qiun/ucharts'

const uChartsInstance: Record<string, any> = {}

const cWidth = ref(0)
const cHeight = ref(0)

const tap = (e) => {
  const chart = uChartsInstance[e.target.id]
  if (chart) {
    chart.touchLegend(e)
    chart.showToolTip(e)
  }
}

const drawCharts = (id: string, data: any) => {
  const ctx = uni.createCanvasContext(id)
  uChartsInstance[id] = new UCharts({
    type: 'column',
    context: ctx,
    width: cWidth.value,
    height: cHeight.value,
    categories: data.categories,
    series: data.series,
    animation: true,
    background: '#FFFFFF',
    padding: [20, 15, 20, 10], // ✅ 扩大上下间距防止截断
    xAxis: {
      disableGrid: false,
      fontSize: 10,
      rotateLabel: true,
    },
    yAxis: {
      splitNumber: 5,
      data: [{ min: 0 }],
    },
    extra: {
      column: {
        type: 'group',
        width: 30, // ✅ 调整柱宽
      },
    },
  })
}

const getServerData = () => {
  const res = {
    categories: ['2016', '2017', '2018', '2019', '2020', '2021'],
    series: [
      { name: '目标值', data: [35, 36, 31, 33, 13, 34] },
      { name: '完成量', data: [18, 27, 21, 24, 6, 28] },
    ],
  }
  drawCharts('bbb', res)
}

const onReady = () => {
  // ✅ 自适应屏幕宽度
  const screenWidth = uni.getSystemInfoSync().windowWidth
  cWidth.value = screenWidth - 20 // 留点边距
  cHeight.value = uni.upx2px(500)
  getServerData()
}

onMounted(() => {
  onReady()
})
</script>

<template>
  <view class="chart-container">
    <canvas
      canvas-id="column"
      id="column"
      class="charts"
      :style="{ width: cWidth + 'px', height: cHeight + 'px' }"
      @touchend="tap"
    />
  </view>
</template>

<style lang="scss" scoped>
.chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rpx;
  background-color: #fff;
}

.charts {
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}
</style>
