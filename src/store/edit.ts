import _ from 'lodash-es'
import localCache from '@/utils/cache'
import { IElement, IPage, ISnapshot, ITarget } from "@/interface-type"
import { componentsConfig, containers } from '@/mock-data'
import { getPages } from '../../mock'

export const useEditStore = defineStore({
  id: 'edit',
  state: () => ({
    time: new Date().getTime(),
    pages: [] as IPage[],
    currentPage: {} as IPage,
    currentComponent: {} as IElement | null,

    snapshot: {} as ISnapshot,
    snapshotStore: [] as ISnapshot[]
  }),
  getters: {

  },
  actions: {
    async fetchConfig(query: any) {
      if (this.currentPage.elements) this.currentPage.elements = []

      // 编辑页面未划分给某个系统并且有本地缓存时，取缓存数据；反之取云端数据
      const local = localCache.getCache('purity')
      const cloud = await getPages(query)
      const pages = (!query.system && local) ? local : cloud
      this.$patch({ pages: pages })

      // 初始化 snapshotStore
      this.snapshotStore = this.pages.map(item => {
        // 如果页面没有元素，则给它一个根元素
        if (!item.elements.length) {
          item.elements.push(this.addRootComponent())
        }
        
        return { id: item.id, index: -1, list: [] }
      })

      this.currentComponent = null
      this.currentPage = this.pages[0]
      this.snapshot = this.snapshotStore.find(item => item.id === this.currentPage.id) as ISnapshot
      this.recordSnapshot()
    },

    // 新建页、复制页、删除页、保存页、选择页
    createPage() {
      const num = this.pages.length + 1
      const id = 'p' + num
      const name = 'page-' + num
      const path = '/' + name
      this.currentComponent = this.addRootComponent()
      this.pages.push({ id, name, path, elements: [this.currentComponent], settings: {} })
      this.snapshotStore.push({ id, index: -1, list: [] })
      this.changePage(id)
      this.recordSnapshot()
    },
    copyPage(pageId: string) {
      const page = this.pages.find(item => item.id === pageId)
      const currentPage = _.cloneDeep(toRaw(page) as IPage)
      const num = this.pages.length + 1
      currentPage.id = 'p' + num
      currentPage.name += '复制'
      currentPage.path += '-copy'
      this.pages.push(currentPage)
      this.snapshotStore.push({ id: currentPage.id, index: -1, list: [] })
      this.changePage(currentPage.id)
      this.recordSnapshot()
    },
    deletePage(pageId: string) {
      const index = this.pages.findIndex(item => item.id === pageId)
      const indey = this.snapshotStore.findIndex(item => item.id === pageId)
      const currentPage = index === 0 ? this.pages[1] : this.pages[index - 1]
      this.currentPage = currentPage
      this.snapshot = this.snapshotStore.find(item => item.id === currentPage.id) as ISnapshot
      this.pages.splice(index, 1)
      this.snapshotStore.splice(indey, 1)
    },
    savePage() {      
      const index = this.pages.findIndex(item => item.id === this.currentPage.id)
      this.pages.splice(index, 1, this.currentPage)
    },
    changePage(pageId: string) {
      this.savePage()
      this.saveSnapshot()
      this.currentPage = this.pages.find(item => item.id === pageId) as IPage
      this.snapshot = this.snapshotStore.find(item => item.id === pageId) as ISnapshot
    },

    // 新增根组件
    addRootComponent() {
      const rootComponent = _.cloneDeep(componentsConfig['zh-container'])
      rootComponent.uuid = String(++this.time)
      rootComponent.type = 'root'
      return rootComponent
    },

    // 新增组件
    addComponent(name: string) {
      this.currentComponent = _.cloneDeep(componentsConfig[name])
      this.time = new Date().getTime()
      this.setComponentId(this.currentComponent)
    },

    // 设置组件 uuid，以时间赋值
    setComponentId(component: IElement) {
      if (!component) {
        ElMessage('此组件正在开发中...')
        return
      }

      component.uuid = String(++this.time)
      if (component.childrens) {
        for (let i = 0; i < component.childrens.length; i++) {
          this.setComponentId(component.childrens[i])
        }
      }
    },

    // 插入组件（真正的新增组件）
    insertComponent(id: string, insertSeat: string) {
      if (insertSeat === 'previous') {
        this.insertBefore(id)
      } else if (insertSeat === 'next') {
        this.insertAfter(id)
      } else if (insertSeat === 'inside') {
        this.insertChild(id)
      }

      // 插入完后记录快照
      this.recordSnapshot()
    },

    // 在目标组件前面插入当前组件
    insertBefore(targetId: string) {
      if (this.currentComponent?.type === 'modal') {
        this.insertModal()
        return
      }

      const target = this.findComponent(this.currentPage.elements, targetId)
      this.currentComponent && target?.parent.splice(target.index, 0, this.currentComponent)
    },

    // 在目标组件后面插入当前组件
    insertAfter(targetId: string) {
      if (this.currentComponent?.type === 'modal') {
        this.insertModal()
        return
      }

      const target = this.findComponent(this.currentPage.elements, targetId)
      this.currentComponent && target?.parent.splice(target.index + 1, 0, this.currentComponent)
    },

    // 在目标组件插入子组件
    insertChild(targetId: string) {
      if (this.currentComponent?.type === 'modal') {
        this.insertModal()
        return
      }

      const target = this.findComponent(this.currentPage.elements, targetId)
      this.currentComponent && target?.config.childrens?.push(this.currentComponent)
    },

    // 插入模态框组件
    insertModal() {
      this.currentComponent && this.currentPage.elements.push(this.currentComponent)
    },

    // 查找目标组件的索引、配置、父组件
    findComponent(elements: IElement[], targetId: string, target?: ITarget) {
      for (let i = 0; i < elements.length; i++) {
        if (target) break
        if (elements[i].uuid === targetId) 
          return { index: i, config: elements[i], parent: elements }
        if (!target && elements[i].childrens) 
          target = this.findComponent(elements[i].childrens!, targetId, target)
      }
      return target
    },

    // 设置当前组件
    setComponent(targetId: string) {
      const target = this.findComponent(this.currentPage.elements, targetId)
      target && (this.currentComponent = target.config)
    },

    // 剪切组件
    cutComponent(targetId: string) {
      this.deleteComponent(targetId)
    },

    // 粘贴组件
    pasteComponent(component: IElement) {
      if (!this.currentComponent) return
      this.time = new Date().getTime()
      this.setComponentId(component)
      const { type, uuid: targetId } = this.currentComponent
      const insertSeat = containers.includes(type) ? 'inside' : 'next'
      this.currentComponent = component
      insertSeat === 'inside' ? this.insertChild(targetId) : this.insertAfter(targetId)
      this.recordSnapshot()
    },

    // 删除组件
    deleteComponent(targetId: string, isRecord: boolean = true) {
      const target = this.findComponent(this.currentPage.elements, targetId)
      target?.parent.splice(target.index, 1)
      isRecord && this.recordSnapshot()
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
      this.snapshotStore.splice(index, 1, this.snapshot)
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
      localCache.setCache('purity', this.pages)
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
