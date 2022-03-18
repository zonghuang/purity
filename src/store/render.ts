import { IElement, IPage } from "@/interface-type";
import { pages } from '@/mock-data'
import { useEditStore } from "./edit";

export const useRenderStore = defineStore({
  id: 'render',
  state: () => ({
    pages,
    currentPage: {} as IPage
  }),
  getters: {

  },
  actions: {
    async fetchConfig(id: string) {
      const editStore = useEditStore()
      const pages = editStore.pages
      this.$patch({ pages: pages, currentPage: pages[0] })
    },

    // 打开模态框
    openModal(targetId: string) {
      this.currentPage.elements.some(item => {
        if (item.uuid === targetId) {
          item.propConfig.visible = true
          return true
        }
      })
    },

    // 关闭模态框
    closeModal(targetId: string) {
      this.currentPage.elements.some(item => {
        if (item.uuid === targetId) {
          item.propConfig.visible = false
          return true
        }
      })
    },

  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRenderStore, import.meta.hot))
}
