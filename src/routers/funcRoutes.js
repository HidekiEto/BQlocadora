const express = require('express');
const router = express.Router();

const funcController = require('../controllers/funcController');

router.get('/funcionarios', funcController.list);


router.post('/funcionarios/save', funcController.save);


module.exports = router;