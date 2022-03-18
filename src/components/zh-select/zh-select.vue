<template>
  <div class="box">
    {{ uuid }}
  </div>

</template>

<script setup lang="ts">
defineProps<{
  uuid: string
  modelValue: string
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

