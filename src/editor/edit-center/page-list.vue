<template>
  <div class="page-list" @click="closeContextmenu">
    <ul>
      <li @click="createPage">+</li>
      <li
        :class="{ active: page.id === currentPageId }"
        :key="page.id"
        v-for="page in pageList"
        @click="changePage(page.id)"
        @contextmenu="showContextmenu($event, page.id)"
      >
        {{ page.name }}

        <div v-if="contextmenu === page.id" class="context-menu">
          <div class="context-menu-item" @click="copyPage(page.id)">复制页</div>
          <div class="context-menu-item" @click="deletePage($event, page.id)">删除页</div>
          <div class="context-menu-item" @click="sortPage">重新排序</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'

const editStore = useEditStore()

const contextmenu = ref('')
const currentPageId = computed(() => editStore.currentPage.id)
const pageList = computed(() => 
  editStore.pages.map(page => {
    return { id: page.id, name: page.name }
  })
)

const createPage = () => {
  editStore.createPage()
  editStore.recordSnapshot()
}

const changePage = (pageId: string) => editStore.changePage(pageId)

const closeContextmenu = () => contextmenu.value = ''
const showContextmenu = (ev: MouseEvent, pageId: string) => {
  ev.preventDefault()
  contextmenu.value = pageId
}

const copyPage = (pageId: string) => editStore.copyPage(pageId)
const deletePage = (ev: MouseEvent, pageId: string) => {
  ev.preventDefault()
  ev.stopPropagation()
  if (editStore.pages.length === 1) {
    ElMessage({ type: 'warning', message: '只剩一页了，哥哥姐姐别删了！' })
    return
  }
  editStore.deletePage(pageId)
}
const sortPage = () => {
  ElMessage('此功能正在开发中...')
}
</script>

<style scoped lang="less">
.page-list {
  display: flex;
  align-items: flex-end;
  margin-top: 15px;
  font-size: 14px;

  ul {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 0;
    padding-left: 8px;
    width: 100%;
    height: 40px;
    list-style: none;
    border-top: 1px solid #eee;
    box-sizing: border-box;

    li {
      &:hover {
        cursor: pointer;
        color: #409eff;
      }
    }

    .active {
      color: #409eff;
    }
  }

  .context-menu {
    position: absolute;
    bottom: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100px;
    color: #606266;
    background: #f0f2f5;
    opacity: .9;
  }
  .context-menu-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    padding-left: 15px;

    &:hover {
      color: #409eff;
    }
  }
}
</style>