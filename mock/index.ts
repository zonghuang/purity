import { cloneDeep } from 'lodash-es'

import { config } from './sso/app-manage/sso-app-manage'

export const getPages = async (query: any) => {
  // (build 库的时候不用打包)
  const mode = import.meta.env.MODE
  // if (mode == 'lib') return []
  if (mode == 'lib') return [config]

  const { system, module, page } = query

  // system 或 module 不存在时
  if (!system || !module) {
    const page = { name: 'home', title: '首页', elements: [], settings: {} }
    const config = cloneDeep(page)
    return [config]
  }

  const allConfig: any = {}
  const modules = await import.meta.glob('./**/*.ts')
  for (const path in modules) {
    await modules[path]().then((mod: any) => {
      const key = path.slice(2, path.indexOf('.ts'))
      const value = mod.config
      allConfig[key] = cloneDeep(value)
    })
  }

  const key = `${system}/${module}/${page ? page : 'index'}`
  return page ? [allConfig[key]] : allConfig[key]
}
