<template>
  <div class="zh-radio form-item" :class="componentClass">
    <label class="form-item_label" :class="lableClass">
      {{ propConfig.label }}
      <abbr v-if="required" title="required">*</abbr>
    </label>
    <div class="form-item_content">
      <el-radio-group v-model="value">
        <el-radio v-for="item in options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
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
const options = computed(() => props.propConfig.options)
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
.form-item_label {
  width: v-bind(labelWidth);
}
</style>
