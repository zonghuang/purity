import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { store, key } from './editor/store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register';
import 'normalize.css'

import { Components } from './components'

const app = createApp(App)
app.use(Components)
app.use(ElementPlus)

app.use(router)
app.use(store, key)
app.mount('#app')

console.log('env:', import.meta.env.MODE);
