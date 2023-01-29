<template>
  <div class="modal-list" v-if="modalList?.length">
    <div class="modal-preview" :key="item.uuid" v-for="item in modalList" @click="handleClick(item)">
      <div class="image"></div>
      <span class="title">{{ item.property.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/editor'

const editStore = useEditStore()
const modalList = computed(() => {
  console.log(15, editStore.currentPage.components)
  return editStore.currentPage.components?.filter(item => {
    if (item.type === 'modal') return item
  })
})

const handleClick = (item: Component) => {
  editStore.setComponent(item.uuid)
  editStore.openModal(item.uuid)
}
</script>

<style scoped lang="less">
.modal-list {
  width: 100px;
  padding: 8px;
  background: #fff;
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
    height: 62px;
    border-radius: 4px;
    border: 1px solid #eee;
    box-sizing: border-box;

    &:hover {
      border: 1px solid #409eff;
    }
  }
}
</style>
