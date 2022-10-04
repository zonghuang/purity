/**
 * 文本映射
 */
export const textmapPipe = (value: Value, options?: TextmapPipe) => {
  if (!options) return value

  const { textMap } = options || {}

  const one = textMap.find((item) => item.origin === value)
  return one?.result ?? value
}

type Value = number | string | boolean

declare interface TextmapPipe {
  textMap: {
    origin?: number | string | boolean
    result?: string
  }[]
}
