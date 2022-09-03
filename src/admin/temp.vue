<template>
  <div class="admin">
    <div>
      <el-button @click="findData">查询</el-button>
      <el-button @click="findData1">查询</el-button>
      <el-button @click="findData2">查询</el-button>
      <el-button @click="findData3">查询</el-button>
      <el-button @click="findData4">查询</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks'
import { getData, postData, cancelAllRequest } from '@/service'

// 查询
// const findData = async () => {
//   // const baseURL = 'http://localhost:9000'
//   const url = '/dev/test/tablelist/getdd'
//   const payload = { page: 1, pageSize: 10 }
//   const headers = {
//     'authorization-bar': '26fd584b2a964ceabdc554a521e2bd8aff2f3c0ddaebf22ae295c8d6aca4b049',
//     'authorization-system': 105
//   }
//   const config = { url, payload, data: payload, headers, customConfig: { loading: true, jsonPath: 'records' } }
//   const res = await postData(config)

//   // const fetchConfig = { baseURL, url, payloads: [] }
//   // const res = useRequest(fetchConfig)
//   console.log('data:', res)
// }

const findData = async () => {
  const baseURL = 'https://ddealer.leyaoyao.com/gw/dealer-system'
  const url = '/customer/list'
  const payload = { current: 1, page: 10 }
  const headers = {
    'authorization-bar': '26fd584b2a964ceabdc554a521e2bd8aff2f3c0ddaebf22ae295c8d6aca4b049',
    'authorization-system': 105
  }
  const config = { baseURL, url, payload, data: payload, headers, customConfig: { loading: true },
    interceptors: {
      requestInterceptor: (config: any) => {
        console.log('requestInterceptor', config)
        return config
      },

      responseInterceptor: (res: any) => {
        console.log('responseInterceptor', res)
        return res.data
      },
    }
  }
  const res = await postData(config)

  // const fetchConfig = { baseURL, url, payloads: [] }
  // const res = useRequest(fetchConfig)
  console.log('data:', res)
}

const findData1 = async () => {
  // const baseURL = 'https://ddealer.leyaoyao.com/gw/dealer-system'
  // const url = '/customer/list1'
  const url = '/dev/test/options/get'
  const payload = { current: 1, page: 10 }
  const headers = {
    'authorization-bar': '26fd584b2a964ceabdc554a521e2bd8aff2f3c0ddaebf22ae295c8d6aca4b049',
    'authorization-system': 105
  }
  const config = { url, payload, data: payload, headers, customConfig: {  } }
  await postData(config)
}

const findData2 = async () => {
  // const baseURL = 'https://ddealer.leyaoyao.com/gw/dealer-system'
  const url = '/dev/test/form/get'
  const payload = { current: 1, page: 10 }
  const headers = {
    'authorization-bar': '26fd584b2a964ceabdc554a521e2bd8aff2f3c0ddaebf22ae295c8d6aca4b049',
    'authorization-system': 105
  }
  const config = { url, payload, data: payload, headers, customConfig: {  } }
  await postData(config)
}

const findData3 = async () => {
  // const baseURL = 'https://ddealer.leyaoyao.com/gw/dealer-system'
  const url = '/dev/test/exceltablelist/get'
  const payload = { current: 1, page: 10 }
  const headers = {
    'authorization-bar': '26fd584b2a964ceabdc554a521e2bd8aff2f3c0ddaebf22ae295c8d6aca4b049',
    'authorization-system': 105
  }
  const config = { url, payload, data: payload, headers, customConfig: {  } }
  await postData(config)
}

const findData4 = async () => {
  // const baseURL = 'https://ddealer.leyaoyao.com/gw/dealer-system'
  const url = '/dev/test/forForms/get'
  const payload = { current: 1, page: 10 }
  const headers = {
    'authorization-bar': '26fd584b2a964ceabdc554a521e2bd8aff2f3c0ddaebf22ae295c8d6aca4b049',
    'authorization-system': 105
  }
  const config = { url, payload, data: payload, headers }
  await postData(config)
}


// 取消
const cancel = () => {
  cancelAllRequest()
}
</script>
