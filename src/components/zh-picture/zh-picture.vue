<!-- 未完善的图片上传组件 -->
<template>
  <div :class="componentClass">
    <label :class="lableClass" :for="propConfig.field">
      {{ propConfig.label }} <abbr v-if="required" title="required">*</abbr>
    </label>
    <div class="form-content">
      <el-upload
        action="https://flya.kedlink.com/sso-server/api/upload"
        :headers="headers"
        list-type="picture-card"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
      <div class="invalid">{{ validTips }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadProps, UploadUserFile } from 'element-plus';
import localCache from '@/utils/cache'

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
  const classes = ['form-item', 'zh-picture']
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


// 临时的
const token = localCache.getCache('token')
if (!token) ElMessage.error('token 无效')
const headers = reactive({ 'sso-token': token })
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const fileList = ref<UploadUserFile[]>([
  {
    name: 'github.jpeg',
    url: 'https://lyy-public.oss-cn-shenzhen.aliyuncs.com/s1000000/20220405/1yPYearU.jpg',
  }
])

const stopWatch1 = watch(() => fileList.value, newValue => {
  value.value = newValue[newValue.length - 1].url!
  emit('update', value.value)
})
onUnmounted(() => stopWatch1())

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleRemove = () => {

}
</script>

<style scoped lang="less">
abbr {
  color: #f56c6c;
}

.zh-picture {
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

:deep(.el-upload-list__item) {
  width: 36px;
  height: 36px;
  .el-upload-list__item-thumbnail {
    object-fit: cover;
  }
}
:deep(.el-upload--picture-card) {
  width: 36px;
  height: 36px;
}
</style>
