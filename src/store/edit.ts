import _ from 'lodash'
import { IElement, IPage, ISnapshot, ITarget } from "@/interface-type"
import { componentsConfig, containers, pages, snapshot } from '@/mock-data'

function getPages(id: string) {
  const storage = localStorage.getItem('purity')
  return storage ? JSON.parse(storage) : pages
}

export const useEditStore = defineStore({
  id: 'edit',
  state: () => ({
    time: 0,
    pages,
    currentPage: {} as IPage,
    currentComponent: {} as IElement | null,

    snapshot: snapshot,
    snapshotStore: [snapshot]
  }),
  getters: {

  },
  actions: {
    async fetchConfig(id: string) {
      if (this.currentPage.elements && this.currentPage.elements.length > 0) return

      const pages = await getPages(id)
      this.$patch({ pages: pages, currentPage: pages[0] })

      // 临时
      const pageId = this.currentPage.id
      const rootContainer = _.cloneDeep(componentsConfig['zh-container'])
      if (!rootContainer) return
      this.time = new Date().getTime()
      this.setComponentId(rootContainer)
      rootContainer.type = 'root'

      if (!localStorage.getItem('purity')) {
        this.currentPage.elements.push(rootContainer)
      }
      this.changePage(pageId)
      this.recordSnapshot()
    },

    // 新建页、复制页、删除页、保存页、选择页
    createPage() {
      const num = this.pages.length + 1
      const id = 'p' + num
      const name = 'page-' + num
      this.addComponent('zh-container')
      if (!this.currentComponent) return
      this.currentComponent.type = 'root'
      this.pages.push({ id, name, elements: [this.currentComponent], settings: {} })
      this.snapshotStore.push({ id, index: -1, list: [] })
      this.changePage(id)
    },
    copyPage(pageId: string) {
      const page = this.pages.find(item => item.id === pageId)
      const currentPage = _.cloneDeep(toRaw(page) as IPage)
      const num = this.pages.length + 1
      currentPage.id = 'p' + num
      currentPage.name += '复制'
      this.pages.push(currentPage)
      this.snapshotStore.push({ id: currentPage.id, index: -1, list: [] })
    },
    deletePage(pageId: string) {
      const index = this.pages.findIndex(item => item.id === pageId)
      const currentPage = index === 0 ? this.pages[index + 1] : this.pages[index - 1]
      this.currentPage = currentPage
      this.snapshot = this.snapshotStore.find(item => item.id === currentPage.id) as ISnapshot
      this.pages.splice(index, 1)
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
    addComponent(name: string) {
      this.currentComponent = _.cloneDeep(componentsConfig[name])
      this.time = new Date().getTime()
      this.setComponentId(this.currentComponent)
    },

    // 设置组件 uuid，以时间赋值
    setComponentId(component: IElement) {
      component.uuid = String(++this.time)
      if (component.childrens) {
        for (let i = 0; i < component.childrens.length; i++) {
          this.setComponentId(component.childrens[i])
        }
      }
    },

    // 在目标组件前面插入当前组件
    insertBefore(targetId: string) {
      if (this.currentComponent?.type === 'modal') {
        this.insertModal()
        return
      }

      const target = this.findTarget(this.currentPage.elements, targetId)
      this.currentComponent && target?.parent.splice(target.index, 0, this.currentComponent)
    },

    // 在目标组件后面插入当前组件
    insertAfter(targetId: string) {
      if (this.currentComponent?.type === 'modal') {
        this.insertModal()
        return
      }

      const target = this.findTarget(this.currentPage.elements, targetId)
      this.currentComponent && target?.parent.splice(target.index + 1, 0, this.currentComponent)
    },

    // 在目标组件插入子组件
    insertChild(targetId: string) {
      if (this.currentComponent?.type === 'modal') {
        this.insertModal()
        return
      }

      const target = this.findTarget(this.currentPage.elements, targetId)
      this.currentComponent && target?.config.childrens?.push(this.currentComponent)
    },

    insertModal() {
      this.currentComponent && this.currentPage.elements.push(this.currentComponent)
    },

    // 查找目标组件的索引、配置、父组件
    findTarget(elements: IElement[], targetId: string, target?: ITarget) {
      for (let i = 0; i < elements.length; i++) {
        if (target) break
        if (elements[i].uuid === targetId) 
          return { index: i, config: elements[i], parent: elements }
        if (!target && elements[i].childrens) 
          target = this.findTarget(elements[i].childrens!, targetId, target)
      }
      return target
    },

    // 设置当前组件
    setComponent(targetId: string) {
      const target = this.findTarget(this.currentPage.elements, targetId)
      target && (this.currentComponent = target.config)
    },

    // 剪切组件
    cutComponent(targetId: string) {
      this.deleteComponent(targetId)
      this.saveSnapshot()
    },

    // 粘贴组件
    pasteComponent(component: IElement) {
      if (!this.currentComponent) return
      this.time = new Date().getTime()
      this.setComponentId(component)
      const type = this.currentComponent.type
      const insertSeat = containers.includes(type) ? 'inside' : 'next'
      const targetId = this.currentComponent.uuid
      this.currentComponent = component
      insertSeat === 'inside' ? this.insertChild(targetId) : this.insertAfter(targetId)
    },

    // 删除组件
    deleteComponent(targetId: string) {
      const target = this.findTarget(this.currentPage.elements, targetId)
      target?.parent.splice(target.index, 1)
    },

    // 设置组件样式
    setComponentStyle(style: any) {
      Object.assign(this.currentComponent?.style, style)
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

    // 记录快照
    recordSnapshot() {
      this.snapshot.list[++this.snapshot.index] = _.cloneDeep(this.currentPage.elements)
      if (this.snapshot.index < this.snapshot.list.length - 1) {
        this.snapshot.list = this.snapshot.list.slice(0, this.snapshot.index + 1)
      } 
    },

    // 保存快照
    saveSnapshot() {
      const index = this.snapshotStore.findIndex(item => item.id === this.currentPage.id)
      if (index === -1) {
        const pageSnapshot = { id: this.currentPage.id, index: this.snapshot.index, list: this.snapshot.list }
        this.snapshotStore.splice(this.pages.length - 1, 0, pageSnapshot)
      } else {
        this.snapshotStore.splice(index, 1, this.snapshot)
      }
    },

    // 撤回
    undo() {
      if (this.snapshot.index > 0) {
        this.snapshot.index--
        const elements = _.cloneDeep(this.snapshot.list[this.snapshot.index])
        this.setCurrentPageElements(elements)
      }
    },

    // 重做
    redo() {
      if (this.snapshot.index < this.snapshot.list.length - 1) {
        this.snapshot.index++
        const elements = _.cloneDeep(this.snapshot.list[this.snapshot.index])
        this.setCurrentPageElements(elements)
      }
    },

    // 设置当前页面的 elements
    setCurrentPageElements(elements: IElement[]) {
      this.currentPage.elements = elements
    },

    // 保存
    save() {
      localStorage.setItem('purity', JSON.stringify(this.pages))
    },

    // 预览
    preview() {},

    // 发布
    publish() {},


  },

  // 开启数据缓存
  // persist: {
  //   enabled: true
  // }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditStore, import.meta.hot))
}
