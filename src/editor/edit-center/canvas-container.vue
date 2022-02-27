<template>
  <div id="canvas-container" class="canvas-container">
    <component-template :elements="elements" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useEditStore } from '../store/edit'
import { IElement } from "../interface"

const editStore = useEditStore()
const elements: IElement = computed(() => editStore.currentPage.elements)
</script>

<style scoped lang="less">
.canvas-container {
  position: relative;
  flex: 1;
  margin: 0 8px;
  height: 100%;
  overflow: scroll;
  // background-image: url('../assets/image/canvas.svg');
}
</style>
