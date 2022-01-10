import { computed } from 'vue'
import { mapGetters, useStore } from 'vuex'
import { key } from '../store'

export function useGetters(mapper: any) {
  const store = useStore(key)
  const storeStateFns = mapGetters(mapper)

  const storeState: any = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    storeState[fnKey] = computed(fn)
  })

  return storeState
}
