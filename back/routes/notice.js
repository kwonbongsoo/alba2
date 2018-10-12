var express = require('express');
var router = express.Router();
const datasource = require('../config/datasource')
const noticeDB = require('../db/noticeDB')
const connection = datasource.getConnection()
const push = require('../config/push')
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
    console.log(result[0][0])

    if (result[0][0].result == 'SUCCESS') {
      noticeDB.broadcast(params.s_no, (resp) => {
        let arr = []
        for (let i = 0; i < resp[0].length; i++) {
          arr.push(resp[0][i].token)
        }

         ////
  
      /** 발송할 Push 메시지 내용 */
      let push_data = {
        // 수신대상
        registration_ids: arr,
        // to: 'cxmabp7PH1w:APA91bFbvhHqCrnJQ2x7XsGLsco8yjHtDgqBTlmXzPUU97fr2lO4sgtcwPFJ68sfVJiHP6vy6z31Xwb20dBxy78ZVeVQwLho-6WSRX49LhP6Rh0UGP5YvB4ui5EafhmTfypsQ00Or3qP',
        // App이 실행중이지 않을 때 상태바 알림으로 등록할 내용
        notification: {
            title: "NATURE AND HUMAN",
            body: "공지사항이 등록 됬습니다",
            sound: "default",
            click_action: "FCM_PLUGIN_ACTIVITY",
            icon: "fcm_push_icon"
        },
        // 메시지 중요도
        priority: "high",
        // App 패키지 이름
        restricted_package_name: "human.nature.customerorderapp",
        // App에게 전달할 데이터
        data: {
            content: '공지사항이 등록 됬습니다'
        }
    };
    
    // /** 아래는 푸시메시지 발송절차 */

    
    push.fcm.send(push_data, function(err, response) {
        if (err) {
            console.error('Push메시지 발송에 실패했습니다.');
            console.error(err);
            return;
        }
    
        console.log('Push메시지가 발송되었습니다.');
        console.log(response);
    });
  // ////
  res.json(result[0])
    
        
      }, (error) => {
        res.status(200)
                .set('Content-Type', 'text/plain;charset=UTF-8')
                .end(error)
      })
    }

    


   
    
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});

router.post('/s_notice_update', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    s_no: parseInt(req.query.s_no),
    n_title: req.query.title,
    n_content: req.query.content,
    n_no: parseInt(req.query.n_no, 10)
  }

  console.log(params);

  noticeDB.s_notice_update(params, (result) => {
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
    // console.log(result)
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});

router.get('/delete_notice', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    n_no: parseInt(req.query.n_no, 10)
  }

  console.log(params);

  noticeDB.delete_notice(params, (result) => {
    console.log(result)
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});

router.get('/s_n_one', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let params = {
    n_no: parseInt(req.query.n_no, 10)
  }

  console.log(params);

  noticeDB.s_n_one(params, (result) => {
    console.log(result)
    res.json(result[0])
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end(error)
  })
});



module.exports = router;
