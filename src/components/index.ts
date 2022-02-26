import { App } from 'vue'
import { IComponentConfig } from '../editor/interface'

// 全量导入组件
const allComponents = {
  version: 'v1',
  install: (app: App) => {
    const modules = import.meta.globEager('./**/*.vue')
    for (const path in modules) {
      app.component(path.split('/')[1], modules[path].default)
    }
  }
}

// 按需导入组件（为啥按需引入打包更大？？？）
const demandComponents = {
  version: 'v1',
  install: (app: App) => {
    const modules = import.meta.globEager('./**/zh-button.vue') 
    for (const path in modules) {
      app.component(path.split('/')[1], modules[path].default)
    }
  }
}

// 所有组件的默认配置数据
const componentsConfig: IComponentConfig = {}
const allConfig = import.meta.glob('./**/*.ts')
for (const path in allConfig) {
  allConfig[path]().then((mod) => {
    componentsConfig[path.split('/')[1]] = mod.default
  })
}

const components = import.meta.env.MODE === 'development' ? allComponents : demandComponents

export { components, componentsConfig }
