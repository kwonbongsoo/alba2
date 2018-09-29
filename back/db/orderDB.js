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
  

  
} // module