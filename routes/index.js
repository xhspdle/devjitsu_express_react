const express = require('express');
const router = express.Router();

router.get('/companyInfo', function(req, res, next){
    res.send({ name: 'dev-jitsu', location: 'fast-five'});
});

router.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});

module.exports = router;