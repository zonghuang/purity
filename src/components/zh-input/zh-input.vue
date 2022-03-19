<template>
  <div :class="componentClass">
    <label :class="lableClass" :for="propConfig.field">
      {{ propConfig.label }} <abbr v-if="required" title="required">*</abbr>
    </label>
    <div class="form-content">
      <el-input
        v-model="value"
        @input="updateValue"
        :name="propConfig.field"
        :placeholder="propConfig.placeholder"
      />
      <div class="invalid">{{ validTips }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  propConfig: any
}>()
const emit = defineEmits(['update'])

const value = ref(props.modelValue)
const required = computed(() => props.propConfig.required)
const labelWidth = computed(() => props.propConfig.labelWidth)
const labelPosition = computed(() => props.propConfig.labelPosition)
const validTips = ''  // 校验规则 rules 后续完善

const componentClass = computed(() => {
  const arr = ['form-item', 'zh-input']
  if (['left', 'right'].includes(labelPosition.value)) 
    arr.push('zh-input-inline')
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

.zh-input {
  width: 100%;
}

.zh-input-inline {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.form-label {
  display: inline-block;
  width: v-bind(labelWidth);
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
