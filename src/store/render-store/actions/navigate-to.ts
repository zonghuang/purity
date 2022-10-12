import { stringifyUrl } from '@/utils'
import { usePayload, _useRouter } from '@/hooks'

/**
 * 导航到其他页面
 */
export function navigateTo(options: Navigation) {
  // 前进/后退
  const { go } = options
  if (go) {
    window.history.go(go)
    return
  }

  let url = options.url ?? ''
  const { payloads, tab, mode, name } = options

  const router = _useRouter()
  const payload = usePayload(payloads)

  // 新窗口打开
  if (tab === '_blank') {
    if (url?.charAt(0) === '/') {
      url = window.location.host + url
    }

    url = stringifyUrl(url, payload)
    const { href } = router.resolve({ path: url })
    window.open(href, tab)
    return
  }

  // 当前窗口打开
  if (mode === 'params') {
    router.push({ name, params: payload })
  } else {
    router.push({ path: url, query: payload })
  }
}
