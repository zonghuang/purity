<!-- 未完善的图片上传组件 -->
<template>
  <div class="zh-picture form-item" :class="componentClass">
    <label class="form-item_label" :class="lableClass">
      {{ propConfig.label }}
      <abbr v-if="required" title="required">*</abbr>
    </label>
    <div class="form-item_content">
      <el-upload
        action="https://flya.kedlink.com/sso-server/api/upload"
        :headers="headers"
        list-type="picture-card"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
      <div class="invalid">{{ validTips }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadProps, UploadUserFile } from 'element-plus'
import localCache from '@/utils/cache'

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

// 临时的
const token = localCache.getCache('token')
// if (!token) ElMessage.error('token 无效')
const headers = reactive({ 'sso-token': token })
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const fileList = ref<UploadUserFile[]>([
  {
    name: 'github.jpeg',
    url: 'https://lyy-public.oss-cn-shenzhen.aliyuncs.com/s1000000/20220405/1yPYearU.jpg',
  }
])
watch(() => fileList.value, newValue => {
  value.value = newValue[newValue.length - 1].url!
})

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const handleRemove = () => {

}
</script>

<style scoped lang="less">
.form-item_label {
  width: v-bind(labelWidth);
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
