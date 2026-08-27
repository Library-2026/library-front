import {createRouter, createWebHistory} from "vue-router"
import {defineAsyncComponent} from "vue"

const ifAuthorized = () => {
  if (localStorage.getItem('accessToken')) {
    return true
  }

  return '/login'
}

const ifNotAuthorized = () => {
  if (localStorage.getItem('accessToken')) {
    return '/'
  }

  return true
}

const routes = [

  {
    path: '/',
    component: () => import('@/pages/HomePage.vue'),
    meta: {layout: defineAsyncComponent(() => import('@/layouts/DefaultLayout.vue'))},
    beforeEnter: ifAuthorized
  },
  {
    path: '/book-content/:bookId',
    component: () => import('@/pages/BookContent.vue'),
    meta: {layout: defineAsyncComponent(() => import('@/layouts/DefaultLayout.vue'))},
    beforeEnter: ifAuthorized
  },

  {
    path: '/login',
    component: () => import('@/pages/LoginPage.vue'),
    meta: {layout: defineAsyncComponent(() => import('@/layouts/BlankLayout.vue'))},
    beforeEnter: ifNotAuthorized
  },
  {
    path: '/book/add',
    component: () => import('@/pages/BookAdd.vue'),
    meta: {layout: defineAsyncComponent(() => import('@/layouts/DefaultLayout.vue'))},
    beforeEnter: ifAuthorized
  },
  {
    path: "/books/:bookId/read",
    name: "book-read",
    component: () => import("@/pages/BookReader.vue"),
    meta: {
      layout: defineAsyncComponent(() => import('@/layouts/DefaultLayout.vue'))
    },
    beforeEnter: ifAuthorized
  },
  {
    path: '/categories/:id',
    component: () => import('@/pages/HomePage.vue'),
    meta: {layout: defineAsyncComponent(() => import('@/layouts/DefaultLayout.vue'))},
    beforeEnter: ifAuthorized
  },
  {
    path: '/categories/set',
    component: () => import('@/pages/CategorySetPage.vue'),
    meta: {layout: defineAsyncComponent(() => import('@/layouts/DefaultLayout.vue'))},
    beforeEnter: ifAuthorized
  },
  {
    path: '/register',
    component: () => import('@/pages/RegisterPage.vue'),
    meta: {layout: defineAsyncComponent(() => import('@/layouts/BlankLayout.vue'))},
    beforeEnter: ifNotAuthorized
  },
  {
    path: '/my',
    component: () => import('@/pages/MyCabinet.vue'),
    meta: {layout: defineAsyncComponent(() => import('@/layouts/DefaultLayout.vue'))},
    beforeEnter: ifAuthorized
  },

]

export default createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'bg-gray-500'
})
