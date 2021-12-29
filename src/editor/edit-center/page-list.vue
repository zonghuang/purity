<template>
  <ul class="page-list">
    <li>page-1</li>
    <li>page-2</li>
    <li>page-3</li>
    <li>page99 + (页面99+)</li>
  </ul>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.page-list {
  display: flex;
  align-items: center;
  // background: aliceblue;
  gap: 20px;
  margin: 0;
  padding-left: 8px;
  height: 50px;
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
  }

  &:hover {
    cursor: pointer;
  }
}
</style>