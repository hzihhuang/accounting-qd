import {
  getChartBarDataApi,
  getChartCategoryDataApi,
  getChartLineDataApi,
  getChartMonthsApi,
  getChartWeeksApi,
  getChartYearsApi,
} from '@/api/chart'
import { TimeTypeEnum, TransactionTypeEnum } from '@/enums/global'
import { defineStore } from 'pinia'
import { ref } from 'vue'

type InfoType = {
  weeks: { label: string; start: string; end: string }[]
  months: { label: string; start: string; end: string }[]
  years: { label: string; start: string; end: string }[]
}

export const useChartStore = defineStore(
  'chart',
  () => {
    const info = reactive<InfoType>({
      weeks: [],
      months: [],
      years: [],
    })
    const timeType = ref<TimeTypeEnum>(TimeTypeEnum.Week)
    const type = ref<TransactionTypeEnum>(TransactionTypeEnum.Expense)
    const list = computed(() => {
      switch (timeType.value) {
        case TimeTypeEnum.Week:
          return info.weeks
        case TimeTypeEnum.Month:
          return info.months
        case TimeTypeEnum.Year:
          return info.years
        default:
          return info.weeks
      }
    })

    const curActive = ref(list.value[0]?.label)
    watch([timeType, list], () => {
      curActive.value = list.value[0]?.label
      const item = list.value[0]
      if (item.start && item.end) {
        onSearch(item?.start, item?.end)
      }
    })

    const getFilterParams = () => {
      Promise.all([
        getChartWeeksApi({ type: type.value }),
        getChartMonthsApi({ type: type.value }),
        getChartYearsApi({ type: type.value }),
      ]).then((res) => {
        Object.assign(info, { weeks: res[0].data, months: res[1].data, years: res[2].data })
      })
    }

    const lineData = ref<{ id: number; name: string; value: number }[]>([])
    const picData = ref<{ id: number; name: string; value: number }[]>([])
    const barData = ref<{ id: number; name: string; value: number }[]>([])
    const onSearch = (startDate: string, endDate: string) => {
      Promise.all([
        getChartLineDataApi({
          type: type.value,
          startDate,
          endDate,
          mode: [TimeTypeEnum.Week, TimeTypeEnum.Month].includes(timeType.value) ? 'day' : 'month',
        }),
        getChartCategoryDataApi({
          type: type.value,
          startDate,
          endDate,
        }),
        getChartBarDataApi({
          type: type.value,
          startDate,
          endDate,
        }),
      ]).then((res) => {
        lineData.value = res[0].data.filter((i, idx) => idx <= 10) as any
        picData.value = res[1].data.filter((i, idx) => idx <= 10) as any
        barData.value = res[2].data.filter((i, idx) => idx <= 6) as any
      })
    }

    watch([type], getFilterParams, { immediate: true })
    return {
      timeType,
      type,
      list,
      curActive,
      lineData,
      picData,
      barData,
      onSearch,
    }
  },
  {
    persist: true,
  },
)
