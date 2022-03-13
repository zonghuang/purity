<template>
  <div class="zh-modal">
    <el-dialog
      v-if="!editing"
      :modal="modal"
      :close-on-click-modal="closeOnClickModal"
      v-model="visible"
      :title="title"
      :width="width"
      :before-close="closeModal"
    >
      <div class="modal-container">
        {{ uuid }}: This is a message
        <slot></slot>
      </div>
    </el-dialog>

    <!-- 编辑时，使用 Element Plus 的对话框，无法满足需求，出现各种问题。因此自定义模态框 (仅用于编辑时) -->
    <!-- 功能需日益完善，逐渐接近于 Element Plus 的对话框 -->
    <dialog v-else ref="myModal" class="my-modal" :open="visible">
      <div class="modal-header">
        <h4 class="modal-title">{{ title }}</h4>
        <span class="modal-close" @click="closeModal">
          <el-icon><close /></el-icon>
        </span>
      </div>

      <div class="modal-container">
        {{ uuid }}: This is a message
        <slot></slot>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'

const editStore = useEditStore()
const props = defineProps(['uuid', 'propValue', 'propConfig'])

const myModal = ref()

const editing = computed(() => editStore.editing)
const visible = computed({
  get: () => props.propConfig.visible,
  set: (val: boolean) => val
})
const uuid = computed(() => (props.uuid))
const title = computed(() => (props.propConfig.title))
const width = computed(() => (props.propConfig.width))
const modal = computed(() => (props.propConfig.modal))
const closeOnClickModal = computed(() => (props.propConfig.closeOnClickModal))


const closedFn = (ev: KeyboardEvent) => {
  const codes = ['Escape', 'Enter', 'Space']
  if (codes.includes(ev.code)) closeModal()
}

const stopWatch = watch(visible, (newValue) => {
  if (newValue) {
    document.addEventListener('keyup', closedFn)
  } else {
    document.removeEventListener('keyup', closedFn)
  }
}, {
  immediate: true
})

onUnmounted(() => stopWatch())

const closeModal = () => {
  if (editing.value) myModal.value.close()
  editStore.closeModal(uuid.value)
}
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

.modal-container {

}
</style>
