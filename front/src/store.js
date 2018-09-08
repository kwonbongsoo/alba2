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
    l_option: '',
    p_length: 1,
    add_product_btn: false,
    option_dialog: false,
  },

  getters: {
    l_product: function(state) {
      return state.l_product
    },
    l_option: function(state) {
      return state.l_option
    },
    p_length: function(state) {
      return state.p_length
    },
    add_product_btn: function(state) {
      return state.add_product_btn
    },
    option_dialog: function(state) {
      return state.option_dialog
    },
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
    l_option: (state, l_option) => {
      state.l_option = l_option
    },
    add_product_btn: (state, add_product_btn) => {
      state.add_product_btn = add_product_btn
    },
    option_dialog: (state, option_dialog) => {
      state.option_dialog = option_dialog
    },
      
  },

  actions: {
    l_product: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'product/l_product',
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
          resolve(res.data)
        })
      })
    },

    l_option: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'product/l_option',
          responseType: 'json'
        })
        .then((res) => {
          context.commit('l_option', res.data)
          resolve(res.data)
        })
      })
    },
  }
})
