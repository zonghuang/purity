// 当构建库时，无法使用 useRouter(), 因此通过这种方式获取上下文来获取 router
export function _useRouter() {
  const internalInstance = getCurrentInstance()
  return internalInstance?.appContext.config.globalProperties.$router ?? {}
}
