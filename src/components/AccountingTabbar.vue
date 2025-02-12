<script lang="ts" setup>
import { IncomeExpenditureEnum, IncomeExpenditureMap } from '@/enums/global'
import { tabBar } from '@/pages.json'
import { TagsObj } from '@/types/tag'
import { formatDate, isSameDay } from '@/utils/fun'
import { httpGet } from '@/utils/http'

/** tabbarList 里面的 path 从 pages.config.ts 得到 */
const tabbarList = tabBar.list.map((item) => ({ ...item, path: `/${item.pagePath}` }))
const addItem = { name: 'add', icon: 'add' }
const midIndex = Math.floor(tabbarList.length / 2)
tabbarList.splice(midIndex, 0, addItem as any)

const currentTabbar = computed(() => uni.getStorageSync('app-tabbar-name') || tabbarList[0].name)

function selectTabBar({ value: name }: { value: string }) {
  const url = tabbarList.find((i) => i.name === name)?.path
  if (url) {
    uni.setStorageSync('app-tabbar-name', name)
    uni.switchTab({ url })
    return
  }
  // 这里是 add 逻辑
  handleAdd()
}

const show = ref(false)
const type = ref(IncomeExpenditureMap.EXPENDITURE)
const activeTagId = ref()
const handleAdd = () => {
  show.value = true
}

// 标签
const tags = ref<TagsObj>({
  incomeTags: [],
  expenseTags: [],
})
onBeforeMount(async () => (tags.value = ((await httpGet('tags')) as any) ?? {}))
const currentTags = computed(() =>
  type.value === IncomeExpenditureMap.INCOME ? tags.value.expenseTags : tags.value.incomeTags,
)
const handleClickTag = (id: number) => {
  activeTagId.value = id
}

// 选择日期
const DEFAULT_DATE = new Date().getTime()
const showDate = ref(false)
const cacheDate = ref(DEFAULT_DATE)
const currentDate = ref(DEFAULT_DATE)
const handleDateChange = (e: any) => {
  if (typeof e === 'string') {
    showDate.value = false
    currentDate.value = cacheDate.value
  } else {
    cacheDate.value = e.value
  }
}
const handleCloseAdd = () => {
  show.value = false
  currentDate.value = DEFAULT_DATE
  cacheDate.value = DEFAULT_DATE
}

const handleAddTag = () => {}
</script>

<template>
  <wd-tabbar
    custom-class="accounting-tabbar"
    fixed
    shape="round"
    :modelValue="currentTabbar"
    bordered
    safeAreaInsetBottom
    placeholder
    @change="selectTabBar"
  >
    <wd-tabbar-item
      :custom-class="`tabbar-item-${i.name}`"
      :name="i.name"
      :title="i.text"
      :icon="i.icon"
      v-for="i in tabbarList"
      :key="i.name"
    ></wd-tabbar-item>
  </wd-tabbar>

  <!-- 添加标签 -->
  <wd-popup
    custom-class="add-tag-popup"
    v-model="show"
    @close="handleCloseAdd"
    position="bottom"
    lock-scroll
    closable
    :safe-area-inset-bottom="true"
  >
    <view class="flex items-center justify-center relative h-100">
      <view class="w-320">
        <wd-segmented
          size="small"
          :options="Object.values(IncomeExpenditureMap)"
          v-model:value="type"
        ></wd-segmented>
      </view>
    </view>
    <view class="flex items-center gap-48 px-32 mt-40">
      <wd-button
        custom-class="flex items-center gap-8 w-180"
        plain
        size="small"
        :icon="DEFAULT_DATE === currentDate ? 'time-filled' : undefined"
        @click="showDate = true"
      >
        {{ isSameDay(DEFAULT_DATE, currentDate) ? '今天' : formatDate(currentDate) }}
      </wd-button>
      <wd-input class="flex-1" type="number" placeholder="请输入金额" inputmode="numeric" />
      <wd-button custom-class="w-180" size="small" @click="handleAddTag">确定</wd-button>
    </view>
    <view class="tags grid grid-cols-5 w-fit" :style="{ justifySelf: 'center' }">
      <view
        :class="`tags-item flex flex-col items-center gap-8 ${i.id === activeTagId ? 'active' : ''}`"
        v-for="i in currentTags"
        :key="i.id"
        @click="handleClickTag(i.id)"
      >
        <view class="tags-item-icon w-100 h-100 rounded-full bg-gray-4"></view>
        <view class="tags-item-text fs-24 color-gray-5">{{ i.name }}</view>
      </view>
    </view>
  </wd-popup>

  <!-- 键盘 -->

  <!-- 日期 -->
  <wd-action-sheet v-model="showDate" title="选择日期" @close="currentDate = DEFAULT_DATE">
    <wd-calendar-view v-model="cacheDate" @change="handleDateChange" />
    <view class="px-48 flex mt-48">
      <wd-button class="flex-1" type="primary" @click="handleDateChange('submit')">确定</wd-button>
    </view>
  </wd-action-sheet>
</template>
