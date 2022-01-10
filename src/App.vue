<template>
  <router-view></router-view>
  <!-- <Render :elements="elements" /> -->
  <!-- <lyy-btn></lyy-btn> -->
</template>

<script setup lang="ts">
import { ref } from "vue";

import { IElement } from "./editor/interface";
import { loopElements } from "./editor/mock-data";

const elements = ref<IElement[]>(loopElements);
</script>

<style lang="less">
.lib,
.layer,
.prop-config,
.event-config,
.style-config,
.animation-config,
.page-config {
  height: calc(100vh - 45px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
