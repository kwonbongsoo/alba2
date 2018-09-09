"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  l_product(page, successFn, errorFn) {
    this.connection.query(
        'CALL l_product(?)',
        [page],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },
  add(name, price, desc, sold_yn, option, imageName, img_path, successFn, errorFn) {
    this.connection.query(
      'CALL add_product(?, ?, ?, ?, ?, ?, ?)',
      [name, price, desc, sold_yn, option, imageName, img_path],
      function (error, result) {
        console.log(error)
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  update(no ,name, price, desc, sold_yn, option, imageName, img_path, successFn, errorFn) {
    this.connection.query(
      'CALL update_product(?, ?, ?, ?, ?, ?, ?, ?)',
      [no, name, price, desc, sold_yn, option, imageName, img_path],
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
  l_option(successFn, errorFn) {
    this.connection.query(
        'CALL l_option()',
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