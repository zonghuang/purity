import { ResponseData } from './types'

// https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
export function httpStatusHandler(statusInfo: ResponseData) {
  console.log(statusInfo)
  // 3xx 重定向 (Redirection messages)

  // 4xx 客户端错误 (Client error responses)

  // 5xx 服务端错误 (Server error responses)

}
