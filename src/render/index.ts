import type { App } from 'vue'
import Render from './Render.vue'
import RenderTemplate from './render-template.vue'

const PurityRender = {
  version: 'v1',
  install: (app: App) => {
    app.component('Render', Render)
    app.component('render-template', RenderTemplate)
  }
}

export default PurityRender
