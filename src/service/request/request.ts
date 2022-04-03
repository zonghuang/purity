import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

interface InterceptorHooks {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  interceptorHooks?: InterceptorHooks
}

interface Data<T> {
  data: T
  returnCode: string
  success: boolean
}

class Request {
  instance: AxiosInstance
  config: AxiosRequestConfig
  interceptorHooks?: InterceptorHooks
  showLoading: boolean
  loading?: LoadingInstance
  
  constructor(options: RequestConfig) {
    this.instance = axios.create(options)
    this.config = options
    this.interceptorHooks = options.interceptorHooks
    this.showLoading = options.showLoading ?? true

    this.setupInterceptor()
  }

  setupInterceptor(): void {
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use((config) => {
      if (this.showLoading) {
        this.loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(50, 50, 50, .88)'
        })
      }
      return config
    })

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  request<T = any>(config: RequestConfig): Promise<T> {
    if (!config.showLoading) {
      this.showLoading = false
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, Data<T>>(config)
        .then((res) => {
          resolve(res.data)
          this.showLoading = true
        })
        .catch((err) => {
          reject(err)
          this.showLoading = true
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
}

export default Request
