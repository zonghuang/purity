import { isToUndefined } from '../istype'

/**
 * 把数字转换成带小数点的字符串（千分位、保留小数点后的位数）
 */
export const decimalPipe = (num: number, options?: DecimalPipe) => {
  if (isToUndefined(num)) return
  if (Number.isNaN(num)) return num

  const { digits = 2, thousands = true } = options ?? {}

  const value = num.toFixed(digits)
  return thousands ? (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') : value
}


