import { useRequest } from '@/hooks'

/**
 * http 请求
 */
export const httpRequest = async (options: any) => {
  const data = await useRequest(options)

  const success = data.fault ? false : true


}
