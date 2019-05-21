const express = require('express');
const router = express.Router();
const dbConn = require('./config/dbconnection');

router.post('/insert', (req, res) => {
    let sql =   `INSERT INTO contact(
                  name
                , email
                , message
                , create_date
                ) VALUES
                (
                  "${req.body.name}"
                , "${req.body.email}"
                , "${req.body.message}"
                , NOW()
                )`;
        dbConn.query(sql, (err, result) => {
        if(err){
            console.error(err);
            res.status(500).render({error: err});
        }else{
            console.log('contact send process success!!');
            res.status(200).send(result);
        }
    });
});

module.exports = router;