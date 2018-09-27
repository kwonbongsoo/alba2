"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  u_login(params, successFn, errorFn) {
    this.connection.query(
        'CALL u_login(?, ?, ?)',
        [params.id, params.pwd, params.token],
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
        'CALL email_auth_confirm(?)',
        [ params.email ],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },

  u_add(params, successFn, errorFn) {
    this.connection.query(
        'CALL u_add(?, ?, ?, ?)',
        [ params.email, params.pwd, params.token, params.alias ],
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