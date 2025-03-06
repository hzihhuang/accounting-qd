import { tabBar } from '@/pages.json'
import { httpGet } from '@/utils/http'

export interface ITag {
  id: number
  name: string
  icon: string
  type: IAccountingTypeEnum
}
export enum IAccountingTypeEnum {
  expense = 'expense',
  income = 'income',
}

/**
 * 核心切换能力
 */
export const useTabbar = (handleAdd: () => void) => {
  const tabbarList = computed(() => {
    if (!tabBar?.list?.length) return [] // 避免 tabBar.list 为空或未定义时报错
    const processedList = tabBar.list.map((item) => ({
      ...item,
      path: `/${item.pagePath}`,
    }))
    const addItem = { name: 'add', icon: 'add', text: '', path: '' }
    const midIndex = Math.floor(processedList.length / 2)

    return [...processedList.slice(0, midIndex), addItem, ...processedList.slice(midIndex)]
  })

  const currentTabbar = computed(
    () => uni.getStorageSync('app-tabbar-name') || tabbarList.value[0]?.name,
  )

  onMounted(() => {
    uni.switchTab({ url: tabbarList.value.find((i) => i.name === currentTabbar.value)?.path })
  })

  function selectTabBar({ value: name }: { value: string }) {
    const item = tabbarList.value.find((i) => i.name === name)
    if (item.name !== 'add') {
      uni.setStorageSync('app-tabbar-name', name)
      uni.switchTab({ url: item.path })
      return
    }
    // 这里是 add 逻辑
    handleAdd()
  }

  return {
    currentTabbar,
    selectTabBar,
    tabbarList,
  }
}

/**
 * 增加账单能力
 */
export const useAddBill = (show: globalThis.Ref<boolean, boolean>) => {
  const tags = ref<ITag[]>([])
  const currentType = ref<IAccountingTypeEnum>(IAccountingTypeEnum.expense)
  const useTags = computed(() => {
    switch (currentType.value) {
      case IAccountingTypeEnum.expense:
        return tags.value.filter((i) => i.type === IAccountingTypeEnum.expense)
      case IAccountingTypeEnum.income:
        return tags.value.filter((i) => i.type === IAccountingTypeEnum.income)
      default:
        return tags.value
    }
  })

  const activeTagId = ref()
  const amount = ref(0)
  const date = ref(new Date().getTime())

  const handleSwitchTag = (id: number) => {
    activeTagId.value = id
  }
  const handleCloseAddBill = () => {
    show.value = false
  }
  const handleSubmitAddBill = () => {
    console.log(activeTagId.value)
  }

  onShow(() => {
    httpGet<ITag[]>('tags').then((res) => {
      tags.value = res.data
    })
  })

  return {
    useTags,
    activeTagId,
    amount,
    date,
    currentType,
    handleCloseAddBill,
    handleSubmitAddBill,
    handleSwitchTag,
  }
}

export const useBillDate = () => {
  const DEFAULT_DATE = new Date().getTime()
  const showDate = ref(false)
  const cacheDate = ref(DEFAULT_DATE)
  const billDate = ref(DEFAULT_DATE)
  const handleDateChange = (e: any) => {
    if (typeof e === 'string') {
      showDate.value = false
      billDate.value = cacheDate.value
    } else {
      cacheDate.value = e.value
    }
  }

  const handleCancel = () => {
    billDate.value = DEFAULT_DATE
    cacheDate.value = DEFAULT_DATE
  }

  return {
    DEFAULT_DATE,
    showDate,
    handleCancel,
    handleDateChange,
    billDate,
    cacheDate,
  }
}
