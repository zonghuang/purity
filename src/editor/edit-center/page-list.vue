<template>
  <ul class="page-list">
    <li @click="createPage">+</li>
    <li
      :class="{ active: page.id === currentPageId }"
      v-for="page in pageList"
      :key="page.id"
      @click="changePage(page.id)"
    >
      {{ page.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'

const editStore = useEditStore()

const currentPageId = computed(() => editStore.currentPage.id)
const pageList = computed(() =>
  editStore.pages.map(page => {
    return { id: page.id, name: page.name }
  })
)

function createPage() {
  editStore.createPage()
  editStore.recordSnapshot()
}

function changePage(pageId: string) {
  editStore.changePage(pageId)
}
</script>

<style scoped lang="less">
.page-list {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0;
  padding-left: 8px;
  height: 42px;
  list-style: none;

  li {
    position: relative;

    &:after {
      content: "";
      position: absolute;
      width: 1px;
      height: 16px;
      right: -10px;
      top: 50%;
      transform: translateY(-50%);
      background-color: var(--el-border-color-base);
    }

    &:hover {
      cursor: pointer;
      color: #409eff;
    }
  }

  .active {
    color: #409eff;
  }
}
</style>