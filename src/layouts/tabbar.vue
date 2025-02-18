<template>
  <wd-config-provider>
    <slot />
    <AccountingTabbar />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import AccountingTabbar from '@/components/AccountingTabbar/index.vue'
</script>
