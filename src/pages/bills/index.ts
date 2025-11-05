import { BillInter } from '@/types/bills'
import { watch } from 'vue'
import { httpDelete, httpGet } from '@/utils/http'
import dayjs from 'dayjs'
import { deleteBillApi, getBillsApi } from '@/api/bills'
import { showToast } from '@/utils/globalToast'

export const useBills = (time: globalThis.Ref<number, number>) => {
  const loading = ref(true)
  const list = ref<BillInter[]>([])
  const groupedData = computed(() => {
    if (list.value.length === 0) return []
    const result: {
      time: string
      incomeSum: number
      expenseSum: number
      list: typeof list.value
    }[] = []
    list.value.forEach((item) => {
      const time = new Date(item.date).toLocaleDateString('zh-CN') // 处理时区，格式 YYYY/MM/DD
      let group = result.find((g) => g.time === time)
      if (!group) {
        group = { time, incomeSum: 0, expenseSum: 0, list: [] }
        result.push(group)
      }
      group.list.push(item)
      // 累加收入和支出
      if (item.category.type === 'income') {
        group.incomeSum += item.price
      } else if (item.category.type === 'expense') {
        group.expenseSum += item.price
      }
    })
    return result
  })

  const onSearch = () => {
    loading.value = true
    const month = dayjs(time.value)
    getBillsApi({
      startDate: month.startOf('month').format('YYYY-MM-DD'),
      endDate: month.endOf('month').format('YYYY-MM-DD'),
    }).then((res) => {
      if (res.success) {
        list.value = res.data.list
      }
    })
  }
  const onDelete = (id: number) => {
    console.log(id, '123')
    deleteBillApi(id).then((res) => {
      if (res.success) {
        showToast().success('删除成功')
        onSearch()
      }
    })
  }
  const onDetail = (id: number) => {}

  onShow(() => onSearch())
  watch(() => time.value, onSearch)

  return {
    loading,
    groupedData,
    onDelete,
    onDetail,
  }
}
