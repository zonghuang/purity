<template>
  <dialog class="modal" :open="visible">
    <div class="modal-header">
      <h4 class="modal-title">{{ label }}</h4>
      <span class="modal-close" @click="closeModal">
        <el-icon><close /></el-icon>
      </span>
    </div>

    <div class="modal-container">
      <slot></slot>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  property: {
    label?: string
    width?: string
    title?: string
  }
}>()
const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})

const label = computed(() => (props.property.label))
const width = computed(() => (props.property.width))

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

.modal {
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: calc(100% - 50px);
  max-height: calc(100% - 50px);
  width: v-bind(width);
  padding: 20px;
  // border: none;
  border-radius: 8px;

  height: 320px;
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
