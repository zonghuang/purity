export const replaceUrl = (url: string, payload: IObject) => {
  const replacedFields = []
  const n = url.split('${').length - 1
  for (let i = 0; i < n; i++) {
    const start = url.indexOf('${')
    const end = url.indexOf('}')
    const field = url.slice(start + 2, end)
    url = url.replace('${' + field + '}', payload[field])
    replacedFields.push(field)
  }

  url = url.replaceAll('undefined', '')

  return { url, replacedFields }
}
