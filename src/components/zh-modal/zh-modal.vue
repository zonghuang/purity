<template>
  <div class="zh-modal">
    <el-dialog
      v-model="visible"
      :title="title"
      :width="width"
      :before-close="handleClose"
    >
      <div>{{ uuid }}: This is a message</div>
      <slot></slot>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="handleClose"
            >Confirm</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditStore } from '../../editor/store/edit'

const editStore = useEditStore()
const props = defineProps(['uuid', 'propValue', 'propConfig'])

const uuid = computed(() => (props.uuid))
const title = computed(() => (props.propConfig.title))
const width = computed(() => (props.propConfig.width))
const visible = computed(() => (props.propConfig.visible))

const handleClose = () => editStore.closeModal(uuid.value)
</script>

<style scoped lang="less">
:deep(.el-dialog) {
  border-radius: 8px;
  display: flex;
  display: -ms-flex; /* 兼容IE */
  flex-direction: column;
  -ms-flex-direction: column; /* 兼容IE */
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
:deep(.el-dialog .el-dialog__body) {
  max-height: 100%;
  flex: 1;
  -ms-flex: 1 1 auto; /* 兼容IE */
  overflow-y: auto;
  overflow-x: hidden;
}

:deep(.el-dialog__wrapper) {
  /*隐藏ie和edge中遮罩的滚动条*/
  overflow: hidden;
}
</style>
