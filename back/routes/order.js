var express = require('express');
var router = express.Router();
const datasource = require('../config/datasource')
const orderDB = require('../db/orderDB')
const connection = datasource.getConnection()
orderDB.setConnection(connection)

/* GET home page. */

router.post('/c_order', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
      u_no: parseInt(req.body.u_no),
      s_no: parseInt(req.body.s_no),
      total_price: req.body.total_price,
      item_price: req.body.item_price,
      item_name: req.body.item_name,
      item_cnt: req.body.item_cnt,
      item_option: req.body.item_option  
  }

  console.log(params)

  orderDB.c_order(params, (result) => {
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});


router.get('/u_order_list', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
      u_no: parseInt(req.query.u_no),
      s_no: parseInt(req.query.s_no),
      s_dt: req.query.s_dt+'-01',
      e_dt: req.query.s_dt+'-31'
  }

  console.log(params)

  orderDB.u_order_list(params, (result) => {
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
    res.json(error);
  })
});

module.exports = router;
