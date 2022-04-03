import _ from "lodash"

export const getPages = async (query: any) => {
  const { system, module, page } = query

  // system 或 module 不存在时
  if (!system || !module) {
    const page = { id: 'p1', name: '首页', path: '/home', elements: [], settings: {} }
    const config = _.cloneDeep(page)
    return [config]
  }

  // 只导入一个页面
  if (page) {
    const pageConfig = await import(`./${system}/${module}/${page}`)
    const config = _.cloneDeep(pageConfig.config)
    return [config]
  }

  // 导入一个模块
  const moduleConfig = await import(`./${system}/${module}`)
  const configs = _.cloneDeep(moduleConfig.configs)
  return configs
}
