<template>
  <div :class="componentClass">
    <label :class="lableClass" :for="propConfig.field">
      {{ propConfig.label }} <abbr v-if="required" title="required">*</abbr>
    </label>
    <div class="form-content">
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
  const classes = ['form-item', 'zh-text']
  if (labelPosition.value === 'left' || labelPosition.value === 'right') 
    classes.push('zh-form-item-inline')
  return classes
})

const lableClass = computed(() => {
  const classes = ['form-label']
  if (labelPosition.value === 'top') 
    classes.push('label-position-top')
  if (labelPosition.value === 'right') 
    classes.push('label-position-right')
  return classes
})
</script>

<style scoped lang="less">
abbr {
  color: #f56c6c;
}
.zh-text {
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
</style>
