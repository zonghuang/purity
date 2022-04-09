<template>
  <ul class="aside-toolbar">
    <el-tooltip content="粘贴" placement="right">
      <li @click="pasteComponent"><zh-svg name="paste" /></li>
    </el-tooltip>
    <el-tooltip content="复制" placement="right">
      <li @click="copyComponent"><zh-svg name="copy" /></li>
    </el-tooltip>
    <el-tooltip content="剪切" placement="right">
      <li cutComponent @click="cutComponent"><zh-svg name="cut" /></li>
    </el-tooltip>
    <el-tooltip content="删除" placement="right">
      <li @click="deleteComponent"><zh-svg name="delete" /></li>
    </el-tooltip>
    <el-tooltip content="组合" placement="right">
      <li @click="composeComponent"><zh-svg name="compose" /></li>
    </el-tooltip>
    <el-tooltip content="拆分" placement="right">
      <li @click="decomposeComponent"><zh-svg name="decompose" /></li>
    </el-tooltip>
    <el-tooltip content="收藏" placement="right">
      <li @click="collectionComponent"><zh-svg name="collection" /></li>
    </el-tooltip>
  </ul>
</template>

<script setup lang="ts">
import { useEditStore } from "@/store/edit"

const editStore = useEditStore()

const cutComponent = () => {
  if (!editStore.currentComponent) {
    ElMessage({ type: 'warning', message: '请选择组件' })
    return
  }
  const clipText = JSON.stringify(toRaw(editStore.currentComponent))
  navigator.clipboard.writeText(clipText)
    .then(() => {
      if (!editStore.currentComponent) return
      editStore.cutComponent(editStore.currentComponent.uuid)
      ElMessage({ type: 'success', message: '剪切成功' })
      editStore.currentComponent = null
    })
    .catch(() => {
      ElMessage.error('抱歉，您的浏览器不支持该功能！')
    })
}

const copyComponent = () => {
  if (!editStore.currentComponent) {
    ElMessage({ type: 'warning', message: '请选择组件' })
    return
  }
  const clipText = JSON.stringify(toRaw(editStore.currentComponent))
  navigator.clipboard.writeText(clipText)
    .then(() => {
      if (!editStore.currentComponent) return
      ElMessage({ type: 'success', message: '复制成功' })
    })
    .catch(() => {
      ElMessage.error('抱歉，您的浏览器不支持该功能！')
    })
}

const pasteComponent = () => {
  navigator.clipboard.readText()
    .then(clipText => {
      if (!editStore.currentComponent) {
        ElMessage({ type: 'warning', message: '请选择粘贴的目标组件' })
        return
      }
      const clipComponent = JSON.parse(clipText)
      editStore.pasteComponent(clipComponent)
    })
    .catch(() => {
      ElMessage.error('抱歉，您的剪贴板没有任何东西，或者该浏览器不支持该功能！')
    })
}

const deleteComponent = () => {
  if (!editStore.currentComponent) {
    ElMessage({ type: 'warning', message: '请选择组件' })
    return
  } else {
    editStore.deleteComponent(editStore.currentComponent.uuid)
    ElMessage({ type: 'success', message: '删除成功' })
    editStore.currentComponent = null
  }
}

const composeComponent = () => {
  ElMessage('此功能正在开发中...')
}

const decomposeComponent = () => {
  ElMessage('此功能正在开发中...')
}

const collectionComponent = () => {
  ElMessage('此功能正在开发中...')
}
</script>

<style scoped lang="less">
.aside-toolbar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>