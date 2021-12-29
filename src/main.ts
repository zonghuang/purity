import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'

import CustomComponent from './components'

const app = createApp(App)
app.use(ElementPlus)
app.use(CustomComponent)
app.use(router)
app.mount('#app')

console.log(import.meta.env);
