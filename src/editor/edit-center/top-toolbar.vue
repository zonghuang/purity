<template>
  <div class="top-toolbar">
    <ul class="platform">
      <li>Mac</li>
      <li>iPad</li>
      <li>iPhone</li>
    </ul>

    <ul class="operation">
      <li>撤销</li>
      <li>重做</li>
      <li>保存</li>
      <li>导入</li>
      <li>导出</li>
    </ul>

    <ul class="publish">
      <li>预览</li>
      <li>发布</li>
    </ul>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.top-toolbar {
  display: flex;
  align-items: center;
  height: 45px;
  background: aliceblue;

  .platform {
    display: flex;
    width: 180px;
    padding: 0;
    list-style: none;

    li {
      flex: 1;
      text-align: center;
    }
  }

  .operation {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 0;
    list-style: none;

    li {
      width: 60px;
      text-align: center;
    }
  }

  .publish {
    width: 120px;
    display: flex;
    padding: 0;
    list-style: none;

    li {
      flex: 1;
      text-align: center;
    }
  }
}
</style>