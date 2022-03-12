import type { App } from 'vue'
import * as icons from '@element-plus/icons-vue'
import { IComponentConfig } from '../interface-type'

// Element Plus Icons
const elementPlustIcons = {
  version: 'v1',
  install: (app: App) => {
    for (const iconName in icons) {
      if (Reflect.has(icons, iconName))
        // @ts-ignore
        app.component(iconName, icons[iconName])
    }
  }
}

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
    // 遍历传入需要的组件，打包
    // const modules = import.meta.globEager('./**/zh-button.vue')

    // 现在先全量打包，这是临时的
    const modules = import.meta.globEager('./**/*.vue')

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

export { elementPlustIcons, components, componentsConfig }
