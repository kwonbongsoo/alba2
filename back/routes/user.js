var express = require('express');
var router = express.Router();
const datasource = require('../config/datasource')
const userDB = require('../db/userDB')
const connection = datasource.getConnection()
userDB.setConnection(connection)
const nodemailer = require('nodemailer');
const mailData = require('../config/email.json')

var randomNum = {};
//0~9까지의 난수
randomNum.random = function(n1, n2) {
    return parseInt(Math.random() * (n2 -n1 +1)) + n1;
};
//인증번호를 뽑을 난수 입력 n 5이면 5자리
randomNum.authNo= function(n) {
    let value = "";
    for(let i=0; i<n; i++){
        value += randomNum.random(0,9);
    }
    return value;
};


/* GET home page. */

router.post('/email_auth_confirm', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  let confirm_no = randomNum.authNo(5);

  let params = {
    email: req.body.email,
    confirm_no: confirm_no
  }
  console.log(params)

  userDB.email_auth_confirm(params, (result) => {
    if (result[0].result === 'SEND') {
      let email = params.email;
 
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: mailData
      });
    
      let mailOptions = {
        from: mailData.user,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email ,                     // 수신 메일 주소
        subject: '안녕하세요, 자연과 사람입니다. 이메일 인증을 해주세요.',   // 제목
        // text: 'That was easy!'  // 내용
        html: '<p>아래의 번호를 입력해주세요!</p>' +
              "<p>"+params.confirm_no+"</p>" 
      };
    
    
      transporter.sendMail(mailOptions, function(error, info){
        result[0].confirm_no = params.confirm_no
        if (error) {
            console.log(error);
            res.json('not send')
        }
        else {
            console.log('Email sent: ' + info.response);
            res.json(result[0])
        }
      });
    }
    
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })

});


router.post('/find_pwd', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")


  let email = req.body.email;
  let confirm_no = randomNum.authNo(5);
 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: mailData
    });
  
    let mailOptions = {
      from: mailData.user,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
      to: email ,                     // 수신 메일 주소
      subject: '안녕하세요, 자연과 사람입니다. 비밀번호를 찾으시려면 인증번호를 입력해주세요.',   // 제목
      // text: 'That was easy!'  // 내용
      html: '<p>아래의 번호를 입력해주세요!</p>' +
            "<p>"+ confirm_no +"</p>" 
    };
  
  
    transporter.sendMail(mailOptions, function(error, info){
      let result
      if (error) {
          console.log(error);
          result = {
            result : 'not send'
          }
          res.json(result)
      }
      else {
          console.log('Email sent: ' + info.response);
          result = {
            result: 'SEND',
            confirm_no: confirm_no
          }
          res.json(result)
      }
    });
});


router.post('/u_add', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  
  let params = {
    email: req.body.email,
    pwd: req.body.pwd,
    token: req.body.token,
    alias: req.body.alias,
    addr: req.body.addr,
    addr_detail: req.body.addr_detail
  }

  console.log(params)

  userDB.u_add(params, (result) => {
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});


router.post('/u_login', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  
  let params = {
    id: req.body.id,
    pwd: req.body.pwd,
    token: req.body.token
  }
  console.log(params)

  userDB.u_login(params, (result) => {
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});


router.post('/u_pwd_change', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    u_no: parseInt(req.body.u_no, 10),
    u_email: req.body.email,
    u_pwd_confirm: req.body.u_pwd_confirm,
    u_new_pwd: req.body.u_new_pwd
  }

  console.log(params);

  userDB.u_pwd_change(params, (result) => {
    console.log(result)
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })

  
});


router.post('/u_pwd_reset', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    email: req.body.email,
    reset_pwd: randomNum.authNo(6)
  }

  console.log(params);

  userDB.u_pwd_reset(params, (result) => {
    console.log(result)
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});

router.get('/u_update', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    u_no: parseInt(req.query.u_no),
    alias: req.query.alias,
    addr: req.query.addr,
    addr_detail: req.query.addr_detail
  }

  console.log(params);

  userDB.u_update(params, (result) => {
    console.log(result)
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});



module.exports = router;
