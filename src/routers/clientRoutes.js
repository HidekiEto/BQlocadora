const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');

router.get('/clientes', (req, res) => {
    res.render('clientes');
});

router.post('/clienteBusca/save', clientController.save);

router.get('/clienteBusca', clientController.list);

router.get('/clienteBusca/next', clientController.next);

router.get('/clienteBusca/prev', clientController.prev);

router.get('/clienteBusca/delete/:clienteCPF', clientController.delete);

router.get('/clienteBusca/update/:clienteCPF', clientController.edit);
      
router.post('/clienteBusca/update/:clienteCPF', clientController.update);



module.exports = router;