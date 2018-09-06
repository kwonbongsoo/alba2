import Vue from 'vue'
import Router from 'vue-router'
import productList from './views/productList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/productList',
      name: 'productList',
      component: productList
    },
    {
      path: '/product/:no',
      name: 'product',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/product.vue')
    }
  ]
})
