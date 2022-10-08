export const getIn = (data: IObject | IObject[], path?: string | string[]): any => {
  if (!path) return data

  const paths = Array.isArray(path) ? path : path.replace(/\//g, '.').split('.')

  // data 为数组
  if (Array.isArray(data)) {
    return data.map((item: IObject) => getIn(item, paths))
  }

  // data 为对象
  return paths?.reduce((pre: IObject, cur: string) => {
    return Array.isArray(pre) && cur ? getIn(pre, cur) : pre?.[cur]
  }, data)
}
