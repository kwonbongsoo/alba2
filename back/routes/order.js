var express = require('express');
var router = express.Router();
const datasource = require('../config/datasource')
const orderDB = require('../db/orderDB')
const connection = datasource.getConnection()
orderDB.setConnection(connection)
const nodemailer = require('nodemailer');
const mailData = require('../config/email.json')

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
      item_option: req.body.item_option,
      item_no: req.body.item_no,
      item_option_no: req.body.item_option_no
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

router.get('/s_l_order', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    s_no: parseInt(req.query.s_no, 10),
    s_dt: req.query.s_dt,
    e_dt: req.query.e_dt,
    page: parseInt(req.query.page, 10),
    status: parseInt(req.query.status, 10),
    search: req.query.search
  }

  console.log(params)

  orderDB.s_l_order(params, (result) => {
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
    res.json(error);
  })
});


router.get('/s_o_statistics', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    s_no: parseInt(req.query.s_no, 10),
    s_dt: req.query.s_dt,
    e_dt: req.query.e_dt,
    page: parseInt(req.query.page, 10),
  }

  console.log(params)

  orderDB.s_o_statistics(params, (result) => {
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
    res.json(error);
  })
});

router.get('/pay_confirm', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    order_no: parseInt(req.query.order_no, 10)
  }
  console.log(params);

  orderDB.pay_confirm(params, (result) => {
    console.log(result[0][0])
    if(result[0][0].result == 'SUCCESS') {
 
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: mailData
      });
      let html
      if (result[0][0].result == 'SUCCESS')
        html = '<p>입금이 확인 되었습니다. 배송 준비중입니다.!</p>'

      let mailOptions = {
        from: mailData.user,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: result[0][0].id,                     // 수신 메일 주소
        subject: '안녕하세요, 자연과 사람입니다.',   // 제목
        // text: 'That was easy!'  // 내용
        html: html
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.json('FAIL')
        }
        else {
            console.log('Email sent: ' + info.response);
            res.json(result[0][0].result)
        }
      });
    }
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
    res.json(error);
  })
})


router.get('/delivery_start', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    order_no: parseInt(req.query.order_no, 10),
    delivery_name: req.query.delivery_name,
    delivery_no: req.query.delivery_no
  }
  console.log(params);

  orderDB.delivery_start(params, (result) => {
    console.log(result[0][0])
    if(result[0][0].result == 'SUCCESS' || result[0][0].result == 'MODIFY') {
 
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: mailData
      });

      let html
      if (result[0][0].result == 'SUCCESS')
        html = '<p>배송이 시작 되었습니다. 송장번호를 보내드립니다.!</p>' + "<p>"+result[0][0].delivery_info+'</p>'
      else
        html = '<p>송장번호가 변경되었습니다. 송장번호를 보내드립니다!</p>' + "<p>"+result[0][0].delivery_info+'</p>'

      let mailOptions = {
        from: mailData.user,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: result[0][0].id,                     // 수신 메일 주소
        subject: '안녕하세요, 자연과 사람입니다.',   // 제목
        // text: 'That was easy!'  // 내용
        html: html
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.json('FAIL')
        }
        else {
            console.log('Email sent: ' + info.response);
            res.json(result[0][0].result)
        }
      });
    }
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
    res.json(error);
  })
})


  router.get('/order_end', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    res.setHeader("Access-Control-Max-Age", "3600")
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
    res.setHeader("Access-Control-Allow-Origin", "*")
  
    let params = {
      order_no: parseInt(req.query.order_no, 10),
    }
    console.log(params);
  
    orderDB.order_end(params, (result) => {
      res.json(result.statusText)
    }, (error) => {
      res.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end(error)
      res.json(error);
    })
});

router.get('/u_o_cancel_req', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    u_no: parseInt(req.query.u_no, 10),
    o_no: parseInt(req.query.o_no, 10)
  }

  console.log(params);

  orderDB.u_o_cancel_req(params, (result) => {
    console.log(result)
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});

router.get('/u_o_cancel_cancel', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    u_no: parseInt(req.query.u_no, 10),
    o_no: parseInt(req.query.o_no, 10)
  }

  console.log(params);

  orderDB.u_o_cancel_cancel(params, (result) => {
    console.log(result)
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
})

router.get('/s_order_cancel', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    s_no: parseInt(req.query.s_no, 10),
    o_no: parseInt(req.query.o_no, 10),
    reason: req.query.reason
  }
  console.log(params);

  orderDB.s_order_cancel(params, (result) => {
    console.log(result)
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});

router.get('/s_l_cancel_req', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    s_no: parseInt(req.query.s_no, 10)
  }
  console.log(params);

  orderDB.s_l_cancel_req(params, (result) => {
    console.log(result)
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});


router.get('/o_cancel_n', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    s_no: parseInt(req.query.s_no, 10),
    o_no: parseInt(req.query.o_no)
  }
  console.log(params);

  orderDB.o_cancel_n(params, (result) => {
    console.log(result)
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});

router.get('/o_cancel_y', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    s_no: parseInt(req.query.s_no, 10),
    o_no: parseInt(req.query.o_no)
  }
  console.log(params);

  orderDB.o_cancel_y(params, (result) => {
    console.log(result)
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});




module.exports = router;
