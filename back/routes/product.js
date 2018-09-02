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
router.get('/list', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  // res.send('respond with a resource');
  productDB.get((result) => {
    res.json(result)
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

  console.log(price)
  productDB.add(name, desc, price, (result) => {
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
  })
});


module.exports = router;
