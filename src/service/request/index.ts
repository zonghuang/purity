import Request from './request'
import { BASE_URL, TIME_OUT } from './config'
import localCache from '@/utils/cache'

const zhRequest = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptorHooks: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')

      // 临时 token
      console.log('request-config: ', config)
      if (!token) ElMessage.error('token 无效')
      config.headers!['sso-token'] = token

      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default zhRequest
