import { getIn, localCache, sessionCache } from '@/utils'
import { defaultConfig } from './config'
import { Request } from './request'
import { feedback } from './feedback'
import { httpStatusHandler } from './status-handler'
import type { RequestConfig } from './types'

export const zhRequest = new Request({
  ...defaultConfig,
  interceptors: {
    requestInterceptor: (config) => {
      const token = sessionCache.getCache('token') ?? localCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return Promise.reject(err)
    },

    responseInterceptor: (res) => {
      const { customConfig } = res.config as RequestConfig
      const { successCode, codePath, msgPath } = customConfig!
      const { successfulFeedback, failedFeedback } = customConfig!

      const code = getIn(res.data, codePath)
      const message = getIn(res.data, msgPath)

      if (code === successCode && successfulFeedback) {
        feedback(successfulFeedback, message)
      } else if (code !== successCode && failedFeedback) {
        feedback(failedFeedback, message)
      }

      if (code !== successCode) {
        const { status, statusText } = res
        const fault = { fault: true, code: code ?? status, message: message ?? statusText }
        httpStatusHandler(fault)
        if (!customConfig?.unhandled) {
          res.data.fault = fault
        }
      }
      return res
    },
    responseInterceptorCatch: (err) => {
      const { customConfig } = err.config as RequestConfig
      const { failedFeedback, unhandled } = customConfig!
      const { code, message, response } = err
      const { status, statusText } = response ?? {}
      const fault = response
        ? { fault: true, code: status, message: statusText }
        : { fault: true, code, message }

      if (failedFeedback) {
        feedback(failedFeedback, statusText ?? message)
      }

      httpStatusHandler(fault)

      return unhandled ? err : { data: fault }
    }
  }
})
