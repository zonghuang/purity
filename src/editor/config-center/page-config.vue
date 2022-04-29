<template>
  <div class="page-config">
    <el-form label-position="top" label-width="120px">
      <el-form-item label="页面名称">
        <el-input v-model="editStore.currentPage.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="页面路径">
        <el-input v-model="editStore.currentPage.path" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'

const editStore = useEditStore()

</script>

<style scoped>
.page-config {}
</style>