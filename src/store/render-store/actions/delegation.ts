import { findComponent } from './find-component'

/**
 * delegation (action 委托)
 */
export function delegation(options: DelegationOption, components: Component[]) {
  const { targetId, event } = options
  const target = findComponent(targetId, components)
  return target?.actions?.filter(item => item.event === event)
}
