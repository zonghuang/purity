<template>
  <div class="zh-date-picker form-item" :class="componentClass">
    <label class="form-item_label" :class="lableClass">
      {{ propConfig.label }}
      <abbr v-if="required" title="required">*</abbr>
    </label>
    <div class="form-item_content">
      <el-date-picker
        v-model="value"
        :type="type"
        :placeholder="propConfig.placeholder"
        :rangeSeparator="rangeSeparator"
        :startPlaceholder="startPlaceholder"
        :endPlaceholder="endPlaceholder"
        :format="format"
        :valueFormat="valueFormat"
      />
      <div class="invalid">{{ validTips }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: any
  propConfig: any
}>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})
const required = computed(() => props.propConfig.required)
const labelWidth = computed(() => props.propConfig.labelWidth)
const labelPosition = computed(() => props.propConfig.labelPosition)
const type = computed(() => props.propConfig.type ? 'daterange' : 'date')
const format = computed(() => props.propConfig.format)
const valueFormat = computed(() => props.propConfig.valueFormat)
const rangeSeparator = computed(() => props.propConfig.rangeSeparator)
const startPlaceholder = computed(() => props.propConfig.startPlaceholder)
const endPlaceholder = computed(() => props.propConfig.endPlaceholder)
const validTips = ''  // 校验规则 rules 后续完善

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
:deep(.el-date-editor) {
  width: 100%;
}

.form-item_label {
  width: v-bind(labelWidth);
}
</style>
