export function useDownload(config: any) {
  // 直接下载
  if (config.href) {
    download(config.href)
    return
  }

  // 服务器返回一个下载地址
  if () {
    download(config.href)
    return
  }

  // 服务器返回二进制数据
  const fileName = _fileName
  ? _fileName + downloadType
  : response.headers!['content-disposition']
  ? decodeURIComponent(
      (response.headers!['content-disposition'] as string).split(
        'filename=',
      )[1],
    )
  : '导出文件' + downloadType

  const blobParts = getIn(response, jsonPath) || response.data
  const options = { type: 'application/octet-stream;charset=utf-8' }

  // 后端返回的是二进制数据
  const blob = new Blob([blobParts], options)
  const aElement = document.createElement('a')
  aElement.href = URL.createObjectURL(blob)
  aElement.download = fileName
  aElement.style.display = 'none'
  document.body.append(aElement)
  aElement.click()
  URL.revokeObjectURL(aElement.href)
  aElement.remove()
}

const download = (href: string, filename?: string) => {
  const aElement = document.createElement('a')
  aElement.href = href
  aElement.target = '_blank'
  aElement.download = filename || '文件' + new Date().getTime()
  aElement.click()
  aElement.remove()
}
