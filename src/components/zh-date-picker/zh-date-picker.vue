<template>
  <div :class="componentClass">
    <label :class="lableClass" :for="propConfig.field">
      {{ propConfig.label }} <abbr v-if="required" title="required">*</abbr>
    </label>
    <div class="form-content">
      <el-date-picker
        v-model="value"
        @change="updateValue"
        :type="type"
        :name="propConfig.field"
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
const emit = defineEmits(['update'])

const value = ref(props.modelValue)
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
  const arr = ['form-item', 'zh-date-picker']
  if (['left', 'right'].includes(labelPosition.value)) 
    arr.push('zh-form-item-inline')
  return arr
})

const lableClass = computed(() => {
  const arr = ['form-label']
  if (labelPosition.value === 'top') 
    arr.push('label-position-top')
  if (labelPosition.value === 'right') 
    arr.push('label-position-right')
  return arr
})

const stopWatch = watch(() => props.modelValue, (newValue) => {
  value.value = newValue
})
onUnmounted(() => stopWatch())

const updateValue = () => {
  emit('update', value.value)
}
</script>

<style scoped lang="less">
abbr {
  color: #f56c6c;
}

.zh-date-picker {
  width: 100%;
}

:deep(.el-date-editor) {
  width: 100%;
}

.zh-form-item-inline {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.form-label {
  display: inline-block;
  width: v-bind(labelWidth);
  color: #606266;
  font-size: 14px;
}

.form-content {
  width: 100%;
}
.label-position-top {
  margin-bottom: 8px;
}

.label-position-right {
  padding-right: 20px;
  text-align: right;
}

.invalid {
  position: absolute;
  margin-top: 4px;
  font-size: 10px;
  color: #f56c6c;
}
</style>
