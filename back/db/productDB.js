"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  get(successFn, errorFn) {
    this.connection.query(
        'CALL l_product()',
      function (error, result) {
        console.log(result)
        if (error) {
          errorFn(error)
        } else {
          successFn(result[0])
        }
      })
  },
  add(name, desc, price, successFn, errorFn) {
    this.connection.query(
      'CALL add_product(?, ?, ?)',
      [name, desc, price],
      function (error, result) {
        console.log(error)
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
//   delete(no, successFn, errorFn) {
//     this.connection.query(
//       'delete from product where no = ?',
//       [no],
//       function (error, result) {
//         if (error) {
//           errorFn(error)
//         } else {
//           successFn(result)
//         }
//       })
//   }
  
} // module