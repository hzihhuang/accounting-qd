<script setup lang="ts">
import { icon, IconDefinition } from '@fortawesome/fontawesome-svg-core'

const { name } = defineProps<{
  name: IconDefinition
}>()
const svgHtml = icon(name).html[0] // **无需手动 import，自动导入**
</script>

<template>
  <view v-html="svgHtml"></view>
</template>
