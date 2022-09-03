import { RequestConfig } from './types'

export const defaultConfig: RequestConfig = {
  timeout: 10 * 1000,
  baseURL: '/',
  method: 'post',

  customConfig: {
    jsonPath: 'data',
    codePath: 'code',
    msgPath: 'message',
    successCode: 200
  }
}
