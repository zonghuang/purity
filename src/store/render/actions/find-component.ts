/**
 * 查找目标组件
 */
export const findComponent = (targetId: string, components: Component[], target?: Component) => {
  for (let i = 0; i < components.length; i++) {
    if (target) return target
    if (components[i].uuid === targetId) return components[i]
    if (components[i].children)
      target = findComponent(targetId, components[i].children!, target)
    if (components[i].slots) {
      components[i].slots?.forEach(slot =>
        target = findComponent(targetId, slot.children, target)
      )
    }
  }
  return target
}
