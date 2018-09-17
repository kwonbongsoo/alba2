var express = require('express');
var router = express.Router();
const datasource = require('../config/datasource')
const userDB = require('../db/userDB')
const connection = datasource.getConnection()
userDB.setConnection(connection)
const nodemailer = require('nodemailer');
var mailData = require('../config/email.json')

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

  userDB.a_login(params, (result) => {
    console.log(result)
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
  })

  
});


router.post('/add', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  
  let email = req.body.email;
 
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: mailData
  });

  let mailOptions = {
    from: 'youremail@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
    to: email ,                     // 수신 메일 주소
    subject: '안녕하세요, 자연과 사랑입니다. 이메일 인증을 해주세요.',   // 제목
    // text: 'That was easy!'  // 내용
    html: '<p>아래의 링크를 클릭해주세요 !</p>' +
          "<a href='https://thehandsgift:3000/user/auth/?email="+ email +"&token=abcdefg'>인증하기</a>" 
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    }
    else {
        console.log('Email sent: ' + info.response);
    }
  });
  res.json('1')



  let params = {

  }

});

module.exports = router;
