const express = require('express');
const router = express.Router();
const dbConn = require('./data/dbconnection');

router.post('/insert', async (req, res) => {
    try {
        const [rows] = await dbConn.execute(
            `INSERT INTO contact(
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
            )`
        );
        console.log('contact send process success!!');
        res.status(200).send(rows);
    } catch(e) {
        console.error(e);
        res.status(500).render({error: e});
    } 
});

module.exports = router;