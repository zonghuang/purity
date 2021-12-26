import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'normalize.css'


import { register } from './components/index'

// const demands = ['zh-button', 'zh-input', 'zh-select']
// register(demands)
register()

const app = createApp(App)

app.config.compilerOptions.isCustomElement = tag => tag.includes('-')

app.use(ElementPlus)
app.mount('#app')
