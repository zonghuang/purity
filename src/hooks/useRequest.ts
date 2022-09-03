import { merge } from 'lodash'

import { deleteData, getData, headData, patchData, postData, putData } from '@/service'
import { replaceUrl, sessionCache } from '@/utils'
import { usePayload } from './usePayload'

export async function useRequest(config: IRequest) {
  // 合并配置
  const systemConfig = sessionCache.getCache('requestConfig') ?? {}
  const requestConfig = merge({}, systemConfig, config)

  const { method, payloads, headerPayloads } = requestConfig

  // 处理参数
  const payload = usePayload(payloads)
  const { url, replacedFields } = replaceUrl(requestConfig.url, payload)
  replacedFields.forEach((field) => delete payload[field])

  // 处理 headers
  const headers = usePayload(headerPayloads)

  Object.assign(requestConfig, { url, payload, headers })

  let data = null
  switch (method) {
    case 'GET':
      data = await getData(requestConfig)
      break
    case 'POST':
      data = await postData(requestConfig)
      break
    case 'DELETE':
      data = await deleteData(requestConfig)
      break
    case 'PUT':
      data = await putData(requestConfig)
      break
    case 'PATCH':
      data = await patchData(requestConfig)
      break
    case 'HEAD':
      data = await headData(requestConfig)
      break
    default:
      data = await postData(requestConfig)
      break
  }

  return data
}
