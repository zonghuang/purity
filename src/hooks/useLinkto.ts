import { replaceUrl, stringifyUrl } from '@/utils'
import { _useRouter } from './_useRouter'
import { usePayload } from './usePayload'

export function useLinkto(linkConfig: ILinkto) {
  const { url: originUrl, payloads, tab, mode, name } = linkConfig
  const payload = usePayload(payloads)
  const { url, replacedFields } = replaceUrl(originUrl, payload)
  replacedFields.forEach((field) => delete payload[field])

  // url 不是以 / 开头的 (即，url 有完整域名和路径)
  if (url.charAt(0) !== '/') {
    const fullUrl = stringifyUrl(url, payload)
    window.open(fullUrl, tab)
    return
  }

  const router = _useRouter()

  // 新窗口打开
  if (tab === '_blank') {
    const fullUrl = stringifyUrl(window.location.host + url, payload)
    const { href } = router.resolve({ path: fullUrl })
    window.open(href, tab)
    return
  }

  // 当前窗口打开 (默认)
  if (!tab || tab === '_self') {
    if (!mode || mode === 'query') {
      router.push({ path: url, query: payload })
      return
    }

    if (mode === 'params') {
      router.push({ name, params: payload })
    }
  }
}
