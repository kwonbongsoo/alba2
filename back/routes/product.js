const express = require('express');
const router = express.Router();
const datasource = require('../config/datasource')
const productDB = require('../db/productDB')
const connection = datasource.getConnection()
productDB.setConnection(connection)

// 이미지 업로드
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + "/../config/awsconfig.json");
const s3 = new aws.S3();
const multer = require('multer');
const memorystorage = multer.memoryStorage()
const upload = multer({ storage: memorystorage })


//섬네일처리
const sharp = require('sharp');

/* GET users listing. */
router.get('/l_product', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  // res.send('respond with a resource');
  let page = req.query.page;
  productDB.l_product(page, (result) => {
    res.json(result)
  })
});


router.get('/l_option', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  // res.send('respond with a resource');
  productDB.l_option((result) => {
    
    let arr = []
    let obj
    let options = []

      for(let i = 0; i < result.length; i++) {
        // console.log(result[i])
        result[i].o_name_list = result[i].o_name_list.split(',')
        result[i].o_price_list = result[i].o_price_list.split(',')
        obj = {
          title: result[i].title,
          no: result[i].no,
          multi_yn: result[i].multi_yn,
          option: [],
        }
        for (let k = 0; k < result[i].o_name_list.length; k++) {
          arr = {
            name: result[i].o_name_list[k],
            price: result[i].o_price_list[k]
          }
          obj.option.push(arr)
        }
        options.push(obj)
      }
    res.json(options)
  })
});


router.get('/add', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  // res.send('respond with a resource');
  
  let desc = parseInt(req.query.desc)
  let name = req.query.name
  let price = req.query.price

  productDB.add(name, desc, price, (result) => {
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
  })
});

router.get('/detail', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  // res.send('respond with a resource');
  
  let p_no = req.query.no
  productDB.getOne(p_no, (result) => {
    let tmp = result;

    productDB.detail(p_no, (result) => {
      let arr = []
      let obj
      tmp.options = []

      for(let i = 0; i < result.length; i++) {
        // console.log(result[i])
        result[i].o_name_list = result[i].o_name_list.split(',')
        result[i].o_price_list = result[i].o_price_list.split(',')
        obj = {
          title: result[i].title,
          no: result[i].no,
          multi_yn: result[i].multi_yn,
          option: [],
        }
        for (let k = 0; k < result[i].o_name_list.length; k++) {
          arr = {
            name: result[i].o_name_list[k],
            price: result[i].o_price_list[k]
          }
          obj.option.push(arr)
        }
        tmp.options.push(obj)
      }
      res.json(tmp)
    }, (error) => {
      res.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end('error')
    })
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
  })
});


module.exports = router;
