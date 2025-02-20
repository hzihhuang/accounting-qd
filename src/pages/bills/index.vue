<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="about">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '账目',
  },
}
</route>
<script lang="ts" setup>
import { useBillsStore } from '@/store'
import Bill from './components/Bill.vue'
import { storeToRefs } from 'pinia'

const { data } = storeToRefs(useBillsStore())
// 将数据根据天分组
const groupedData = computed(() => {
  if (data.value.length === 0) return []
  const result: { time: string; list: typeof data.value }[] = []
  data.value.forEach((item) => {
    const time = new Date(item.createdAt).toLocaleDateString('zh-CN') // 处理时区，格式 YYYY/MM/DD
    let group = result.find((g) => g.time === time)
    if (!group) {
      group = { time, list: [] }
      result.push(group)
    }
    group.list.push(item)
  })
  return result
})
</script>
<template>
  <Bill :date="item.time" v-for="item in groupedData" :key="item.time" :list="item.list" />
</template>
