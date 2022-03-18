<template>
  <div class="zh-form">
    <slot></slot>

    <el-button @click="onSubmit">按钮</el-button>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  modelValue: string
  propConfig: any
  childrens?: any
}>()

const formData: any = reactive({})

const onSubmit = () => {
  console.log(props.childrens);
  props.childrens[0].propConfig.placeholder = '哈哈哈'
  console.log('onSubmit', formData)
}
</script>

<style scoped>
.zh-form {
  height: 100px;
}
</style>
