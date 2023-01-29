<template>
  <div class="zh-modal">
    <el-dialog
      v-if="!editing"
      :modal="modal"
      :fullscreen="fullscreen"
      :close-on-click-modal="closeOnClickModal"
      v-model="visible"
      :title="title"
      :width="width"
      :before-close="closeModal"
    >
      <div class="modal-container">
        <slot></slot>
      </div>
    </el-dialog>

    <!-- 编辑时，使用 Element Plus 的对话框，无法满足需求，出现各种问题。因此自定义模态框 (仅用于编辑时) -->
    <!-- 功能需日益完善，逐渐接近于 Element Plus 的对话框 -->
    <dialog v-else class="my-modal" :open="visible">
      <div class="modal-header">
        <h4 class="modal-title">{{ title }}</h4>
        <span class="modal-close" @click="closeModal">
          <el-icon><close /></el-icon>
        </span>
      </div>

      <div class="modal-container">
        <slot></slot>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { _useRoute } from '@/hooks'

const route = _useRoute()
const props = defineProps(['modelValue', 'property'])

const editing = computed(() => route.path === '/editor')
const visible = computed({
  get: () => props.property.visible,
  set: (newValue: boolean) => props.property.visible = newValue
})
const title = computed(() => (props.property.label))
const width = computed(() => (props.property.width))
const modal = computed(() => (props.property.modal))
const fullscreen = computed(() => (props.property.fullscreen))
const closeOnClickModal = computed(() => (props.property.closeOnClickModal))

const closeModal = () => visible.value = false
const closedFn = (ev: KeyboardEvent) => ev.code === 'Escape' && closeModal()
watch(visible, newValue => {
  if (newValue) {
    document.addEventListener('keyup', closedFn)
  } else {
    document.removeEventListener('keyup', closedFn)
  }
}, {
  immediate: true
})
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
  max-width: calc(100% - 30px);
  max-height: calc(100% - 30px);
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

// 自定义模态框
.my-modal {
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: calc(100% - 50px);
  max-height: calc(100% - 50px);
  width: v-bind(width);
  padding: 20px;
  border: none;
  border-radius: 8px;
}

.modal-header {
  display: flex;
  align-items: center;
  height: 25px;

  .modal-title {
    flex: 1;
    margin: 0;
    font-size: 18px;
    color: #303133;
  }

  .modal-close {
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }
}
</style>
