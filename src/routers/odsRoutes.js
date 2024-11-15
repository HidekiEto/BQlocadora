const express = require('express');
const router = express.Router();

const funcController = require('../controllers/odsController.js');

router.get('/ods', funcController.list);

router.get('/ods', (req, res) =>{
    res.render('ods');
});

module.exports = router;