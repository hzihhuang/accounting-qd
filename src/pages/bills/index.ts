import { BillInter } from '@/types/bills'
import { formatTime } from '@/utils/fun'
import { showToast } from '@/utils/globalToast'
import { httpDelete, httpGet } from '@/utils/http'

export const useBills = (time: globalThis.Ref<number, number>) => {
  const data = ref<BillInter[]>([])

  const groupedData = computed(() => {
    if (data.value.length === 0) return []
    const result: {
      time: string
      incomeSum: number
      expenseSum: number
      list: typeof data.value
    }[] = []
    data.value.forEach((item) => {
      const time = new Date(item.date).toLocaleDateString('zh-CN') // 处理时区，格式 YYYY/MM/DD
      let group = result.find((g) => g.time === time)
      if (!group) {
        group = { time, incomeSum: 0, expenseSum: 0, list: [] }
        result.push(group)
      }
      group.list.push(item)
      // 累加收入和支出
      if (item.type === 'income') {
        group.incomeSum += item.amount
      } else if (item.type === 'expense') {
        group.expenseSum += item.amount
      }
    })
    return result
  })

  const curDate = computed(() => formatTime(time.value, 'YYYY-MM'))
  const refresh = () => {
    httpGet('bills', {
      page: 1,
      pageSize: 0,
      date: curDate.value,
    }).then((res: any) => {
      data.value = res.data.list as BillInter[]
    })
  }

  watch([curDate], (c, v) => {
    refresh()
  })
  onShow(() => refresh())

  const onDelete = (id: number) => {
    showToast().loading('删除中')
    httpDelete('bills', id).then(() => {
      showToast().success('删除成功')
      data.value = data.value.filter((item: any) => item.id !== id)
    })
  }
  const onDetail = (id: number) => {}

  return {
    groupedData,
    onDelete,
    onDetail,
  }
}
