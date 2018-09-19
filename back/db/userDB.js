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
  info_update(params, successFn, errorFn) {
    this.connection.query(
        'CALL info_update(?, ?, ?, ?)',
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

  user_info(params, successFn, errorFn) {
    this.connection.query(
        'CALL user_info(?, ?)',
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


  pwd_update(params, successFn, errorFn) {
    this.connection.query(
        'CALL pwd_update(?, ?, ?)',
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

  email_auth_confirm(params, successFn, errorFn) {
    this.connection.query(
        'CALL email_auth_confirm(?, ?)',
        [ params.email, params.confirm_no ],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },
  

  
} // module