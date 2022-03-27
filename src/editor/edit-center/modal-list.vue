<template>
  <div class="modal-list">
    <div
      class="modal-preview"
      :key="item.id"
      v-for="item in modalList"
      @click="handleClick(item)"
    >
      <div class="image"></div>
      <span class="title">{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'

const editStore = useEditStore()
const modalList = computed(() => editStore.currentPage.modalList)

const handleClick = (item: any) => {
  editStore.setComponent(item.id)
  editStore.openModal(item.id)
}
</script>

<style scoped lang="less">
.modal-list {
  width: 100px;

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

    .title {
      font-size: 14px;
    }
  }
}
</style>