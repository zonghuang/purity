import zhRequest from './request'
import { IDataType } from './request/types'

export function getData(url: string, params: any, showLoading?: boolean) {
  return zhRequest.get({
    url,
    params,
    showLoading
  })
}

export function postData(url: string, data: any, showLoading?: boolean) {
  return zhRequest.post<IDataType>({
    url,
    data,
    showLoading
  })
}

export function deleteData(url: string, data: any, showLoading?: boolean) {
  return zhRequest.delete<IDataType>({
    url,
    data,
    showLoading
  })
}

export function patchData(url: string, data: any, showLoading?: boolean) {
  return zhRequest.patch<IDataType>({
    url,
    data,
    showLoading
  })
}
