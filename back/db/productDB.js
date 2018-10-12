"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  l_product(params, successFn, errorFn) {
    this.connection.query(
        'CALL l_product(?, ?)',
        [params.page, params.store_no],
      function (error, result) {
        if (error) {
          console.log(error)
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },
  add(params, successFn, errorFn) {
    this.connection.query(
      'CALL add_product(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [params.name, params.price, params.desc, params.o_name, params.o_price, params.o_cnt, params.imageName, params.img_path, params.store_no],
      function (error, result) {
        console.log(error)
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  update(params, successFn, errorFn) {
    this.connection.query(
      'CALL update_product(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [params.no, params.name, params.price, params.desc, params.o_name, params.o_price, params.o_cnt, params.imageName, params.img_path, params.store_no],
      function (error, result) {
        console.log(error)
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  detail(p_no, successFn, errorFn) {
    this.connection.query(
        'CALL product_detail(?)',
        [p_no],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },
  getOne(p_no, successFn, errorFn) {
    this.connection.query(
        'select * from product where no = (?)',
        [p_no],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },

  d_product(no, successFn, errorFn) {
    this.connection.query(
      'CALL d_product(?)',
      [no],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  }

//   update(name, price, price1, imageName, img_path, no, successFn, errorFn) {
//     this.connection.query(
//       'update product set name = ?, price = ?, price1 = ?, imageName = ?, img_path = ? where no = ?',
//       [name, price, price1, imageName, img_path, no],
//       function (error, result) {
//         if (error) {
//           errorFn(error)
//         } else {
//           successFn(result)
//         }
//       })
//   },

  
} // module