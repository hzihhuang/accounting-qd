<script lang="ts" setup>
import UCharts from '@qiun/ucharts'

const uChartsInstance = {}

const cWidth = ref(750)
const cHeight = ref(500)

const tap = (e) => {
  uChartsInstance[e.target.id].touchLegend(e)
  uChartsInstance[e.target.id].showToolTip(e)
}
const drawCharts = (id, data) => {
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
    padding: [15, 15, 0, 5],
    xAxis: {
      disableGrid: true,
    },
    yAxis: {
      data: [{ min: 0 }],
    },
    extra: {
      column: {
        type: 'group',
      },
    },
  })
}
const getServerData = () => {
  // 模拟从服务器获取数据时的延时
  setTimeout(() => {
    // 模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    const res = {
      categories: ['2016', '2017', '2018', '2019', '2020', '2021'],
      series: [
        {
          name: '目标值',
          data: [35, 36, 31, 33, 13, 34],
        },
        {
          name: '完成量',
          data: [18, 27, 21, 24, 6, 28],
        },
      ],
    }
    drawCharts('aaa', res)
  }, 500)
}
const onReady = () => {
  // 这里的 750 对应 css .charts 的 width
  cWidth.value = uni.upx2px(750)
  // 这里的 500 对应 css .charts 的 height
  cHeight.value = uni.upx2px(500)
  getServerData()
}

onMounted(() => {
  onReady()
})
</script>

<template>
  <view>
    <canvas canvas-id="column" id="column" class="charts" @touchend="tap" />
  </view>
</template>

<style lange="scss">
.charts {
  width: 100%;
}
</style>
