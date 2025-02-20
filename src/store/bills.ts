import { showToast } from '@/utils/globalToast'
import { httpDelete, httpGet } from '@/utils/http'
import { defineStore } from 'pinia'

export const useBillsStore = defineStore(
  'bills',
  () => {
    const data = ref()
    onBeforeMount(() => {
      httpGet('bills', {
        page: 1,
        pageSize: 0,
        // date: '2025-01',
      }).then((res) => {
        data.value = res.data as any
      })
    })

    const handleDelete = (id: number) => {
      showToast().loading('删除中')
      httpDelete('bills', id)
        .then(() => {
          data.value = data.value.filter((item: any) => item.id !== id)
        })
        .catch(() => {})
    }
    return {
      data,
    }
  },
  {
    persist: true,
  },
)
