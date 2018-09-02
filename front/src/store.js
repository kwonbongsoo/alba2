import Vue from 'vue'
import Vuex from 'vuex'
import { isContext } from 'vm';
import { resolve } from 'path';
import axios from 'axios'

Vue.use(Vuex)
const api_url = "http://127.0.0.1:3000/"
export default new Vuex.Store({
  state: {
    l_product: '',
  },

  getters: {
    l_product: function(state) {
      return state.l_product
    }
  },

  mutations: {
    l_product: (state, l_product) => {
      state.l_product = l_product
    }
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
          console.log(res.data)
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
    }
  }
})
