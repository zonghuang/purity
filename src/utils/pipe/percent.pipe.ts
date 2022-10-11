import { isToUndefined } from '../istype'

/**
 * 把数字转换成百分比字符串
 */
export const percentPipe = (num: number, options?: PercentPipe) => {
  if (isToUndefined(num)) return
  if (Number.isNaN(num)) return num

  const { digits = 2 } = options ?? {}

  return (num * 100).toFixed(digits) + '%'
}
