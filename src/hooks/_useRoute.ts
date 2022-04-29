// 当构建库时，无法使用 useRoute(), 因此通过这种方式获取上下文来获取 route
export default function _useRoute() {
  const internalInstance = getCurrentInstance()
  return internalInstance?.appContext.config.globalProperties.$route ?? {}
}
