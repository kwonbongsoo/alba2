import Vue from 'vue'
import Router from 'vue-router'
import productList from './views/productList.vue'
import login from './views/login.vue'
import masterInfo from './views/masterInfo.vue'
import userAcpt from './views/user_acpt.vue'
import order from './views/order.vue'
import statistics from './views/statistics.vue'
import cancelList from './views/cancelList.vue'
import noticeDetail from './views/notice_detail.vue'
import noticeList from './views/noticeList.vue'
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
    },
    {
      path: '/userAcpt',
      name: 'userAcpt',
      component: userAcpt,
      meta: {
        auth : store.getters.alba2_login.login
      }
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      meta: {
        auth : store.getters.alba2_login.login
      }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: statistics,
      meta: {
        auth : store.getters.alba2_login.login
      }
    },
    {
      path: '/cancelList',
      name: 'cancelList',
      component: cancelList,
      meta: {
        auth : store.getters.alba2_login.login
      }
    },
    {
      path: '/noticeDetail',
      name: 'noticeDetail',
      component: noticeDetail,
      meta: {
        auth : store.getters.alba2_login.login
      }
    },
    {
      path: '/noticeList',
      name: 'noticeList',
      component: noticeList,
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
