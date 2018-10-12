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
  //앱애서도 사용함
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  // res.send('respond with a resource');

  let params = {
    page: req.query.page,
    store_no: req.query.s_no
  }
  productDB.l_product(params, (result) => {
    let arr = []
    let tmp, option_names, option_prices, option_no, option_cnts, option_arr = []
    for (let i = 0; i < result.length;  i++) {
      // console.log(result[i])
      if(result[i].option_names) {
        option_names = result[i].option_names.split(',')
        option_prices = result[i].option_price.split(',')
        option_no = result[i].option_no.split(',')
        option_cnts = result[i].option_cnts.split(',')
        for(let j = 0; j < option_names.length; j++) {
          tmp = {
            name : option_names[j],
            price : option_prices[j],
            option_no : option_no[j],
            o_cnt : option_cnts[j]
          }
          option_arr.push(tmp)
        }
      }

      
      tmp = {
        desc: result[i].desc,
        img_name : result[i].img_name,
        img_url : result[i].img_url,
        name : result[i].name,
        no : result[i].no,
        price : result[i].price,
        total: result[i].total,
        options: option_arr,
        total_cnt: result[i].total_cnt
      }
      arr.push(tmp)
      option_arr = []
    }
    res.json(arr)
  })
});


router.post('/add_update', 
upload.single('file'), 
function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  // res.send('respond with a resource');
  
  if(req.file) {
    sharp(req.file.buffer)
    .resize(400, 200)
    .max()
    .toFormat(req.file.mimetype.split('/')[1])
    .toBuffer()
    .then(function(outputBuffer) {
    // outputBuffer contains JPEG image data no wider than 200 pixels and no higher
    // than 200 pixels regardless of the inputBuffer image dimensions
    let i_name = new Date().getTime()+'.'+req.file.mimetype.split('/')[1]
    var s3_params = {
      Bucket: 'img.storage',
      Key: i_name,
      ACL: 'public-read',
      ContentTpye: req.file.mimetype
    };
    
    var s3obj = new aws.S3({ params: s3_params });
    s3obj.upload({ Body: outputBuffer })
    .on('httpUploadProgress',function(progress) {
      console.log(Math.round(progress.loaded/progress.total*100)+ '% done');
      }).
      send(function (err, data) {
        //S3 File URL
        let params = {
          img_path : data.Location,
          imageName : data.key,
          no : parseInt(req.body.no),
          name : req.body.name ,
          price : req.body.price,
          desc : req.body.desc,
          o_name : req.body.o_name,
          o_price : req.body.o_price,
          o_cnt : req.body.o_cnt,
          original_name : req.body.original_name,
          store_no : parseInt(req.body.store_no, 10),
          req : req,
          res : res
        }
        
        if (params.no == 0) {
          product_add(params)
        }
        else {
          product_update(params)
          // console.log(params)
        }
      })
    })
  } else {
    let params = {
      img_path : req.body.imageUrl,
      imageName : req.body.imageName,
      no : parseInt(req.body.no, 10),
      name : req.body.name ,
      price : req.body.price,
      desc : req.body.desc,
      o_name : req.body.o_name,
      o_price : req.body.o_price,
      o_cnt : req.body.o_cnt,
      original_name : req.body.original_name,
      store_no : parseInt(req.body.store_no, 10),
      req : req,
      res : res
    }
    productDB.update(params, (result) => {
      console.log(result)
      params.res.json(result)
    }, (error) => {
      params.res.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end('error')
    })
  }
});

router.get('/d_product', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  // res.send('respond with a resource');
  let no = req.query.no;

  let delete_params = {
    Bucket: 'img.storage',
    Key: req.query.original_name
  };
  //db 삭제 처리

  let deleteObj = new aws.S3();
  deleteObj.deleteObject(delete_params, (err, data) => {
    productDB.d_product(no, (result) => {
      res.json(result)
    }, (error) => {
      params.res.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end('error')
    })
  })

  
});


function product_add(params) {
  productDB.add(params, (result) => {
    console.log(result)
    params.res.json(result)
  }, (error) => {
    params.res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
  })
}

function product_update(params) {
  let delete_params = {
    Bucket: 'img.storage',
    Key: params.original_name
  };

  //db 삭제 처리

  let deleteObj = new aws.S3();
  deleteObj.deleteObject(delete_params, (err, data) => {
    productDB.update(params, (result) => {
      console.log(result)
      params.res.json(result)
    }, (error) => {
      params.res.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end('error')
    })
  })
  
}


module.exports = router;
