const express = require('express');
const router = express.Router();

const veicController = require('../controllers/veicController');



router.get('/veiculos', (req, res) => {
    res.render('veiculos');
});

router.get('/veicBusca', veicController.list);

router.post('/veiculos/save', veicController.save);

router.get('/veicBusca/next', veicController.next);

router.get('/veicBusca/prev', veicController.prev);

router.get('/veicBusca/delete/:veicPlaca', veicController.delete);

router.get('/veicBusca/update/:veicPlaca', veicController.edit);
      
router.post('/veicBusca/update/:veicPlaca', veicController.update);

module.exports = router;