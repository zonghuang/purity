import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'admin'
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('./admin/Admin.vue')
    // component: () => import('./admin/AdminTest.vue')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('./editor/Editor.vue')
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('./render/Render.vue')
  },
  {
    path: '/render/:system/:module/:page',
    name: 'render',
    component: () => import('./render/Render.vue')
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
