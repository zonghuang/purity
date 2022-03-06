<template>
  <div class="line-insert-placeholder" :style="style">
    <div v-if="propConfig.direction === 'horizontal'" class="horizontal-line-insert-placeholder">
      <div class="triangle-left"></div>
      <div class="horizontal-line"></div>
      <div class="triangle-right"></div>
    </div>

    <div v-else class="vertical-line-insert-placeholder">
      <div class="triangle-top"></div>
      <div class="vertical-line"></div>
      <div class="triangle-bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  style: any
  propConfig: any
}>()
</script>

<style scoped>
.line-insert-placeholder {
  display: inline-block;
  position: absolute;
  z-index: 1;
}
.horizontal-line-insert-placeholder {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: inherit;
  height: inherit;
}

.vertical-line-insert-placeholder {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: inherit;
  height: inherit;
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

.triangle-left {
  position: absolute;
  left: 0;
  width: 0;
  height: 0;
  border: 7px solid transparent;
  border-left: 7px solid rgb(8, 190, 245);
}

.triangle-right {
  position: absolute;
  right: 0;
  width: 0;
  height: 0;
  border: 7px solid transparent;
  border-right: 7px solid rgb(8, 190, 245);
}

.triangle-top {
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
  border: 7px solid transparent;
  border-top: 7px solid rgb(8, 190, 245);
}

.triangle-bottom {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border: 7px solid transparent;
  border-bottom: 7px solid rgb(8, 190, 245);
}
</style>
