import Vue from 'vue'
import Router from 'vue-router'
import productList from './views/productList.vue'
import login from './views/login.vue'
import masterInfo from './views/masterInfo.vue'
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
        auth: store.getters.alba2_login.login
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
        auth : store.getters.alba2_login.login
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        auth: true
      }
    },
    {
      path: '/masterInfo',
      name: 'masterInfo',
      component: masterInfo,
      meta: {
        auth : store.getters.alba2_login.login
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(!to.matched.some((routerInfo) => {
    return routerInfo.meta.auth;
  }))
  {
    if (store.getters.alba2_login.login)
      next()
    else
      next('/login')
  }
  else {
    next()
  }
})

export default router
