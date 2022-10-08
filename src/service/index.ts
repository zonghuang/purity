import { zhRequest } from './instance'
import type { RequestConfig, ResponseData } from './types'

export { defaultConfig } from './config'

export function getData(config: RequestConfig) {
  const { payload, ...restArgs } = config
  return zhRequest.get<ResponseData>({ params: payload, ...restArgs })
}

export function headData(config: RequestConfig) {
  const { payload, ...restArgs } = config
  return zhRequest.head<ResponseData>({ params: payload, ...restArgs })
}

export function postData(config: RequestConfig) {
  const { payload, ...restArgs } = config
  return zhRequest.post<ResponseData>({ data: payload, ...restArgs })
}

export function deleteData(config: RequestConfig) {
  const { payload, ...restArgs } = config
  return zhRequest.delete<ResponseData>({ data: payload, ...restArgs })
}

export function putData(config: RequestConfig) {
  const { payload, ...restArgs } = config
  return zhRequest.put<ResponseData>({ data: payload, ...restArgs })
}

export function patchData(config: RequestConfig) {
  const { payload, ...restArgs } = config
  return zhRequest.patch<ResponseData>({ data: payload, ...restArgs })
}

export function request(config: RequestConfig) {
  return zhRequest.request<ResponseData>(config)
}

export function cancelAllRequest() {
  return zhRequest.cancelAllRequest()
}
