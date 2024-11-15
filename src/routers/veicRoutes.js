const express = require('express');
const router = express.Router();

const funcController = require('../controllers/veicController.js');

router.get('/veiculos', funcController.list);

router.get('/veiculos', (req, res) =>{
    res.render('veiculos');
});

module.exports = router;