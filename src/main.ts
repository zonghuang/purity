import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'normalize.css'

import ZhButton from './components/zh-button/zh-button.vue'
console.log(ZhButton);


const app = createApp(App)
app.use(ElementPlus)
app.component('zh-button', ZhButton)
app.mount('#app')
