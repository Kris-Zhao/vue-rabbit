import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'layout',
      path: '/',
      component: Layout,
      children: [
        {
          // default to be rendered as well when url is '/'
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
