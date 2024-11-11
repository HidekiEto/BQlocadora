const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');

router.get('/clientes', (req, res) => {
    res.render('clientes');
});

router.post('/save', clientController.save);

router.get('/clienteBusca', (req, res) => {
    res.render('clienteBusca');
});

module.exports = router;