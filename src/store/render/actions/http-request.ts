import { useRequest } from '@/hooks'

/**
 * http 请求
 */
export const httpRequest = async (option: any) => {
  const data = await useRequest(option)

  const success = data.fault ? false : true
  

}
