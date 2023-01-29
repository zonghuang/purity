<template>
  <div class="aside-toolbar">
    <el-tooltip v-for="item in operations" :key="item.name" :content="item.label" placement="right">
      <li @click="handleOperation(item.name)">
        <zh-svg :name="item.name" />
      </li>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from "@/store/editor"

const editStore = useEditStore()

const operations = [
  { label: '粘贴', name: 'paste' },
  { label: '复制', name: 'copy' },
  { label: '剪切', name: 'cut' },
  { label: '删除', name: 'delete' },
  { label: '收藏', name: 'favorite' }
]
const handleOperation = (operation: string) => {
  switch (operation) {
    case 'paste':
      pasteComponent()
      break

    case 'copy':
      copyComponent()
      break

    case 'cut':
      cutComponent()
      break

    case 'delete':
      deleteComponent()
      break

    case 'favorite':
      favoriteComponent()
      break

    default:
      break
  }
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

const favoriteComponent = () => {
  ElMessage('此功能正在开发中...')
}
</script>

<style scoped lang="less">
.aside-toolbar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px;
  background: #fff;
}

li {
  display: flex;
  align-items: center;
  padding: 2px;
}
</style>
