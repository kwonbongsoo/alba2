import Vue from 'vue'
import Vuex from 'vuex'
import { isContext } from 'vm';
import { resolve } from 'path';
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)
const api_url = "https://thehandsgift.com:3000/"
// const api_url = "http://127.0.0.1:3000/"

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    l_product: '',
    product: '',
    p_length: 1,
    add_product_btn: false,
    dialog: {
      dialog: false,
      title: '',
      content: '',
    },
    progress: false,
    alba2_login: {
      login: false,
      id: '',
      pw: '',
      no: ''
    },
    acpt_cnt: 0,
    o_list: '',
    statistics_list: '',
    delivery_info: {
      order_no: ''
    },
    s_order_cancel_info: {
      s_no: '',
      o_no: ''
    },
    add_notice_btn: false,
  },

  getters: {
    l_product: function(state) {
      return state.l_product
    },
    product: function(state) {
      return state.product
    },
    p_length: function(state) {
      return state.p_length
    },
    add_product_btn: function(state) {
      return state.add_product_btn
    },
    dialog: function(state) {
      return state.dialog
    },
    progress: function(state) {
      return state.progress
    },
    alba2_login: function(state) {
      return state.alba2_login
    },
    acpt_cnt: function(state) {
      return state.acpt_cnt
    },
    o_list: function(state) {
      return state.o_list
    },
    statistics_list: function(state) {
      return state.statistics_list
    },
    delivery_info: function(state) {
      return state.delivery_info
    },
    s_order_cancel_info: function(state) {
      return state.s_order_cancel_info
    },
    add_notice_btn: function(state) {
      return state.add_notice_btn
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
    product: (state, product) => {
      state.product = product
    },
    add_product_btn: (state, add_product_btn) => {
      state.add_product_btn = add_product_btn
    },
    dialog: (state, dialog) => {
      state.dialog = dialog
    },
    progress: (state, progress) => {
      state.progress = progress
    },
    alba2_login: (state, alba2_login) => {
      state.alba2_login = alba2_login
    },
      
    acpt_cnt: (state, acpt_cnt) => {
      state.acpt_cnt = acpt_cnt
    },
    o_list: (state, o_list) => {
      state.o_list = o_list
    },
    statistics_list: (state, statistics_list) => {
      state.statistics_list = statistics_list
    },
    delivery_info: (state, delivery_info) => {
      state.delivery_info = delivery_info
    },
    s_order_cancel_info: (state, s_order_cancel_info) => {
      state.s_order_cancel_info = s_order_cancel_info
    },
    add_notice_btn: (state, add_notice_btn) => {
      state.add_notice_btn = add_notice_btn
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

    add_update_product: (context, params) => {
      return new Promise((resolve, reject) => {
        axios.post( api_url + 'product/add_update',
          params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
          resolve(res.data);
        });
      })
    },

    d_product: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'product/d_product',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data)
        })
      })
    },
    a_login: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          params: params,
          url: api_url + 'store/a_login',
          responseType: 'json'
        })
        .then((res) => {
          let msg = ''
          console.log(res)
          if (res.data[0].result == 'SUCCESS') {
            context.commit('alba2_login', {
              login: true,
              id: params.id,
              pwd: params.pwd,
              no: res.data[0].no,
              store_name: res.data[0].store_name
            })
          }
          else {
            context.commit('alba2_login', {
              login: false,
              id: '',
              pwd: '',
              no: '',
              store_name: ''
            })
          }
          resolve(res.data[0].result)
        })
      })
    },

    store_update: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          params: params,
          url: api_url + 'store/store_update',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.statusText)
        })
      })
    },

    store_info: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'store/store_info',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data)
        })
      })
    },

    a_pwd_update: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          params: params,
          url: api_url + 'user/a_pwd_update',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.statusText)
        })
      })
    },

    store_acpt_nlist: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'store/store_acpt_nlist',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data)
        })
      })
    },

    store_acpt_cnt: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'store/store_acpt_cnt',
          responseType: 'json'
        })
        .then((res) => {
          context.commit('acpt_cnt', res.data[0].cnt)
          // console.log(res.data[0].cnt)
          // resolve(res.data)
        })
      })
    },
    
    store_acpt_y: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'store/store_acpt_y',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.statusText)
        })
      })
    },

    store_acpt_delete: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'store/store_acpt_delete',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.statusText)
        })
      })
    },

    s_l_order: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'order/s_l_order',
          responseType: 'json'
        })
        .then((res) => {
          console.log(res.data)
          let obj = [];
          let tmp, tmp2, tmp3, tmp4;
          for (let i = 0; i < res.data.length; i++) {
            obj = [];
            tmp = res.data[i].product_names.split('/');
            tmp2 = res.data[i].product_prices.split('/');
            tmp3 = res.data[i].options.split('/');
            tmp4 = res.data[i].count.split('/');

            for (let i = 0; i < tmp.length; i++) {
              obj.push(tmp[i] + ' / ' + tmp2[i] + '원' + ' / ' + tmp3[i] + ' / ' + tmp4[i] + '개');
            }
            res.data[i].product_desc = obj;
            
          }
          context.commit('o_list', res.data);
          if (res.data.length > 0)
            resolve(res.data[0])
          else
            resolve(res.data)
        })
      })
    },

    s_o_statistics: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'order/s_o_statistics',
          responseType: 'json'
        })
        .then((res) => {
          console.log(res.data)
          context.commit('statistics_list', res.data);
          resolve(res.data[0])
        })
      })
    },

    pay_confirm: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'order/pay_confirm',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data)
        })
      })
    },

    delivery_start: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'order/delivery_start',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data)
        })
      })
    },

    s_order_cancel: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'order/s_order_cancel',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data[0])
        })
      })
    },
    
    s_l_cancel_req: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'order/s_l_cancel_req',
          responseType: 'json'
        })
        .then((res) => {
          console.log(res)
          resolve(res.data)
        })
      })
    },

    o_cancel_n: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'order/o_cancel_n',
          responseType: 'json'
        })
        .then((res) => {
          console.log(res)
          resolve(res.data[0])
        })
      })
    },

    o_cancel_y: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'order/o_cancel_y',
          responseType: 'json'
        })
        .then((res) => {
          console.log(res)
          resolve(res.data[0])
        })
      })
    },

    s_notice_add: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          params: params,
          url: api_url + 'notice/s_notice_add',
          responseType: 'json'
        })
        .then((res) => {
          console.log(res)
          resolve(res.data[0])
        })
      })
    },

    s_notice_update: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          params: params,
          url: api_url + 'notice/s_notice_update',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data[0])
        })
      })
    },

    s_l_notice: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'notice/s_l_notice',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data)
        })
      })
    },

    delete_notice: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'notice/delete_notice',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.statusText)
        })
      })
    },

    s_n_one: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'notice/s_n_one',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data[0])
        })
      })
    },



    
  }
})
