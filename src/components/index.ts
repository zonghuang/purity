import { App } from 'vue'

// 全量导入
const all = {
  version: 'v1',
  install: (app: App) => {
    const modules = import.meta.globEager('./**/*.vue') 
    for (const path in modules) {
      app.component(path.split('/')[1], modules[path].default)
    }
  }
}

// 按需导入（为啥按需引入打包更大？？？）
const demand = {
  version: 'v1',
  install: (app: App) => {
    const modules = import.meta.globEager('./**/zh-button.vue') 
    for (const path in modules) {
      app.component(path.split('/')[1], modules[path].default)
    }
  }
}

export default import.meta.env.MODE !== 'development' ? all : demand
