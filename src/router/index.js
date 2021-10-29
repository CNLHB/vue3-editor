import { createRouter, createWebHistory } from 'vue-router'
import index from './modules/index/'
import editor from './modules/editor/index'

export const constantRouterMap = [
  ...index,
  ...editor,
  { path: '/404', component: () => import('@/components/404.vue') },
  { path: '/:catchAll(.*)', redirect: '/404' }
]

// const base = location.pathname.split('/').slice(0, window.baseLen + 1).join('/')
const base = '/editor'

const router = createRouter({
  history: createWebHistory(base),
  routes: constantRouterMap
})

export default router
