const express = require('express');
const path = require('path');
const router = express.Router();
const mysql = require('mysql');

const dbconfig = require('./config/db-config.json');
const connection = mysql.createConnection(dbconfig);

router.get('/companyInfo', function(req, res, next){
    res.send({ name: 'dev-jitsu', location: 'fast-five'});
});

router.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});

router.get('/slideshow_MySQL', (req, res) => {
    let sql = 'SELECT * FROM slide_show';
    connection.query(sql, (err, result) => {
        if(err){
            console.error(err);
            res.status(500).render({error: err});
        }else{
            console.log('slide show query success!!');
            res.status(200).send(result);
        }
    });
});

/*
    간단하게 static.json파일 자체를 db로 관리하는 방법도 있다
    C : json파일에 직접 write
    R : json파일 읽기
    U : json파일에 직접 update
    D : json파일에 직접 delete
    !!주의 이렇게 하면 서버 패치할때 json파일도 함께 백업하고 관리해줘야한다
*/
router.get('/slideshow', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'static.json'));
});

module.exports = router;