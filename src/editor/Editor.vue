<template>
  <div class="editor" v-for="page in pages" :key="page.id" v-show="page.id === currentPageId">
    <aside class="lib-layer">
      <el-tabs v-model="activeLib" @tab-click="handleClick">
        <el-tab-pane label="组件库" name="lib">
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
        <canvas-container></canvas-container>
        <aside-toolbar></aside-toolbar>
      </div>
      <div class="coord">x: 0 y: 0</div>
      <page-list></page-list>
    </main>

    <aside class="config-center">
      <el-tabs v-model="activeConfig" @tab-click="handleClick">
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
        <el-tab-pane label="页面设置" name="page">
          <page-config></page-config>
        </el-tab-pane>
      </el-tabs>
    </aside>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useEditStore } from './store/edit'

const editStore = useEditStore()
const activeLib = ref('lib')
const activeConfig = ref('prop')
const pages = computed(() => editStore.pages)
const currentPageId = computed(() => editStore.currentPage.id)

onMounted(() => {
  editStore.fetchConfig('1')
})

function handleClick(event: any) {
  console.log(event)
}
</script>


<style scoped lang="less">
.editor {
  display: flex;
  height: 100vh;

  .lib-layer {
    width: 250px;

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
      padding: 20px 6px;
      padding-bottom: 0px;
      height: calc(100% - 152px);
    }

    .coord {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-align: right;
      font-size: 12px;
      height: 20px;
      padding-top: 6px;
      padding-right: 4px;
      box-shadow: 0 1px 1px rgba(100,100,100,.1);
    }
  }

  .config-center {
    width: 350px;
  }
}

:deep(.el-tabs__header) {
  margin: 0;
  box-shadow: 0 1px 1px rgba(100,100,100,.1);
}

:deep(.el-tabs__nav) {
  display: flex;
  width: 100%;
  height: 45px;
}
:deep(.el-tabs__item) {
  padding: 0;
  flex: 1;
  text-align: center;
}
:deep(.el-tabs__nav-wrap::after) {
  content: none;
}
</style>
