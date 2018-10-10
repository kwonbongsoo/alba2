var express = require('express');
var router = express.Router();
const datasource = require('../config/datasource')
const noticeDB = require('../db/noticeDB')
const connection = datasource.getConnection()
noticeDB.setConnection(connection)




/* GET home page. */

router.post('/s_notice_add', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    s_no: parseInt(req.query.s_no),
    n_title: req.query.title,
    n_content: req.query.content
  }

  console.log(params);

  noticeDB.s_notice_add(params, (result) => {
    console.log(result)
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});


router.get('/s_l_notice', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    s_no: parseInt(req.query.s_no, 10),
    page: parseInt(req.query.page, 10)
  }

  console.log(params);

  noticeDB.s_l_notice(params, (result) => {
    console.log(result)
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});



module.exports = router;
