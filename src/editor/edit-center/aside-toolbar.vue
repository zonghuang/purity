<template>
  <ul class="aside-toolbar">
    <el-tooltip content="剪切" placement="right">
      <li><zh-svg name="cut" /></li>
    </el-tooltip>
    <el-tooltip content="复制" placement="right">
      <li><zh-svg name="copy" /></li>
    </el-tooltip>
    <el-tooltip content="删除" placement="right">
      <li><zh-svg name="delete" /></li>
    </el-tooltip>
    <el-tooltip content="组合" placement="right">
      <li><zh-svg name="compose" /></li>
    </el-tooltip>
    <el-tooltip content="拆分" placement="right">
      <li><zh-svg name="decompose" /></li>
    </el-tooltip>
  </ul>
</template>

<script setup lang="ts">

</script>

<style scoped>
.aside-toolbar {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>