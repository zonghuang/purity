import {
  closeDialog,
  delegation,
  download,
  findComponent,
  httpRequest,
  navigateTo,
  openDialog,
  printDocs,
  resetState,
  setState,
  upload,
  validateForm
} from './actions'
import { getProperty, getModelValue } from './getters'

import { config } from './config'

export const useRenderStore = defineStore('render', {
  state: (): RenderState => ({
    page: {} as Page,
  }),

  getters: {
    getProperty,
    getModelValue,
  },

  actions: {
    closeDialog,
    delegation,
    download,
    findComponent,
    httpRequest,
    navigateTo,
    openDialog,
    printDocs,
    resetState,
    setState,
    upload,
    validateForm,

    fetchPageConfig() {
      this.page.components = config
    },

    // actions filter
    // 1.event
    // 2.condition

    async handleAction(actions: Action[]) {
      // condition

      actions.forEach(async (item) => {
        const { action, options, thenActions } = item
        switch (action) {
          case 'openDialog':
            this.openDialog(options.targetId, this.page.components)
            break
          case 'closeDialog':
            this.closeDialog(options.targetId, this.page.components)
            break
          case 'navigateTo':
            this.navigateTo(options)
            break
          case 'delegation':
            const actions = this.delegation(options, this.page.components)
            if (actions) this.handleAction(actions)
            break
          case 'validateForm':
            const res = await this.validateForm(options.targetId)
            // if (res) this.handleAction(thenActions)
            break
          case 'setState':
            this.setState(options)
            break
          case 'resetState':
            this.resetState(options)
            break
          case 'httpRequest':
            this.httpRequest(options)
            break
          case 'upload':
            this.upload(options)
            break
          case 'download':
            this.download(options)
            break
          case 'printDocs':
            this.printDocs(options)
            break

          default:
            break
        }
      })
    }
  },

  // 开启数据缓存
  persist: {
    enabled: true
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRenderStore, import.meta.hot))
}
