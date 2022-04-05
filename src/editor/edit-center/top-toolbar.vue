<template>
  <div class="top-toolbar">
    <ul class="platform">
      <el-tooltip content="Mac" placement="bottom-end">
        <li><zh-svg name="mac" :isActive="true" /></li>
      </el-tooltip>
      
      <el-tooltip content="iPad" placement="bottom-end">
        <li @click="changePlatform"><zh-svg name="ipad" /></li>
      </el-tooltip>
      
      <el-tooltip content="iPhone" placement="bottom-end">
        <li @click="changePlatform"><zh-svg name="iphone" /></li>
      </el-tooltip>
    </ul>

    <ul class="operation">
      <el-tooltip content="撤销" placement="bottom-end">
        <li v-if="editStore.snapshot.index === 0" class="disabled">
          <zh-svg name="undo" :color="'#aaa'" />
        </li>
        <li v-else @click="undo"><zh-svg name="undo" /></li>   
      </el-tooltip>
      <el-tooltip content="重做" placement="bottom-end">
        <li v-if="editStore.snapshot.index === editStore.snapshot.list?.length - 1" class="disabled">
          <zh-svg name="redo" :color="'#aaa'" />
        </li>
        <li v-else @click="redo"><zh-svg name="redo" /></li>
      </el-tooltip>
      <el-tooltip content="保存" placement="bottom-end">
        <li @click="save"><zh-svg name="save" /></li>
      </el-tooltip>
      <el-tooltip content="上传" placement="bottom-end">
        <li @click="unload"><zh-svg name="upload" /></li>
      </el-tooltip>
      <el-tooltip content="下载" placement="bottom-end">
        <li @click="download"><zh-svg name="download" /></li>
      </el-tooltip>    
    </ul>

    <ul class="publish">
      <el-tooltip content="预览" placement="bottom-end">
        <li @click="preview"><zh-svg name="preview" /></li>
      </el-tooltip>
      <el-tooltip content="发布" placement="bottom-end">
        <li @click="publish"><zh-svg name="publish" /></li>
      </el-tooltip>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'
import localCache  from '@/utils/cache'

const editStore = useEditStore()
const router = useRouter()

const changePlatform = () => {
  ElMessage('此功能正在开发中...')
}
const unload = () => {
  ElMessage('此功能正在开发中...')
}
const download = () => {
  ElMessage('此功能正在开发中...')
}

const save = () => { 
  editStore.save()
  ElMessage({ type: 'success', message: '保存成功' })
}
const undo = () => editStore.undo()
const redo = () => editStore.redo()
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
  align-items: center;
  height: 44px;
  box-shadow: 0 1px 1px rgba(100,100,100,.1);

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

    .disabled {
      pointer-events: none;
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