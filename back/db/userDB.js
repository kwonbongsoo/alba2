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