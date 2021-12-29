import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'render'
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('./editor/Editor.vue')
  },
  {
    path: '/render',
    name: 'render',
    component: () => import('./render/Render.vue')
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
