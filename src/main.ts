import App from './App.vue'
import router from './router'
import store from './store'
import { PurityComponents, elementPlustIcons } from './components'
// import PurityRender from './render'

// button
import '@material/web/button/elevated-button'
import '@material/web/fab/fab-extended'
import '@material/web/fab/fab'
import '@material/web/button/filled-button'
import '@material/web/button/tonal-button'
import '@material/web/button/outlined-button'
import '@material/web/button/outlined-link-button'
import '@material/web/segmentedbutton/outlined-segmented-button'

// checkbox
import '@material/web/checkbox/checkbox'

// radio
import '@material/web/radio/radio'

// text-field
import '@material/web/textfield/filled-text-field'
import '@material/web/textfield/outlined-text-field'

// switch
import '@material/web/switch/switch'

import 'virtual:svg-icons-register'
import 'normalize.css'
import './style.css'

const app = createApp(App)
app.use(elementPlustIcons)
app.use(PurityComponents)
// app.use(PurityRender)
app.use(router)
app.use(store)
app.mount('#app')

console.log('env:', import.meta.env.MODE)
