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
  

  
} // module