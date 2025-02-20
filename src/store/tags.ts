import { TagsObj } from '@/types/tag'
import { httpGet } from '@/utils/http'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTagsStore = defineStore(
  'tags',
  () => {
    const tags = ref<TagsObj>({
      incomeTags: [],
      expenseTags: [],
    })
    onBeforeMount(async () => (tags.value = ((await httpGet('tags')) as any) ?? {}))
    return {
      tags,
    }
  },
  {
    persist: true,
  },
)
