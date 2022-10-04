import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

/**
 * 格式化日期值
 */
export const datePipe = (datetime: any, options?: DatePipe) => {
  const { format = 'YYYY-MM-DD HH:mm:ss' } = options ?? {}

  const time = dayjs(datetime).valueOf()
  const result = dayjs.utc(time).utcOffset(8).format(format)
  return result === 'Invalid Date' ? '' : result
}

interface DatePipe {
  format?: string
}
