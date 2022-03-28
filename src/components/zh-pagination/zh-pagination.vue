<template>
  <div class="zh-pagination">
    <el-pagination
      small
      @size-change="handlePageSize"
      @current-change="handleCurrentPage"
      :current-page="page.currentPage"
      :pager-count="pagerCount"
      :page-size="page.pageSize"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      background
    ></el-pagination>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: any
  propConfig: any
}>()
const emit = defineEmits(['action'])

const pagerCount = 5
const page = computed(() => props.modelValue)
const total = computed(() => props.propConfig.total)

const handlePageSize = (pageSize: number) => {
  page.value.pageSize = pageSize
  emit('action', { userAction: 'click' })
}

const handleCurrentPage = (currentPage: number) => {
  page.value.currentPage = currentPage
  emit('action', { userAction: 'click' })
}

</script>

<style scoped>
.zh-pagination {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}
</style>
