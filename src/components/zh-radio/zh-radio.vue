<template>
  <div :class="componentClass">
    <label :class="lableClass" :for="propConfig.field">
      {{ propConfig.label }} <abbr v-if="required" title="required">*</abbr>
    </label>
    <div class="form-content">
      <el-radio-group v-model="value" @change="updateValue">
        <el-radio v-for="item in options" :key="item.value" :label="item.value">
          {{item.label}} 
        </el-radio>
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
const emit = defineEmits(['update'])

const value = ref(props.modelValue)
const required = computed(() => props.propConfig.required)
const labelWidth = computed(() => props.propConfig.labelWidth)
const labelPosition = computed(() => props.propConfig.labelPosition)
const options = computed(() => props.propConfig.options)
const validTips = ''  // 校验规则 rules 后续完善

const componentClass = computed(() => {
  const classes = ['form-item', 'zh-radio']
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

const stopWatch = watch(() => props.modelValue, newValue => value.value = newValue)
onUnmounted(() => stopWatch())

const updateValue = () => emit('update', value.value)
</script>

<style scoped lang="less">
abbr {
  color: #f56c6c;
}

.zh-radio {
  width: 100%;
}

// .el-radio {
//   width: 100%;
// }

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

.invalid {
  position: absolute;
  margin-top: 4px;
  font-size: 10px;
  color: #f56c6c;
}
</style>
