<template>
  <div class="editor">
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
      <!-- <div class="coord">x: {{ offset.x }} y: {{ offset.y }}</div> -->
      <div class="edit-area">
        <modal-list></modal-list>
        <canvas-container></canvas-container>
        <aside-toolbar></aside-toolbar>
      </div>
      <page-list></page-list>
    </main>

    <aside class="config-center">
      <el-tabs v-model="activeLib" @tab-click="handleClick">
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
import { ref } from "vue";

const activeLib = ref('lib')

function handleClick(event: any) {
  console.log(event)
}
</script>


<style scoped lang="less">
.editor {
  display: flex;
  height: 100vh;
  /* font-size: 12px; */

  .lib-layer {
    width: 250px;
  }

  .edit-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;

    .coord {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-align: right;
      font-size: 12px;
      height: 20px;
    }

    .edit-area {
      flex: 1;
      display: flex;
      padding: 20px 8px;
      // padding-top: 0px;
    }
  }

  .config-center {
    width: 350px;
  }
}

::v-deep .el-tabs__header {
  margin: 0;
  background: aliceblue;
}
::v-deep .el-tabs__nav {
  display: flex;
  width: 100%;
  height: 45px;
}
::v-deep .el-tabs__item {
  padding: 0;
  flex: 1;
  text-align: center;
}
::v-deep .el-tabs__nav-wrap::after {
  content: none;
}
</style>
