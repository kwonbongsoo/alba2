"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  a_login(params, successFn, errorFn) {
    this.connection.query(
        'CALL a_login(?, ?)',
        [params.id, params.pwd],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },
  store_update(params, successFn, errorFn) {
    this.connection.query(
        'CALL store_update(?, ?, ?, ?)',
        [ params.no, params.bank_name, params.bank_no, params.id ],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },

  store_info(params, successFn, errorFn) {
    this.connection.query(
        'CALL store_info(?, ?)',
        [ params.no, params.id ],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },


  a_pwd_update(params, successFn, errorFn) {
    this.connection.query(
        'CALL a_pwd_update(?, ?, ?)',
        [ params.no, params.id, params.pwd ],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },

  app_store_list(params, successFn, errorFn) {
    this.connection.query(
        'CALL app_store_list(?)',
        [ params.u_no],
      function (error, result) {
          console.log(result[0])
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },
  

  store_acpt_nlist(params, successFn, errorFn) {
    this.connection.query(
        'CALL store_acpt_nlist(?)',
        [ params.s_no],
      function (error, result) {
          console.log(result[0])
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },

  store_acpt_cnt(params, successFn, errorFn) {
    this.connection.query(
        'CALL store_acpt_cnt(?)',
        [ params.s_no],
      function (error, result) {
          console.log(result[0])
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },
  
  store_acpt_y(params, successFn, errorFn) {
    this.connection.query(
        'CALL store_acpt_y(?, ?)',
        [ params.s_no, params.us_no],
      function (error, result) {
          console.log(result[0])
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },

  store_acpt_delete(params, successFn, errorFn) {
    this.connection.query(
        'CALL store_acpt_delete(?, ?)',
        [ params.s_no, params.us_no],
      function (error, result) {
          console.log(result[0])
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },

  store_acpt_req(params, successFn, errorFn) {
    this.connection.query(
        'CALL store_acpt_req(?, ?)',
        [ params.u_no, params.s_no],
      function (error, result) {
          console.log(result[0])
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },

  
  

  
} // module