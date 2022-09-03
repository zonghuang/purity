import qs from 'query-string'

export const stringifyUrl = (url: string, query: IObject = {}) => {
  return qs.stringifyUrl({ url, query })
}
