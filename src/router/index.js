import { createRouter, createWebHistory } from 'vue-router'
import WindowView from '../views/WindowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WindowView
    }
  ]
})

export default router
