const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host    : '183.97.28.253',
    port    : 43306,//port는 int
    user    : 'neos',
    password: 'neos',
    database: 'ldk_test'
})

router.get('/companyInfo', function(req, res, next){
    res.send({ name: 'dev-jitsu', location: 'fast-five'});
});

router.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});

router.get('/slideshow', (req, res) => {
    let sql = 'SELECT * FROM slide_show';
    connection.query(sql, (err, result) => {
        if(err){
            console.error(err);
            res.status(500).render('error', {error: err});
        }else{
            console.log('slide show query success!!');
            res.status(200).send(result);
        }
    })
});

module.exports = router;