import { BillInter } from '@/types/bills'
import { showToast } from '@/utils/globalToast'
import { httpDelete, httpGet } from '@/utils/http'

export const useBills = () => {
  const data = ref<BillInter[]>([])
  const groupedData = computed(() => {
    if (data.value.length === 0) return []
    const result: { time: string; list: typeof data.value }[] = []
    data.value.forEach((item) => {
      const time = new Date(item.date).toLocaleDateString('zh-CN') // 处理时区，格式 YYYY/MM/DD
      let group = result.find((g) => g.time === time)
      if (!group) {
        group = { time, list: [] }
        result.push(group)
      }
      group.list.push(item)
    })
    return result
  })
  onBeforeMount(() => {
    httpGet('bills', {
      page: 1,
      pageSize: 0,
    }).then((res) => {
      data.value = res.data as any
    })
  })
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
