import qs from 'query-string'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig, Interceptors } from './types'
import { Progress } from './progress'
import { getIn } from '@/utils'

export class Request {
  instance: AxiosInstance
  interceptors?: Interceptors
  pendingRequest?: Map<string, AbortController>
  progress?: Progress

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.pendingRequest = new Map()
    this.progress = new Progress()
    this.setupInterceptor()
  }

  /**
   * 拦截器执行顺序
   * 1. 单个请求的 (请求) 拦截器
   * 2. 对应实例的 (请求) 拦截器
   * 3. 类的 (请求) 拦截器
   * 4. 类的 (响应) 拦截器
   * 5. 对应实例的 (响应) 拦截器
   * 6. 单个请求的 (响应) 拦截器
   */
  setupInterceptor(): void {
    // 类的 (请求) 拦截器
    this.instance.interceptors.request.use((config: RequestConfig) => {
      const abortController = new AbortController()
      config.signal = abortController.signal
      config.controller = abortController

      this.cancelDupliRequest(config)
      this.recordRequest(config)

      if (config.customConfig?.loading) {
        this.progress?.loading(config.customConfig?.loading)
      }
      return config
    })

    // 类的 (响应) 拦截器
    this.instance.interceptors.response.use(
      (res) => {
        if ((res?.config as RequestConfig)?.customConfig?.loading) {
          this.progress?.unloading()
        }
        this.removePendingRequest(res.config)
        return res
      },
      (err) => {
        if (err?.config?.customConfig?.loading) {
          this.progress?.unloading()
        }
        this.removePendingRequest(err.config ?? {})
        return Promise.reject(err)
      }
    )

    // 对应实例的 (请求) 拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 对应实例的 (响应) 拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求的 (请求) 拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request(config)
        .then((res) => {
          // 单个请求的 (响应) 拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          if (res?.data?.fault === true) resolve(res.data)
          resolve(getIn(res?.data ?? res, config.customConfig?.jsonPath))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }

  head<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'HEAD' })
  }

  put<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' })
  }

  // 记录当前请求
  private recordRequest(config: RequestConfig) {
    const key = generateRequestKey(config)
    if (!this.pendingRequest?.has(key)) {
      this.pendingRequest?.set(key, config.controller!)
    }
  }

  // 移除 pendingRequest 中的当前请求
  private removePendingRequest(config: RequestConfig) {
    const key = generateRequestKey(config)
    if (this.pendingRequest?.has(key)) {
      this.pendingRequest.delete(key)
    }
  }

  // 取消重复请求
  private cancelDupliRequest(config: RequestConfig) {
    const key = generateRequestKey(config)
    if (this.pendingRequest?.has(key)) {
      // 如果是重复的请求，则执行对应的 abort方法
      const controller = this.pendingRequest.get(key)
      controller && controller.abort()

      // 将前一次重复的请求移除
      this.pendingRequest.delete(key)
    }
  }

  // 取消所有请求
  cancelAllRequest() {
    this.pendingRequest?.forEach((controller) => controller.abort())
    this.pendingRequest?.clear()
  }
}

/**
 * 为每次请求生成唯一的key (2种情况)
 * 不全等情况: 唯一key = 请求方式(method) + 请求地址(url)
 * 全等情况: 唯一key = 请求方式(method) + 请求地址(url) + 请求参数(params data)
 */
const generateRequestKey = (config: RequestConfig) => {
  const { method, url, params, data, customConfig } = config
  const { dupliRequestStrictEquality } = customConfig || {}
  let requestKey = method + '@' + url
  if (dupliRequestStrictEquality) {
    requestKey += '@' + qs.stringify(params) + '@' + qs.stringify(data)
  }
  return requestKey
}
