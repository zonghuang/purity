<template>
  <!-- <el-button :uuid="uuid" type="primary" size="medium">{{propValue}}</el-button> -->
  <div class="box">

  </div>

</template>

<script setup lang="ts">
defineProps<{
  uuid: string,
  propValue: string,
}>()
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background: orange;
  border-radius: 8px;
}
</style>

