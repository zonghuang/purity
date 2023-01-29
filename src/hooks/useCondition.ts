import { usePayload } from './usePayload'

export const useCondition = (expression: string, payloads: Payload[]) => {
  const payload = usePayload()
  // 表达式计算，返回 true
  return true
}
