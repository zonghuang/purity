import { cloneDeep } from 'lodash-es'
import { sessionCache } from '@/utils'
import { componentsConfig, containers } from '@/mock-data'
import { getPages } from '../../mock'


const demoPage: any = {
  page: 'sso-log',
  title: 'sso 日志',
  elements: [
    {
      uuid: '1662126644525',
      name: 'zh-container',
      type: 'root',
      style: {
        width: '100%',
        padding: '16px'
      },
      actions: [
        {
          event: 'click',
          action: 'openModal',
          option: {
            targetId: 'm1',
          }
        }
      ],
      modelValue: '',
      propConfig: {},
      animations: [],
      childrens: [
        {
          uuid: '1662126786340',
          name: 'zh-form',
          type: 'form',
          style: {
            height: '100px'
          },
          actions: [
            {
              event: 'click',
              action: 'openModal',
              option: {
                targetId: 'm2',
              }
            }
          ],
          modelValue: {},
          propConfig: {
            label: '表单',
            formItemWidth: '',
            labelWidth: '',
            labelPosition: ''
          },
          animations: [],
          childrens: [
            {
              uuid: '1662126789908',
              name: 'zh-input',
              type: 'input',
              style: {},
              actions: [],
              modelValue: '',
              propConfig: {
                label: '输入框',
                field: '',
                placeholder: '请输入',
                labelWidth: '100px',
                labelPosition: 'right'
              },
              animations: []
            },
            {
              uuid: '1662126792173',
              name: 'zh-button',
              type: 'button',
              style: {
                display: 'inline-block'
              },
              actions: [
                {
                  event: 'click',
                  action: 'openModal',
                  option: {
                    targetId: 'm3',
                  }
                }
              ],
              modelValue: '',
              propConfig: {
                label: '按钮'
              },
              animations: []
            }
          ]
        }
      ]
    }
  ],
  settings: {}
}


export const useEditStore = defineStore('edit', {
  state: (): IEditorState => ({
    time: new Date().getTime(),
    pages: [],
    currentPage: {} as IPage,
    currentComponent: null,

    snapshot: {} as ISnapshot,
    snapshotStore: []
  }),

  getters: {},

  actions: {
    async fetchConfig(query: IObject) {
      this.currentComponent = null
      this.currentPage.elements = []

      // 编辑页面未划分给某个系统并且有本地缓存时，取缓存数据；反之取云端数据
      const local = sessionCache.getCache('purity')
      const cloud = await getPages(query)
      // const pages = (!query.system && local) ? local : cloud
      const pages = [demoPage]


      // 如果页面没有元素，则给它一个根元素
      if (!pages[0].elements.length) {
        pages[0].elements.push(this.addRootComponent())
      }

      // this.$patch({ pages: pages, currentPage: pages[0] })
      this.$patch({ pages: pages, currentPage: pages[0] })

      // 初始化 snapshotStore
      this.snapshotStore = this.pages.map(item => {
        return { id: item.page, index: -1, list: [] }
      })
      this.snapshot = this.snapshotStore.find((item) => item.id === this.currentPage.page)!
      this.recordSnapshot()
    },

    // 新建页面
    createPage() {
      const num = this.pages.length + 1
      const pageName = 'p' + num
      this.pages.push({
        system: '',
        module: '',
        page: pageName,
        title: 'page-' + num,
        elements: [this.addRootComponent()],
        settings: {},
        actions: []
      })
      this.snapshotStore.push({ id: pageName, index: -1, list: [] })
      this.changePage(pageName)
      this.recordSnapshot()
    },

    // 复制页面
    copyPage(pageName: string) {
      const page = this.pages.find((item) => item.page === pageName)!
      const currentPage = cloneDeep(toRaw(page))
      const num = this.pages.length + 1
      currentPage.page = 'p' + num
      currentPage.title += '复制'
      this.pages.push(currentPage)
      this.snapshotStore.push({ id: currentPage.page, index: -1, list: [] })
      this.changePage(currentPage.page)
      this.recordSnapshot()
    },

    // 删除页面
    deletePage(pageName: string) {
      const index = this.pages.findIndex((item) => item.page === pageName)
      const indey = this.snapshotStore.findIndex((item) => item.id === pageName)
      this.currentPage = index === 0 ? this.pages[1] : this.pages[index - 1]
      this.snapshot = this.snapshotStore.find((item) => item.id === this.currentPage.page)!
      this.pages.splice(index, 1)
      this.snapshotStore.splice(indey, 1)
    },

    // 保存页面
    savePage() {
      const index = this.pages.findIndex((item) => item.page === this.currentPage.page)
      this.pages.splice(index, 1, this.currentPage)
    },

    // 切换页面
    changePage(pageName: string) {
      this.savePage()
      this.saveSnapshot()
      this.currentPage = this.pages.find((item) => item.page === pageName)!
      this.snapshot = this.snapshotStore.find((item) => item.id === pageName)!
    },

    // 新增根组件
    addRootComponent() {
      const rootComponent = cloneDeep(componentsConfig['zh-container'])
      rootComponent.uuid = String(++this.time)
      rootComponent.type = 'root'
      return rootComponent
    },

    // 新增组件
    addComponent(name: string) {
      this.currentComponent = cloneDeep(componentsConfig[name])
      this.time = new Date().getTime()
      this.setComponentId(this.currentComponent)
    },

    // 设置组件 uuid，以时间赋值
    setComponentId(component: IElement) {
      if (!component) {
        console.log('此组件正在开发中...')
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
    insertComponent(uuid: string, insertSeat: InsertSeat) {
      if (insertSeat === 'previous') {
        this.insertBefore(uuid)
      } else if (insertSeat === 'next') {
        this.insertAfter(uuid)
      } else if (insertSeat === 'inside') {
        this.insertChild(uuid)
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
      target?.parent.splice(target.index, 0, this.currentComponent!)
    },

    // 在目标组件后面插入当前组件
    insertAfter(targetId: string) {
      if (this.currentComponent?.type === 'modal') {
        this.insertModal()
        return
      }

      const target = this.findComponent(this.currentPage.elements, targetId)
      target?.parent.splice(target.index + 1, 0, this.currentComponent!)
    },

    // 在目标组件插入子组件
    insertChild(targetId: string) {
      if (this.currentComponent?.type === 'modal') {
        this.insertModal()
        return
      }

      const target = this.findComponent(this.currentPage.elements, targetId)
      target?.config.childrens?.push(this.currentComponent!)
    },

    // 插入模态框组件
    insertModal() {
      this.currentPage.elements.push(this.currentComponent!)
    },

    // 查找目标组件的索引、配置、父组件
    findComponent(
      elements: IElement[],
      targetId: string,
      target?: { index: number; config: IElement; parent: IElement[] }
    ) {
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
      if (target) this.currentComponent = target.config
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
    setComponentStyle(style: IStyle) {
      Object.assign(this.currentComponent?.style!, style)
    },

    // 打开模态框
    openModal(targetId: string) {
      this.currentPage.elements.some((item) => {
        if (item.uuid === targetId) {
          item.propConfig.visible = true
          return true
        }
      })
    },

    // 关闭模态框
    closeModal(targetId: string) {
      this.currentPage.elements.some((item) => {
        if (item.uuid === targetId) {
          item.propConfig.visible = false
          return true
        }
      })
    },

    // 记录快照
    recordSnapshot() {
      this.snapshot.list[++this.snapshot.index] = cloneDeep(this.currentPage.elements)
      if (this.snapshot.index < this.snapshot.list.length - 1) {
        this.snapshot.list = this.snapshot.list.slice(0, this.snapshot.index + 1)
      }
    },

    // 保存快照
    saveSnapshot() {
      const index = this.snapshotStore.findIndex((item) => item.id === this.currentPage.page)
      this.snapshotStore.splice(index, 1, this.snapshot)
    },

    // 撤回
    undo() {
      if (this.snapshot.index > 0) {
        this.snapshot.index--
        const elements = cloneDeep(this.snapshot.list[this.snapshot.index])
        this.setCurrentPageElements(elements)
      }
    },

    // 重做
    redo() {
      if (this.snapshot.index < this.snapshot.list.length - 1) {
        this.snapshot.index++
        const elements = cloneDeep(this.snapshot.list[this.snapshot.index])
        this.setCurrentPageElements(elements)
      }
    },

    // 设置当前页面的 elements
    setCurrentPageElements(elements: IElement[]) {
      this.currentPage.elements = elements
    },

    // 保存
    save() {
      sessionCache.setCache('purity', this.pages)
    },

    // 预览
    preview() {},

    // 发布
    publish() {}
  }

  // 开启数据缓存
  // persist: {
  //   enabled: true
  // }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditStore, import.meta.hot))
}
