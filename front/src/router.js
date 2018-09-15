import Vue from 'vue'
import Router from 'vue-router'
import productList from './views/productList.vue'
import login from './views/login.vue'
import store from './store'

Vue.use(Router)
const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/productList',
      name: 'productList',
      component: productList,
      meta: {
        auth: store.getters.alba2_login
      }
    },
    {
      path: '/product',
      name: 'product',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/product.vue'),
      meta: {
        auth : store.getters.alba2_login
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(!to.matched.some((routerInfo) => {
    return routerInfo.meta.auth;
  }))
  {
    next('/login')
  }
  else {
    next()
  }
})

export default router
