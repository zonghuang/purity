import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface Interceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface RequestConfig extends AxiosRequestConfig {
  payload?: any
  customConfig?: CustomConfig
  interceptors?: Interceptors
  controller?: AbortController
}

export interface CustomConfig {
  jsonPath?: string
  loading?: boolean | ILoading
  successfulFeedback?: IFeedback
  failedFeedback?: IFeedback
  dupliRequestStrictEquality?: boolean
  successCode?: number | string
  codePath?: string
  msgPath?: string
  unhandled?: boolean
}

export interface ILoading {
  type?: 'circular' | 'linear'
  color?: string
}

export interface IFeedback {
  type: 'snackbar' | 'notification'
  duration?: number
  placement?: 'topCenter' | 'topRight' | 'bottomCenter' | 'bottomRight'
  status?: 'success' | 'warning' | 'info' | 'error'
  title?: string
  message?: string
}

export interface ResponseData<T = any> {
  data?: T
  code?: number | string
  message?: string
  fault?: true
}
