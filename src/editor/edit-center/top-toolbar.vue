<template>
  <div class="top-toolbar">
    <ul class="platform">
      <el-tooltip v-for="item in platforms" :key="item" :content="item" placement="bottom-end">
        <li @click="changePlatform(item)">
          <zh-svg :name="item" :isActive="currentPlatform === item" />
        </li>
      </el-tooltip>
    </ul>

    <ul class="operation">
      <el-tooltip v-for="item in operations" :key="item.name" :content="item.label" placement="bottom-end">
        <li v-if="item.name === 'undo' && undoable" class="disabled" @click="handleOperation(item.name)">
          <zh-svg name="undo" :color="'#aaa'" />
        </li>
        <li v-else-if="item.name === 'redo' && redoable" class="disabled" @click="handleOperation(item.name)">
          <zh-svg name="redo" :color="'#aaa'" />
        </li>
        <li v-else @click="handleOperation(item.name)">
          <zh-svg :name="item.name" />
        </li>
      </el-tooltip>
    </ul>

    <ul class="publish">
      <el-tooltip content="预览" placement="bottom-end">
        <li @click="preview">
          <zh-svg name="preview" />
        </li>
      </el-tooltip>
      <el-tooltip content="发布" placement="bottom-end">
        <li @click="publish">
          <zh-svg name="publish" />
        </li>
      </el-tooltip>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/editor'

const editStore = useEditStore()
const router = useRouter()

const platforms = ['Mac', 'iPad', 'iPhone']
const currentPlatform = ref('Mac')
const changePlatform = (platform: string) => {
  if (platform !== 'Mac') {
    ElMessage('此功能正在开发中...')
    return
  }
  currentPlatform.value = platform
}

const undoable = computed(() => editStore.snapshot.index === 0)
const redoable = computed(() => editStore.snapshot.index === editStore.snapshot.list?.length - 1)

const operations = [
  { label: '撤销', name: 'undo' },
  { label: '重做', name: 'redo' },
  { label: '保存', name: 'save' },
  { label: '上传', name: 'upload' },
  { label: '下载', name: 'download' }
]
const handleOperation = (operation: string) => {
  switch (operation) {
    case 'undo':
      editStore.undo()
      break

    case 'redo':
      editStore.redo()
      break

    case 'save':
      editStore.save()
      ElMessage({ type: 'success', message: '保存成功' })
      break

    case 'unload':
      ElMessage('此功能正在开发中...')
      break

    case 'download':
      ElMessage('此功能正在开发中...')
      break

    default:
      break
  }
}

const preview = () => {
  editStore.save()
  router.push({ name: 'preview' })
}

const publish = () => {
  editStore.publish()
  ElMessage('此功能正在开发中...')
}
</script>

<style scoped lang="less">
.top-toolbar {
  display: flex;
  height: 43px;
  border-bottom: 1px solid #eee;

  .platform,
  .operation,
  .publish {
    display: flex;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      width: 50px;
      height: 43px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background: #f7f9fc;
        cursor: pointer;
      }
    }
  }

  .operation {
    flex: 1;
    justify-content: center;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
