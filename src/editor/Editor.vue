<template>
  <div
    class="editor"
    :key="page.page"
    v-for="page in pages"
    v-show="page.page === currentPageName"
  >
    <aside class="component-center">
      <el-tabs v-model="activeLib">
        <el-tab-pane label="组件" name="lib">
          <component-lib></component-lib>
        </el-tab-pane>
        <el-tab-pane label="图层" name="layer">
          <component-layer></component-layer>
        </el-tab-pane>
      </el-tabs>
    </aside>

    <main class="edit-center">
      <top-toolbar></top-toolbar>
      <div class="edit-area">
        <modal-list></modal-list>
        <div class="canvas-container" :class="{ 'overlay': isOverlay }">
          <editor-template :components="components"></editor-template>
        </div>
        <aside-toolbar></aside-toolbar>
      </div>
      <page-list></page-list>
    </main>

    <aside class="config-center">
      <el-tabs v-model="activeConfig">
        <el-tab-pane label="属性" name="prop">
          <prop-config></prop-config>
        </el-tab-pane>
        <el-tab-pane label="事件" name="event">
          <event-config></event-config>
        </el-tab-pane>
        <el-tab-pane label="样式" name="style">
          <style-config></style-config>
        </el-tab-pane>
        <el-tab-pane label="动画" name="animation">
          <animation-config></animation-config>
        </el-tab-pane>
        <el-tab-pane label="页面" name="page">
          <page-config></page-config>
        </el-tab-pane>
      </el-tabs>
    </aside>
  </div>
</template>


<script setup lang="ts">
import { useEditStore } from '@/store/editor'

const activeLib = ref('lib')
const activeConfig = ref('prop')

const route = useRoute()
const editStore = useEditStore()
editStore.fetchConfig(route.query)
const pages = computed(() => editStore.pages)
const components = computed(() => editStore.currentPage.components)
const currentPageName = computed(() => editStore.currentPage.page)

const isOverlay = computed(() =>
  editStore.currentPage.components?.some(item => {
    return item.type === 'modal' && item.property.visible
  })
)
</script>

<style scoped lang="less">
// 蒙层
.overlay {
  background-color: rgba(33, 33, 33, .46);
}

.editor {
  display: flex;
  height: 100vh;

  :deep(.pointer-none)>* {
    pointer-events: none;
  }

  .component-center {
    width: 280px;

    &::-webkit-scrollbar {
      display: none;
    }

    .component-lib, .component-layer {
      height: calc(100vh - 44px);
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .edit-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;

    .edit-area {
      flex: 1;
      display: flex;
      background: #f5f5f5;
      // height: calc(100% - 152px);
    }
  }

  .config-center {
    width: 320px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.canvas-container {
  position: relative;
  flex: 1;
  margin: 8px;
  width: 600px; // 解决编辑时表格宽度溢出问题（真实宽度不止 600px，这里相当于限制了画布的最小宽度为 600px）
  overflow: scroll;
  // border-left: 1px solid #eee;
  // border-right: 1px solid #eee;
  border: 1px solid #eee;
  background: #fff;
  box-sizing: border-box;


  &::-webkit-scrollbar {
    display: none;
  }
}

:deep(.el-tabs__header) {
  margin: 0;
}

:deep(.el-tabs__nav) {
  display: flex;
  width: 100%;
  height: 43px;
}

:deep(.el-tabs__item) {
  padding: 0;
  flex: 1;
  text-align: center;
  color: rgba(0, 0, 0, .6);
}

:deep(.el-collapse-item__header) {
  padding-left: 10px;
}

:deep(.el-collapse-item__content) {
  padding-bottom: 16px;
}

:deep(.el-tabs__nav-wrap) {
  border-bottom: 1px solid #eee;

  &::after {
    content: none;
  }
}
</style>
