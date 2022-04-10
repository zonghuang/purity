<template>
  <div class="zh-text form-item" :class="componentClass">
    <label class="form-item_label" :class="lableClass">
      {{ propConfig.label }}
      <abbr v-if="required" title="required">*</abbr>
    </label>
    <div class="form-item_content">
      <div v-html="modelValue"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  propConfig: any
}>()
const required = computed(() => props.propConfig.required)
const labelWidth = computed(() => props.propConfig.labelWidth)
const labelPosition = computed(() => props.propConfig.labelPosition)

const componentClass = computed(() => {
  if (labelPosition.value === 'left' || labelPosition.value === 'right')
    return 'form-item--inline'
})
const lableClass = computed(() => {
  if (labelPosition.value === 'top')
    return 'form-item_label--top'
  if (labelPosition.value === 'right')
    return 'form-item_label--right'
})
</script>

<style scoped lang="less">
.form-item_label {
  width: v-bind(labelWidth);
}
</style>
