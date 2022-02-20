<template>
  <div class="zh-button">
    <el-button :type="propConfig.type" size="medium">
      {{propValue}}
      <slot></slot>
    </el-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  uuid: string,
  propValue: string,
  propConfig: any
}>()
</script>

<style scoped>

</style>
