<template>
  <div class="admin">
    <h2>Admin</h2>
    <div class="system-type">
      <el-radio-group v-model="type" @change="changeType">
        <el-radio label="sso">统一登录认证</el-radio>
        <el-radio label="h5">H5</el-radio>
        <el-radio label="web">网站</el-radio>
      </el-radio-group>
    </div>

    <el-table :data="tableData" style="width: 100%" class="admin-table">
      <el-table-column type="selection" width="55" />
      <el-table-column type="expand">
        <template #default="props">
          <el-table :data="props.row.pages" style="width: 100%" :show-header="false">
            <el-table-column width="103" />
            <el-table-column label="页面名称" prop="page" width="170" />
            <el-table-column label="" prop="path" width="180" />
            <el-table-column label="" prop="status" />
            <el-table-column label="" prop="creator" />
            <el-table-column label="" prop="creationTime" />
            <el-table-column label="" prop="modifier" />
            <el-table-column label="" prop="modificationTime" />

            <el-table-column fixed="right" label="" width="120" align="center">
              <template #default="scope">
                <el-button type="text" size="small" @click="preview(props.row.path, scope.row.path)">预览</el-button>
                <el-button type="text" size="small" @click="edit(props.row.path, scope.row.path)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="模块/页面" prop="module" width="170" />
      <el-table-column label="路径" prop="path" width="180" />
      <el-table-column label="状态" prop="status" />
      <el-table-column label="创建人" prop="creator" />
      <el-table-column label="创建时间" prop="creationTime" />
      <el-table-column label="最后修改人" prop="modifier" />
      <el-table-column label="最后修改时间" prop="modificationTime" />

      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template #default="scope">
          <!-- <el-button type="text" size="small" @click="preview(scope.row.path)">预览</el-button> -->
          <el-button type="text" size="small" @click="edit(scope.row.path)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div >
      <p>上面的都是示例，由于没有保存到后端，因此更改后，再次进入还是原来的数据</p>
      用这个来测，可以保存在本地 <el-button type="text" @click="handleClick">Click Me</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ssoTableData } from '../../mock/admin'

const router = useRouter()
const type = ref('sso')
const tableData = ssoTableData

const preview = (module: string, page?: string) => {
  const query: any = {
    system: type.value,
    module: module.replace('/', ''),
  }
  if (page) query.page = page.replace('/', '')
  const system = type.value
  router.push({ path: `/render/${system}${module}${page}`, name: 'render', params: query })
}

const edit = (module: string, page?: string) => {
  const query: any = {
    system: type.value,
    module: module.replace('/', ''),
  }
  if (page) query.page = page.replace('/', '')
  router.push({ path: '/editor', query: query })
}

const handleClick = () => {
  router.push({ name: 'editor' })
}

const changeType = () => {
  console.log(type.value)
}
</script>

<style scoped lang="less">
.admin {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.system-type {
  padding-bottom: 10px;
}

.admin-table {
  :deep(.el-table__expanded-cell) {
    padding: 0;
    border-bottom: none;
  }
}
</style>
