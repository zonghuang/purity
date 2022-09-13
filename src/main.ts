import App from './App.vue'
import router from './router'
import store from './store'
import { PurityComponents, elementPlustIcons } from './components'
import PurityRender from './render'

import '@material/web/button/elevated-button'
import '@material/web/fab/fab'
import '@material/web/textfield/filled-text-field'
import '@material/web/textfield/outlined-text-field'
import '@material/web/switch/switch'

import 'virtual:svg-icons-register'
import 'normalize.css'
import './style.css'

const app = createApp(App)
app.use(elementPlustIcons)
app.use(PurityComponents)
app.use(PurityRender)
app.use(router)
app.use(store)
app.mount('#app')

console.log('env:', import.meta.env.MODE)
