<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
// 虽然这里没有调用，但解决了请求时 loading 显示异常问题（初步判断是没有全局注册的原因）后续解决
const openElLoading = () => ElLoading.service({})
</script>
