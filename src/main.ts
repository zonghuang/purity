import App from './App.vue'
import router from './router'
import store from './store'
import { components } from './components'

import 'virtual:svg-icons-register';
import 'normalize.css'

const app = createApp(App)
app.use(components)
app.use(router)
app.use(store)
app.mount('#app')

console.log('env:', import.meta.env.MODE);
