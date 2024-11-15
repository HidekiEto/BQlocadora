const express = require('express');
const router = express.Router();

const funcController = require('../controllers/funcController');

router.get('/funcionarios', funcController.list);

router.get('/funcBusca', (req, res) => {
    res.render('funcBusca');
});

router.post('/funcionarios/save', funcController.save);

router.get('/funcionarios/next', funcController.next);

router.get('/funcionarios/prev', funcController.prev);

router.get('/funcionarios/delete/:funcMatricula', funcController.delete);

router.get('/funcionarios/update/:funcMatricula', funcController.edit);
      
router.post('/funcionarios/update/:funcMatricula', funcController.update);

module.exports = router;