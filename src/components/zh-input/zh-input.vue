<template>
  <div
    class="form-item zh-input"
    :class="{ 'zh-input-inline': labelPosition === 'left' || labelPosition === 'right' }" >
    <label
      class="form-label"
      :class="{ 'label-position-top': labelPosition === 'top',
                'label-position-right': labelPosition === 'right'
              }"
      :for="propConfig.field">
      {{ propConfig.label }} <abbr title="required">*</abbr>
    </label>
    <div class="form-content">
      <el-input :name="propConfig.field" v-model="modelValue" :placeholder="propConfig.placeholder" />
      <div class="invalid">{{ validTips }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  propConfig: any
}>()

const labelWidth = computed(() => (props.propConfig.labelWidth))
const labelPosition = computed(() => props.propConfig.labelPosition)

// 校验规则 rules 后续完善
const validTips = ''
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
