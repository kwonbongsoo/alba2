import Vue from 'vue'
import Vuex from 'vuex'
import { isContext } from 'vm';
import { resolve } from 'path';
import axios from 'axios'

Vue.use(Vuex)
// const api_url = "http://52.79.236.19:3000/"
const api_url = "http://127.0.0.1:3000/"

export default new Vuex.Store({
  state: {
    l_product: '',
    p_length: 1,
  },

  getters: {
    l_product: function(state) {
      return state.l_product
    },
    p_length: function(state) {
      return state.p_length
    }
  },

  mutations: {
    l_product: (state, l_product) => {
      state.l_product = l_product
      if(l_product.length > 0) {
        let length = l_product[0].total
        if (length % 10 > 0) {
           state.p_length = parseInt((length / 10) + 1)
        }
        else {
          state.p_length = parseInt(length / 10)
        }
      }
    },
  },

  actions: {
    l_product: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'product/list',
          responseType: 'json'
        })
        .then((res) => {
          context.commit('l_product', res.data)
          resolve(res.data)
        })
      })
    },

    add_product: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'product/add',
          responseType: 'json'
        })
        .then((res) => {
          // context.commit('l_product', res.data)
          console.log(res.data)
        })
      })
    },

    product_detail: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'product/detail',
          responseType: 'json'
        })
        .then((res) => {
          // context.commit('l_product', res.data)
          console.log(res.data)
        })
      })
    }
  }
})
