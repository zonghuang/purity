import _ from 'lodash';
import { defineStore, acceptHMRUpdate } from "pinia";
import { IElement, IPage, ISnapshot } from "../interface";
import { componentsConfig, pages, snapshot } from '../mock-data'

function getPages(id: string) {
  return pages
}

export const useEditStore = defineStore({
  id: 'edit',
  state: () => ({
    pages,
    currentPage: {} as IPage,
    currentComponent: {} as IElement,

    snapshot: snapshot,
    snapshotStore: [snapshot]
  }),
  getters: {

  },
  actions: {
    async fetchConfig(id: string) {
      const pages = await getPages(id)
      this.$patch({ pages: pages, currentPage: pages[0] })

      // 临时
      const pageId = this.currentPage.id
      const rootContainer = _.cloneDeep(componentsConfig['zh-container'])
      rootContainer.uuid = String(new Date().getTime())
      rootContainer.type = 'root'
      this.currentPage.elements.push(rootContainer)
      this.changePage(pageId)
      this.recordSnapshot()

    },

    // 新建页、删除页、保存页、选择页
    createPage() {
      const num = this.pages.length + 1
      const id = 'p' + num
      const name = 'page-' + num
      const rootContainer = _.cloneDeep(componentsConfig['zh-container'])
      rootContainer.uuid = String(new Date().getTime())
      rootContainer.type = 'root'
      this.pages.push({ id, name, elements: [rootContainer], settings: {} })
      this.snapshotStore.push({ id, index: -1, List: [] })
      this.changePage(id)
    },
    deletePage(pageId: string) {
      const index = this.pages.findIndex(item => item.id === pageId)
      this.pages.splice(index, 1)
      const currentPage = index === 0 ? this.pages[index] : this.pages[index - 1]
      this.changePage(currentPage.id)
    },
    savePage() {
      const index = this.pages.findIndex(item => item.id === this.currentPage.id)
      if (index === -1) {
        this.pages.splice(this.pages.length - 1, 0, this.currentPage)
      } else {
        this.pages.splice(index, 1, this.currentPage)
      }
    },
    changePage(pageId: string) {
      this.savePage()
      this.saveSnapshot()
      this.currentPage = this.pages.find(item => item.id === pageId) as IPage
      this.snapshot = this.snapshotStore.find(item => item.id === pageId) as ISnapshot
    },

    // 新增组件
    addComponent(payload: any) {
      const { name, offsetX, offsetY  } = payload
      this.currentComponent = _.cloneDeep(componentsConfig[name])
      this.currentComponent.uuid = String(new Date().getTime())
    },

    // 在目标组件前面插入当前组件
    insertBefore(elements: IElement[], targetId: string) {
      elements.some((item, index) => {
        if (item.uuid === targetId) {
          elements.splice(index, 0, this.currentComponent)
          return true
        }
        if (item.childrens) this.insertBefore(item.childrens, targetId)
      })
    },

    // 在目标组件后面插入当前组件
    insertAfter(elements: IElement[], targetId: string) {
      elements.some((item, index) => {
        if (item.uuid === targetId) {
          elements.splice(index + 1, 0, this.currentComponent)
          return true
        }
        if (item.childrens) this.insertAfter(item.childrens, targetId)
      })
    },

    // 在目标组件插入子组件
    insertChild(elements: IElement[], targetId: string) {
      elements.some(item => {
        if (item.childrens && item.uuid === targetId) {
          item.childrens.push(this.currentComponent)
          return true
        }
        if (item.childrens) this.insertChild(item.childrens, targetId)
      })
    },

    // 设置当前组件
    setComponent(elements: IElement[], uuid: string) {
      elements.some(item => {
        if (item.uuid === uuid) {
          this.currentComponent = item
          return true
        }
        if (item.childrens) this.setComponent(item.childrens, uuid)
      })
    },

    // 删除组件
    deleteComponent(elements: IElement[], deleteId: string) {
      elements.some((item, index) => {
        if (item.uuid === deleteId) {
          elements.splice(index, 1)
          return true
        }
        if (item.childrens) this.deleteComponent(item.childrens, deleteId)
      })
    },

    // 设置组件样式
    setComponentStyle(style: any) {
      Object.assign(this.currentComponent.style, style)
    },

    // 记录快照
    recordSnapshot() {
      this.snapshot.List[++this.snapshot.index] = _.cloneDeep(this.currentPage.elements)
      if (this.snapshot.index < this.snapshot.List.length - 1) {
        this.snapshot.List = this.snapshot.List.slice(0, this.snapshot.index + 1)
      } 
    },

    // 保存快照
    saveSnapshot() {
      const index = this.snapshotStore.findIndex(item => item.id === this.currentPage.id)
      if (index === -1) {
        const pageSnapshot = { id: this.currentPage.id, index: this.snapshot.index, List: this.snapshot.List }
        this.snapshotStore.splice(this.pages.length - 1, 0, pageSnapshot)
      } else {
        this.snapshotStore.splice(index, 1, this.snapshot)
      }
    },

    // 撤回
    undo() {
      if (this.snapshot.index > 0) {
        this.snapshot.index--
        const elements = _.cloneDeep(this.snapshot.List[this.snapshot.index])
        this.setCurrentPageElements(elements)
      }
    },

    // 重做
    redo() {
      if (this.snapshot.index < this.snapshot.List.length - 1) {
        this.snapshot.index++
        const elements = _.cloneDeep(this.snapshot.List[this.snapshot.index])
        this.setCurrentPageElements(elements)
      }
    },

    // 设置当前页面的 elements
    setCurrentPageElements(elements: any) {
      this.currentPage.elements = elements
    },

  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditStore, import.meta.hot))
}
