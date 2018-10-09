"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  s_notice_add(params, successFn, errorFn) {
    this.connection.query(
      'CALL s_notice_add(?, ?, ?)',
      [params.s_no, params.n_title, params.n_content],
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