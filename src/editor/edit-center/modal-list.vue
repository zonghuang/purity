<template>
  <div class="modal-list">
    <div class="modal-preview" :key="item.uuid" v-for="item in modalList" @click="handleClick(item)">
      <div class="image"></div>
      <span class="title">{{ item.propConfig.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IElement } from '@/interface-type'
import { useEditStore } from '@/store/edit'

const editStore = useEditStore()
const modalList = computed(() => {
  return editStore.currentPage.elements?.filter(item => {
    if (item.type === 'modal') return item
  })
})

const handleClick = (item: IElement) => {
  editStore.setComponent(item.uuid)
  editStore.openModal(item.uuid)
}
</script>

<style scoped lang="less">
.modal-list {
  width: 100px;
}

.modal-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 4px;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    color: #409eff;
  }

  .image {
    width: 100px;
    height: 65px;
    border-radius: 4px;
    border: 1px solid #eee;

    &:hover {
      border: 1px solid #409eff;
    }
  }
}
</style>
