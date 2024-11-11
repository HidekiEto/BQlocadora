const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');

router.get('/client', (req, res) => {
    res.redirect('client');
});

module.exports = router;