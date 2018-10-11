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

  s_notice_update(params, successFn, errorFn) {
    this.connection.query(
      'CALL s_notice_update(?, ?, ?, ?)',
      [params.s_no, params.n_title, params.n_content, params.n_no],
    function (error, result) {
      if (error) {
        console.log(error)
        errorFn(error)
      } else {
        successFn(result)
      }
    })
  },

  s_l_notice(params, successFn, errorFn) {
    this.connection.query(
      'CALL s_l_notice(?, ?)',
      [params.s_no, params.page],
    function (error, result) {
      if (error) {
        console.log(error)
        errorFn(error)
      } else {
        successFn(result)
      }
    })
  },

  delete_notice(params, successFn, errorFn) {
    this.connection.query(
      'CALL delete_notice(?)',
      [params.n_no],
    function (error, result) {
      if (error) {
        console.log(error)
        errorFn(error)
      } else {
        successFn(result)
      }
    })
  },

  s_n_one(params, successFn, errorFn) {
    this.connection.query(
      'CALL s_n_one(?)',
      [params.n_no],
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