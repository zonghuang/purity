import { useLinkto, usePayload, useRequest } from '@/hooks'
import { useEditStore } from './editor'

async function getPageConfig(params: any) {
  return {} as IPage
}

export const useRenderStore = defineStore('render', {
  state: (): IRenderState => ({
    page: {} as IPage,
    cacheData: {}
  }),

  getters: {},

  actions: {
    // 请求页面配置
    async fetchConfig(params: IObject) {
      if (params.page) {
        this.page = await getPageConfig(params)
      } else {
        const editStore = useEditStore()
        this.$patch({ page: editStore.pages[0] })
      }
    },

    // 打开模态框
    openModal(targetId: string) {
      this.page.elements.some((item) => {
        if (item.uuid === targetId) {
          item.propConfig.visible = true
          return true
        }
      })
    },

    // 关闭模态框
    closeModal(targetId: string) {
      this.page.elements.some((item) => {
        if (item.uuid === targetId) {
          item.propConfig.visible = false
          return true
        }
      })
    },

    // 设置值
    setValue(data: any, option: ISetValue) {
      const { type, targetId, targets } = option
      if (type === 'modelValue') {
        const component = this.findComponent(targetId!, this.page.elements)
        if (component) this.updateValue(data, component)
      } else if (type === 'options') {
        const component = this.findComponent(targetId!, this.page.elements)
        if (component) component.propConfig.options = data
      } else if (type === 'components') {
        targets?.forEach((one) => {
          const component = this.findComponent(one.targetId, this.page.elements)
          if (component) this.updateValue((data as IObject)[one.sourceKey], component)
        })
      } else if (type === 'store') {
        this.cacheData[targetId!] = data
      }
    },

    // 更新值
    updateValue(newValue: any, component: IElement) {
      console.log('update', newValue, toRaw(component))
      component.modelValue = newValue
    },

    // 查找目标组件
    findComponent(targetId: string, elements: IElement[], target?: IElement) {
      for (let i = 0; i < elements.length; i++) {
        if (target) return target
        if (elements[i].uuid === targetId) return elements[i]
        if (elements[i].childrens)
          target = this.findComponent(targetId, elements[i].childrens!, target)
        if (elements[i].slots) {
          elements[i].slots?.forEach(slot => {
            target = this.findComponent(targetId, slot.childrens, target)
          })
        }
      }
      return target
    },

    // 请求数据
    async request(requestConfig: IRequest) {
      return useRequest(requestConfig)
    },

    // 处理事件
    handleActions(actions: IAction[]) {
      actions.forEach(async (item) => {
        const { action, option, thenActions } = item

        switch (action) {
          case 'openModal': {
            const { targetId } = option
            console.log('targetId', targetId)
            this.openModal(targetId!)
            break
          }

          case 'closeModal': {
            const { targetId } = option
            this.closeModal(targetId!)
            break
          }

          case 'linkto': {
            const { url, tab, mode, name, payloads } = option
            useLinkto({ url, tab, mode, name, payloads })
            break
          }

          case 'setValue': {
            const { payloads } = option
            const data = usePayload(payloads)
            this.setValue(data, option)
            break
          }

          case 'resetValue': {
            const { targetId } = option
            const component = this.findComponent(targetId!, this.page.elements)
            const originValue = toRaw(this.cacheData[targetId!]?.originData)
            if (component) this.updateValue(originValue, component)
            break
          }

          case 'request': {
            const data = await useRequest(option)

            const success = data.fault ? false : true
            const successfulActions: IAction[] = []
            const failedActions: IAction[] = []
            const finallyActions: IAction[] = []
            thenActions?.forEach(item => {
              const type = item.trigger?.belong
              if (type === 'error') {
                failedActions.push(item)
              } else if (type === 'finally') {
                finallyActions.push(item)
              } else {
                successfulActions.push(item)
              }
            })

            if (success) {
              // 将响应数据赋值
              this.setValue(data, option)
              this.handleActions(successfulActions)
            }

            if (!success) {
              this.handleActions(failedActions)
            }

            this.handleActions(finallyActions)
          }

          default:
            break
        }

        if (action !== 'request' && thenActions?.length) {
          this.handleActions(thenActions)
        }
      })
    },
  }

  // 开启数据缓存
  // persist: {
  //   enabled: true
  // }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRenderStore, import.meta.hot))
}
