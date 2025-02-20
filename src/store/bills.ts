import { httpGet } from '@/utils/http'
import { defineStore } from 'pinia'

export const useBillsStore = defineStore(
  'bills',
  () => {
    const data = ref()
    onBeforeMount(() => {
      httpGet('bills', {
        page: 1,
        pageSize: 0,
        date: '2025-01',
      }).then((res) => {
        data.value = res.data as any
      })
    })
    return {
      data,
    }
  },
  {
    persist: true,
  },
)
