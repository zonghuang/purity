/**
 * 检验表单
 */
export function validateForm<T>(state: T) {
  return async (targetId: string) => {
    // const formInstance = getState(targetId, state, 'instance')
    const formInstance = { validate: () => {} }
    try {
      return await formInstance.validate()
    } catch {
      return
    }
  }
}
