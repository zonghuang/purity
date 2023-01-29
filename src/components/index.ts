import type { App } from 'vue'
import * as icons from '@element-plus/icons-vue'

const mode = import.meta.env.MODE

// 全量导入 Element Plus Icons
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
    const modules = import.meta.glob('./**/*.vue')
    for (const path in modules) {
      modules[path]().then((mod: any) => {
        // const name = 'zh-' + mod.default.__name
        const name = mod.default.__name.includes('zh-') ? mod.default.__name : 'zh-' + mod.default.__name
        app.component(name, mod.default)
      })
    }
  }
}

// 按需导入组件
const demandComponents = {
  version: 'v1',
  install: async (app: App) => {
    // 遍历传入需要的组件，打包
    // const demands = await useRequest({ url: '' })
    // demands.data.forEach(async (file: any) => {
    //   const module = await import(`./**/${file}.vue`)
    //   // app.component()
    // })

    // 现在先全量打包，这是临时的
    const modules = import.meta.glob('./**/*.vue')
    for (const path in modules) {
      modules[path]().then((mod: any) => {
        app.component(path.split('/')[1], mod.default)
      })
    }
  }
}

// 所有组件的默认配置数据 (build 库的时候不用打包组件配置)
const componentsConfig: { [key: string]: Component } = {}
if (mode !== 'lib') {
  const allConfig = import.meta.glob('./**/config.ts')
  for (const path in allConfig) {
    allConfig[path]().then((mod: any) => {
      // const name = 'zh-' + mod.default.name
      const name = mod.default.name.includes('zh-') ? mod.default.name : 'zh-' + mod.default.name
      componentsConfig[name] = mod.default
    })
  }
}

const PurityComponents = mode === 'development' ? allComponents : demandComponents

export { elementPlustIcons, PurityComponents, componentsConfig }
