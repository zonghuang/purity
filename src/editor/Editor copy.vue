<template>
  <div class="editor">
    <aside class="component-center">
      <el-tabs v-model="componentTab">
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
        <div class="canvas-container" :class="getOverlay">
          <editor-template :components="components"></editor-template>
        </div>
        <aside-toolbar></aside-toolbar>
      </div>
      <page-list></page-list>
    </main>

    <aside class="config-center">
      <el-tabs v-model="configTab">
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
import { useEditStore } from '@/store/editor-store'

const route = useRoute()
const editStore = useEditStore()
editStore.fetchConfig(route.query)

const componentTab = ref('lib')
const configTab = ref('props')

const components = computed(() => editStore.currentPage.components)
const getOverlay = computed(() => {
  const modalList = components.value.filter(item => item.type === 'modal')
  const overlay = modalList.some(item => item.property.visible)
  return { overlay }
})
</script>

<style scoped lang="less">
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
    }

    .overlay {
      background-color: rgba(33, 33, 33, .46);
    }
  }

  .config-center {
    width: 320px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
