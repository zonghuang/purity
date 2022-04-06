import { IElement, IPage, ITarget } from "@/interface-type";
import { pages } from '@/mock-data'
import { getData, postData, deleteData, patchData } from "@/service";
import { getPages } from '../../mock'
import { useEditStore } from "./edit";
import { formatData } from '@/utils/format-data'

export const useRenderStore = defineStore({
  id: 'render',
  state: () => ({
    pages,
    currentPage: {} as IPage,
    cacheData: {} as any
  }),
  getters: {

  },
  actions: {
    async fetchConfig(params: any) {
      if (params.page) {
        const pages = await getPages(params)
        this.$patch({ pages: pages, currentPage: pages[0] })
      } else {
        const editStore = useEditStore()
        const pages = editStore.pages
        this.$patch({ pages: pages, currentPage: pages[0] })
      }
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

    // 查找目标组件的索引、配置、父组件
    findTarget(elements: IElement[], targetId: string = '', target?: ITarget) {
      for (let i = 0; i < elements.length; i++) {
        if (target) break
        if (elements[i].uuid === targetId) 
          return { index: i, config: elements[i], parent: elements }
        if (!target && elements[i].childrens) 
          target = this.findTarget(elements[i].childrens!, targetId, target)
      }
      return target
    },

    // 请求数据
    async getData(url: string, method: string, payload: any, showLoading?: boolean) {
      const data = method === 'GET' ? await getData(url, payload, showLoading)
                 : method === 'POST' ? await postData(url, payload, showLoading)
                 : method === 'DELETE' ? await deleteData(url, payload, showLoading)
                 : method === 'PATCH' ? await patchData(url, payload, showLoading)
                 : null
      // return data
      
      // 兼容旧数据，进行数据清洗
      return formatData(data, url, payload)
    }

  },

  // 开启数据缓存
  // persist: {
  //   enabled: true
  // }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRenderStore, import.meta.hot))
}
