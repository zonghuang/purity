<template>
  <div class="admin">
    <div>
      <el-button @click="findData">查询</el-button>
      <p>查询结果: {{ queryResult }}</p>
    </div>

    <el-button @click="insertData">新增</el-button>

    <div>
      <el-button @click="updateData">更新</el-button>
      <p>查询结果: {{ queryResult }}</p>
    </div>

    <el-button @click="deleteData">删除</el-button>

    <hr>
    <div>
      <el-button @click="findModule">模块查询</el-button>
      <p>查询结果: {{ queryResult }}</p>
    </div>

    <div>
      <el-button @click="updateModule">模块更新</el-button>
      <p>查询结果: {{ queryResult }}</p>
    </div>

    <el-button @click="deleteModule">删除</el-button>

    <div>
      <br><hr>
      {{ msg }}
      <el-button @click="deploy">部署</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getData, postData } from '@/service';

const queryResult = ref(null)
const updateResult = ref(null)
const msg = ref('')

// 查询
const findData = async () => {
  const url = '/api/purity-page/find'
  const payload = { system: 'crm', module: 'user-manage', page: 'sso-user-manage' }
  queryResult.value = await getData(url, payload)
  console.log('data:', queryResult.value)
}

// 新增
const insertData = async () => {
  const url = '/api/purity-page/insert'
  const payload = {
    system: 'crm',
    module: 'log-manage',
    page: 'abc-log-manage',
    name: "日志管理",
    elements: [{ uuid: '1324', childrens: [{ aaa: 'asdf' }] }],
    settings: {}
  }
  await postData(url, payload)
}

// 更新
const updateData = async () => {
  const url = '/api/purity-page/update'
  const payload = {
    _id: '627bc8573b69601fb7471010',
    system: 'crm',
    module: 'log-manage',
    page: 'sso-log-manage',
    name: "sso日志管理",
    elements: [{ uuid: '12345', childrens: [{ aaa: '987' }] }],
    settings: {}
  }
}

// 删除
const deleteData = async () => {
  const url = '/api/purity-page/delete'
  const payload = { system: 'crm', _id: '627bc4892bd8b3ab563f698c' }
  await getData(url, payload)
}


const findModule = async () => {
  const url = '/api/purity-module/find'
  const payload = { system: 'crm', module: 'log-manage' }
  queryResult.value = await getData(url, payload)
  console.log('data:', queryResult.value)
}

const updateModule = async () => {
  const url = '/api/purity-module/update'
  const payload = [
    {
      _id: '627bc8573b69601fb7471010',
      system: 'crm',
      module: 'log-manage',
      page: 'sy-log-manage',
      name: "系统日志管理",
      elements: [{ uuid: '9234g', childrens: [{ aaa: 'aerg' }] }],
      settings: {}
    },
    {
      system: 'crm',
      module: 'log-manage',
      page: 'asgerthgt',
      name: "你好",
      elements: [{ uuid: 'euwfh', childrens: [{ aaa: '23r9ufn' }] }],
      settings: {}
    },
  ]
}

const deleteModule = async () => {
  const url = '/api/purity-module/delete'
  const payload = { system: 'crm', module: 'log-manage' }
  await getData(url, payload)
}

const deploy = async () => {
  const url = '/api/purity-deploy'
  msg.value = await getData(url, { name: 'zonghuang' })
}

</script>
