"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  c_order(params, successFn, errorFn) {
    this.connection.query(
        'CALL c_order(?, ?, ?, ?, ?, ?, ?, ?)',
        [params.u_no, params.s_no, params.total_price ,params.item_price , params.item_name , params.item_cnt, params.item_option, params.item_no],
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
        'CALL s_l_order(?, ?, ?, ?, ?, ?)',
        [params.s_no, params.s_dt, params.e_dt ,params.page, params.status, params.search],
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
        'CALL pay_confirm(?)',
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

  delivery_start(params, successFn, errorFn) {
    this.connection.query(
        'CALL delivery_start(?, ?, ?)',
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


  s_order_cancel(params, successFn, errorFn) {
    this.connection.query(
      'CALL s_order_cancel(?, ?, ?)',
      [params.s_no, params.o_no, params.reason],
    function (error, result) {
      if (error) {
        console.log(error)
        errorFn(error)
      } else {
        successFn(result)
      }
    })
  },

  s_l_cancel_req(params, successFn, errorFn) {
    this.connection.query(
      'CALL s_l_cancel_req(?)',
      [params.s_no],
    function (error, result) {
      if (error) {
        console.log(error)
        errorFn(error)
      } else {
        successFn(result)
      }
    })
  },

  o_cancel_n(params, successFn, errorFn) {
    this.connection.query(
      'CALL o_cancel_n(?, ?)',
      [params.s_no, params.o_no],
    function (error, result) {
      if (error) {
        console.log(error)
        errorFn(error)
      } else {
        successFn(result)
      }
    })
  },

  o_cancel_y(params, successFn, errorFn) {
    this.connection.query(
      'CALL o_cancel_y(?, ?)',
      [params.s_no, params.o_no],
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