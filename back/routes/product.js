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
          sold_yn : req.body.sold_yn,
          option : req.body.option,
          original_name : req.body.original_name,
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
      no : parseInt(req.body.no),
      name : req.body.name ,
      price : req.body.price,
      desc : req.body.desc,
      sold_yn : req.body.sold_yn,
      option : req.body.option,
      original_name : req.body.original_name,
      req : req,
      res : res
    }
    productDB.update(params.no, params.name, params.price, params.desc, params.sold_yn, params.option, params.imageName, params.img_path, (result) => {
      console.log(result)
      params.res.json(result)
    }, (error) => {
      params.res.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end('error')
    })
  }
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
  productDB.add(params.name, params.price, params.desc, params.sold_yn, params.option, params.imageName, params.img_path, (result) => {
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
    productDB.update(params.no, params.name, params.price, params.desc, params.sold_yn, params.option, params.imageName, params.img_path, (result) => {
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
