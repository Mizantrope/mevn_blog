import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: () => import('@/pages/MainPage'),
  },
  {
    path: '/posts',
    name: 'PostPage',
    component: () => import('@/pages/PostPage'),
  },
  {
    path: '/:id',
    name: 'PostPage',
    component: () => import('@/pages/PostPage'),
  },
  {
    path: '/:id/edit',
    name: 'EditPostPage',
    component: () => import('@/pages/EditPostPage'),
  },
  {
    path: '/new',
    name: 'AddPostPage',
    component: () => import('@/pages/AddPostPage'),
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('@/pages/RegisterPage'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/pages/LoginPage'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuth = store.getters.authenticate
  console.log('route: ', isAuth)
  if (to.fullPath === '/login' && isAuth) next('/')
  else next()
})

export default router
