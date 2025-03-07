<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
</script>
<template>
  <StatusBar>记账本</StatusBar>
</template>

<style lang="scss"></style>
