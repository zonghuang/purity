import piniaPluginPersist from 'pinia-plugin-persist'
import { useEditStore } from './editor-store'
import { useRenderStore } from './render-store'

const store = createPinia()
store.use(piniaPluginPersist)

export { useEditStore, useRenderStore }
export default store
