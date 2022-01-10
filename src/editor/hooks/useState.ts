import { computed } from 'vue'
import { mapState, useStore } from 'vuex'
import { key } from '../store'

export function useState(mapper: any) {
  const store = useStore(key)
  const storeStateFns = mapState(mapper)

  const storeState: any = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    storeState[fnKey] = computed(fn)
  })
  return storeState
}
