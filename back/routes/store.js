var express = require('express');
var router = express.Router();
const datasource = require('../config/datasource')
const storeDB = require('../db/storeDB')
const connection = datasource.getConnection()
storeDB.setConnection(connection)

/* GET home page. */
router.post('/a_login', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")


  let params = {
    id : req.query.id,
    pwd : req.query.pwd
  }

  storeDB.a_login(params, (result) => {
    console.log(result)
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })

  
});

router.get('/auth', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  res.json('1')
});

router.get('/store_info', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    no: parseInt(req.query.no),
    id: req.query.id
  }
  
  storeDB.store_info(params, (result) => {
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});


router.post('/store_update', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    no: parseInt(req.query.no),
    id: req.query.id,
    bank_name: req.query.bank_name,
    bank_no: req.query.bank_no
  }
  storeDB.store_update(params, (result) => {
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});

router.post('/a_pwd_update', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    no: parseInt(req.query.no),
    id: req.query.id,
    pwd: req.query.pwd,
  }
  storeDB.a_pwd_update(params, (result) => {
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
})

router.get('/app_store_list', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    res.setHeader("Access-Control-Max-Age", "3600")
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
    res.setHeader("Access-Control-Allow-Origin", "*")
    let params = {
        u_no: req.query.u_no
    }
    storeDB.app_store_list(params, (result) => {
      res.json(result)
    }, (error) => {
      res.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end(error)
    })
})

router.get('/store_acpt_nlist', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    res.setHeader("Access-Control-Max-Age", "3600")
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
    res.setHeader("Access-Control-Allow-Origin", "*")


    let params = {
        s_no: parseInt(req.query.s_no)
    }
    storeDB.store_acpt_nlist(params, (result) => {
      res.json(result)
    }, (error) => {
      res.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end(error)
    })
})

router.get('/store_acpt_cnt', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    res.setHeader("Access-Control-Max-Age", "3600")
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
    res.setHeader("Access-Control-Allow-Origin", "*")


    let params = {
        s_no: parseInt(req.query.s_no)
    }
    storeDB.store_acpt_cnt(params, (result) => {
      res.json(result)
    }, (error) => {
      res.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end(error)
    })
})

router.get('/store_acpt_y', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    res.setHeader("Access-Control-Max-Age", "3600")
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
    res.setHeader("Access-Control-Allow-Origin", "*")


    let params = {
        s_no: parseInt(req.query.s_no),
        us_no: parseInt(req.query.us_no)
    }
    storeDB.store_acpt_y(params, (result) => {
      res.json(result)
    }, (error) => {
      res.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end(error)
    })
})

router.get('/store_acpt_delete', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    res.setHeader("Access-Control-Max-Age", "3600")
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
    res.setHeader("Access-Control-Allow-Origin", "*")


    let params = {
        s_no: parseInt(req.query.s_no),
        us_no: parseInt(req.query.us_no)
    }
    storeDB.store_acpt_delete(params, (result) => {
      res.json(result)
    }, (error) => {
      res.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end(error)
    })
})




module.exports = router;
