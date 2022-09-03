import { zhRequest } from './instance'
import type { RequestConfig, ResponseData } from './types'

export { defaultConfig } from './config'

export function getData(config: RequestConfig) {
  const { payload, ...restArgs } = config
  return zhRequest.get<ResponseData>({ ...restArgs, params: payload })
}

export function headData(config: RequestConfig) {
  const { payload, ...restArgs } = config
  return zhRequest.head<ResponseData>({ ...restArgs, params: payload })
}

export function postData(config: RequestConfig) {
  const { payload, ...restArgs } = config
  return zhRequest.post<ResponseData>({ ...restArgs, data: payload })
}

export function deleteData(config: RequestConfig) {
  const { payload, ...restArgs } = config
  return zhRequest.delete<ResponseData>({ ...restArgs, data: payload })
}

export function putData(config: RequestConfig) {
  const { payload, ...restArgs } = config
  return zhRequest.put<ResponseData>({ ...restArgs, data: payload })
}

export function patchData(config: RequestConfig) {
  const { payload, ...restArgs } = config
  return zhRequest.patch<ResponseData>({ ...restArgs, data: payload })
}

export function cancelAllRequest() {
  return zhRequest.cancelAllRequest()
}
