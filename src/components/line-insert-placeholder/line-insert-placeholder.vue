<template>
  <div class="line-insert-placeholder" :style="style">
    <div v-if="propConfig.direction === 'horizontal'" class="horizontal">
      <div class="triangle-left"></div>
      <div class="horizontal-line"></div>
      <div class="triangle-right"></div>
    </div>

    <div v-else class="vertical">
      <div class="triangle-top"></div>
      <div class="vertical-line"></div>
      <div class="triangle-bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IStyle } from '@/interface-type'

defineProps<{
  style: IStyle
  propConfig: any
}>()
</script>

<style scoped>
.line-insert-placeholder {
  display: inline-block;
  position: absolute;
  z-index: 100;
}

.horizontal,
.vertical {
  position: relative;
  display: flex;
  align-items: center;
  width: inherit;
  height: inherit;
}

.horizontal {
  flex-direction: row;
}

.vertical {
  flex-direction: column;
}

.horizontal-line {
  width: 100%;
  height: 1px;
  background: rgb(8, 190, 245);
}

.vertical-line {
  width: 1px;
  height: 100%;
  background: rgb(8, 190, 245);
}

.triangle-left,
.triangle-right,
.triangle-top,
.triangle-bottom {
  position: absolute;
  width: 0;
  height: 0;
  border: 7px solid transparent;
}

.triangle-left {
  left: 0;
  border-left: 7px solid rgb(8, 190, 245);
}

.triangle-right {
  right: 0;
  border-right: 7px solid rgb(8, 190, 245);
}

.triangle-top {
  top: 0;
  border-top: 7px solid rgb(8, 190, 245);
}

.triangle-bottom {
  bottom: 0;
  border-bottom: 7px solid rgb(8, 190, 245);
}
</style>
