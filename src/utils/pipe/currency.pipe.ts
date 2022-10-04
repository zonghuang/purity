import { isToUndefined } from '../istype'

/**
 * 把数字转换成货币字符串
 */
export const currencyPipe = (num: number, options?: CurrencyPipe) => {
  if (isToUndefined(num)) return
  if (Number.isNaN(num)) return num

  const { digits = 2, thousands = true, currency, prefix, suffix } = options ?? {}

  let value = num.toFixed(digits)

  if (thousands) {
    value = (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  if (currency) {
    value = getCurrencyCode(currency) + value
  }

  if (prefix) {
    value = prefix + value
  }

  if (suffix) {
    value = value + suffix
  }

  return value
}

// 世界货币符号 https://coinyep.com/zh/currencies
const getCurrencyCode = (currency: string) => {
  switch (currency) {
    case 'CNY':
      return '¥'

    case 'USD':
      return '$'

    case 'EUR':
      return '€'

    case 'GBP':
      return '£'

    case 'CHF':
      return 'Fr'

    case 'JPY':
      return '¥'

    case 'KRW':
      return '₩'

    case 'HKD':
      return '$'

    default:
      return ''
  }
}

interface CurrencyPipe {
  /**
   * 货币名称
   */
  currency?: 'CNY' | 'USD' | 'EUR' | 'GBP' | 'CHF' | 'JPY' | 'KRW' | 'HKD'
  /**
   * 前缀
   */
  prefix?: string
  /**
   * 后缀
   */
  suffix?: string
  /**
   * 保留小数点位数，默认 2 位
   */
  digits?: number
  /**
   * 是否千分位，默认 true
   */
  thousands?: boolean
}
