/**
 * 文本映射
 */
export const textmapPipe = (value: number | string | boolean, options?: TextmapPipe) => {
  if (!options) return value

  const { textMap } = options || {}

  const one = textMap.find((item) => item.origin === value)
  return one?.result ?? value
}
