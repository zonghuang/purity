<template>
  <router-view></router-view>
</template>

<script setup lang="ts">

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

// body {
//   background: #f5f5f5;
// }
</style>
