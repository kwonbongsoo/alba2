"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  c_order(params, successFn, errorFn) {
    this.connection.query(
        'CALL c_order(?, ?, ?, ?, ?, ?, ?)',
        [params.u_no, params.s_no, params.total_price ,params.item_price , params.item_name , params.item_cnt, params.item_option],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },


  u_order_list(params, successFn, errorFn) {
    this.connection.query(
        'CALL u_order_list(?, ?, ?, ?)',
        [params.u_no, params.s_no, params.s_dt ,params.e_dt],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },

  s_l_order(params, successFn, errorFn) {
    this.connection.query(
        'CALL s_l_order(?, ?, ?, ?, ?)',
        [params.s_no, params.s_dt, params.e_dt ,params.page, params.status],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },


  s_o_statistics(params, successFn, errorFn) {
    this.connection.query(
        'CALL s_o_statistics(?, ?, ?, ?)',
        [params.s_no, params.s_dt, params.e_dt ,params.page],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },

  pay_confirm(params, successFn, errorFn) {
    this.connection.query(
        'CALL pay_confirm(?, ?, ?)',
        [params.order_no, params.delivery_name, params.delivery_no],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },

  order_end(params, successFn, errorFn) {
    this.connection.query(
        'CALL order_end(?)',
        [params.order_no],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },


  u_o_cancel_req(params, successFn, errorFn) {
    this.connection.query(
      'CALL u_o_cancel_req(?, ?)',
      [params.u_no, params.o_no],
    function (error, result) {
      if (error) {
        console.log(error)
        errorFn(error)
      } else {
        successFn(result)
      }
    })
  },
  

  u_o_cancel_cancel(params, successFn, errorFn) {
    this.connection.query(
      'CALL u_o_cancel_cancel(?, ?)',
      [params.u_no, params.o_no],
    function (error, result) {
      if (error) {
        console.log(error)
        errorFn(error)
      } else {
        successFn(result)
      }
    })
  },

  
} // module