<template>
  <wd-config-provider>
    <slot />
    <!-- 注意下面，多了一个自定义tabbar -->
    <fg-tabbar />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>
