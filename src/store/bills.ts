import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { BillInter } from '@/types/bills'
import { deleteBillApi, getBillsApi } from '@/api/bills'
import { showToast } from '@/utils/globalToast'
import dayjs from 'dayjs'

export const useBillsStore = defineStore(
  'bills',
  () => {
    const loading = ref(true)
    const list = ref<BillInter[]>([])
    const time = ref(dayjs().valueOf()) // 默认当前时间

    // 按日期分组的数据
    const groupedData = computed(() => {
      if (list.value.length === 0) return []

      const result: {
        time: string
        incomeSum: number
        expenseSum: number
        list: typeof list.value
      }[] = []

      list.value.forEach((item) => {
        const time = new Date(item.date).toLocaleDateString('zh-CN')
        let group = result.find((g) => g.time === time)
        if (!group) {
          group = { time, incomeSum: 0, expenseSum: 0, list: [] }
          result.push(group)
        }
        group.list.push(item)

        if (item.category.type === 'income') {
          group.incomeSum += item.price
        } else if (item.category.type === 'expense') {
          group.expenseSum += item.price
        }
      })

      return result
    })

    // 搜索账单
    const onSearch = async () => {
      loading.value = true
      try {
        const month = dayjs(time.value)
        const res = await getBillsApi({
          startDate: month.startOf('month').format('YYYY-MM-DD'),
          endDate: month.endOf('month').format('YYYY-MM-DD'),
        })

        if (res.success) {
          list.value = res.data.list
        }
      } catch (error) {
        console.error('搜索账单失败:', error)
        showToast().error('搜索失败')
      } finally {
        loading.value = false
      }
    }

    // 删除账单
    const onDelete = async (id: number) => {
      try {
        const res = await deleteBillApi(id)
        if (res.success) {
          showToast().success('删除成功')
          await onSearch() // 重新加载数据
        }
      } catch (error) {
        console.error('删除账单失败:', error)
        showToast().error('删除失败')
      }
    }

    // 查看详情（可根据需要实现）
    const onDetail = (id: number) => {
      // 实现详情逻辑
      console.log('查看账单详情:', id)
    }

    // 设置时间
    const setTime = (newTime: number) => {
      time.value = newTime
    }

    // 监听时间变化自动搜索
    watch(time, onSearch, { immediate: false })

    return {
      // state
      loading,
      list,
      time,

      // getters
      groupedData,

      // actions
      onSearch,
      onDelete,
      onDetail,
      setTime,
    }
  },
  {
    persist: true,
  },
)
