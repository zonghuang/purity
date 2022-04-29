// 此文件用于构建库时，导出 (其他情况下入口是 main.ts)
import PurityStore from './store'
import { components as PurityComponent, elementPlustIcons } from './components'
import PurityRender from './render'

import 'virtual:svg-icons-register'
import 'normalize.css'
import './styles.less'

export { PurityStore, PurityComponent, PurityRender, elementPlustIcons }
