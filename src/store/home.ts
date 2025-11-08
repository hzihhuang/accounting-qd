import { getBillsApi } from '@/api/bills'
import { getHomeInfo } from '@/api/home'
import { Pages } from '@/enums/pages'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHomeStore = defineStore(
  'home',
  () => {
    const info = ref({
      balance: 0,
      monthIncome: 0,
      monthPay: 0,
      bills: [],
    })
    const onSearch = () => {
      getHomeInfo().then((res) => {
        if (res.success) {
          info.value = Object.assign(info.value, res.data)
        }
      })
      const month = dayjs()
      getBillsApi({
        startDate: month.startOf('month').format('YYYY-MM-DD'),
        endDate: month.endOf('month').format('YYYY-MM-DD'),
      }).then((res) => {
        info.value = Object.assign(info.value, { bills: res.data.list })
      })
    }
    return {
      info,
      onSearch,
    }
  },
  {
    persist: true,
  },
)
