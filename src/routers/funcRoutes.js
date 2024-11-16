const express = require('express');
const router = express.Router();

const funcController = require('../controllers/funcController');



router.get('/funcionarios', (req, res) => {
    res.render('funcionarios');
});



router.get('/funcBusca', funcController.list);

router.post('/save', funcController.save);

router.get('/funcBusca/next', funcController.next);

router.get('/funcBusca/prev', funcController.prev);

router.get('/funcBusca/delete/:funcMatricula', funcController.delete);

router.get('/funcBusca/update/:funcMatricula', funcController.edit);
      
router.post('/funcBusca/update/:funcMatricula', funcController.update);



router.get('/funcBusca/search', funcController.search);


module.exports = router;