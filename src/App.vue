<template>
  <router-view></router-view>
</template>

<script setup lang="ts">

// 虽然这里没有调用，但解决了请求时 loading 显示异常问题（初步判断是没有全局注册的原因）后续解决
const openElLoading = () => ElLoading.service({})
</script>

<style lang="less">
.lib,
.layer,
.prop-config,
.event-config,
.style-config,
.animation-config,
.page-config {
  max-height: calc(100vh - 45px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}

// * {
//   -webkit-box-sizing: border-box;
//      -moz-box-sizing: border-box;
//           box-sizing: border-box;
// }

body {
  // background: #f5f5f5;
  font-size: 14px;
}
</style>
