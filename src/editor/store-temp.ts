import _ from 'lodash';
import { toRaw, InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { IState, IPage, IElement, } from './interface'
import {
  componentsConfig,
  pages,
  currentPage,
  currentComponent,
} from './mock-data'

import { createPinia } from 'pinia'

export const key: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
  state() {
    return {
      coord: { x: 0, y: 0 },
      canvasOffset: { x: 0, y: 0 },
      elementOffset: { x: 0, y: 0 },
      pages,
      currentPage,
      currentComponent,
    }
  },
  getters: {},
  mutations: {
    // 鼠标位置
    setCoord(state, payload) {
      state.coord = { ...payload }
    },
    // 画布偏移量
    setCanvasOffset(state, payload) {
      state.canvasOffset = { ...payload }
    },
    // 记录拖拽前鼠标按下时，元素（相对于自身的）偏移量
    setElementOffset(state, payload) {
      state.elementOffset = { ...payload }
    },

    // 新建页、删除页、保存页、选择页
    createPage(state) {
      const num = state.pages.length + 1
      const pageId = 'p' + num
      state.pages.push({
        id: pageId,
        name: 'page-' + num,
        elements: [],
        settings: {}
      })
      store.commit('changePage', pageId)
    },
    deletePage(state, pageId) {
      const index = state.pages.findIndex(item => item.id === pageId)
      state.pages.splice(index, 1)
      const currentPageId = index === 0 ? state.pages[index] : state.pages[index - 1]
      store.commit('changePage', currentPageId)
    },
    savePage(state) {
      const index = state.pages.findIndex(item => item.id === state.currentPage.id)
      if (index === -1) {
        state.pages.splice(state.pages.length - 1, 0, state.currentPage)
      } else {
        state.pages.splice(index, 1, state.currentPage)
      }
    },
    changePage(state, pageId) {
      store.commit('savePage')
      state.currentPage = state.pages.find(item => item.id === pageId) as IPage
    },

    // 选择组件（正在操作的组件）
    selectComponent(state, component) {
      state.currentComponent = component
    },

    // 新增、移动、删除
    addComponent(state, payload) {
      const { name, style } = payload
      state.currentComponent = _.cloneDeep(componentsConfig[name])
      state.currentComponent.uuid = String(new Date().getTime())
      store.commit('setComponentStyle', { component: state.currentComponent, style })
      state.currentPage.elements.push(state.currentComponent)
    },
    moveComponent(state, payload) {
      const { componentId, style } = payload
      store.commit('setComponentStyle', { component: state.currentComponent, style })
    },
    deleteComponent(state, uuid) {

    },

    // 添加子组件
    addChildComponent(state, payload) {
      const { style } = payload
      const component = _.cloneDeep(state.currentComponent)
      component.propValue = '按钮' + new Date().getTime()
      state.currentPage.elements[0].childrens.push(component)
    },

    // 设置组件样式
    setComponentStyle(state, payload) {
      const { component, style } = payload
      component.style = { ...component.style, ...style } 
    },

    // 剪切、复制、粘贴
    cutComponent(state, payload) {

    },
    copyComponent(state, payload) {

    },
    pasteComponent(state, payload) {

    },

    // 组合、拆分
    composeComponent(state, payload) {

    },
    decomposeComponent(state, payload) {

    },

    // 锁定、解锁
    lockComponent(state, payload) {

    },
    unlockComponent(state, payload) {

    },

    // 撤销、重做、记录快照
    undo(state) {

    },
    redo(state) {

    },
    recordSnapshot(state) {

    },

    // 上传、下载
    upload(state) {

    },
    download(state) {

    },

    // 保存、预览、发布
    save(state) {

    },
    preview(state) {

    },
    publish(state) {

    },
  },
  actions: {
    // addComponent({ commit }, componentName) {      
    //   commit('addComponent', componentName)
    // },
  },
  modules: {}
})

