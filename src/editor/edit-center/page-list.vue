<template>
  <div class="page-list" @click="closeContextmenu">
    <li v-if="isShowAdd" @click="createPage">+</li>
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
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'

const route = useRoute()
const editStore = useEditStore()

const contextmenu = ref('')
const isShowAdd = computed(() => !route.query.page)
const currentPageId = computed(() => editStore.currentPage.id)
const pageList = computed(() =>
  editStore.pages.map(page => {
    return { id: page.id, name: page.name }
  })
)

const createPage = () => editStore.createPage()
const copyPage = (pageId: string) => editStore.copyPage(pageId)
const changePage = (pageId: string) => editStore.changePage(pageId)
const deletePage = (ev: MouseEvent, pageId: string) => {
  ev.preventDefault()
  ev.stopPropagation()
  if (editStore.pages.length === 1) {
    ElMessage({ type: 'warning', message: '只剩一页了，哥哥姐姐别删了！' })
    return
  }
  editStore.deletePage(pageId)
}
const sortPage = () => ElMessage('此功能正在开发中...')

const closeContextmenu = () => contextmenu.value = ''
const showContextmenu = (ev: MouseEvent, pageId: string) => {
  ev.preventDefault()
  contextmenu.value = pageId
}
</script>

<style scoped lang="less">
.page-list {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 10px;
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

  .context-menu {
    position: absolute;
    bottom: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100px;
    color: rgba(0, 0, 0, 0.87);
    background: #f0f2f5;
    opacity: 0.9;
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
