const express = require('express');
const router = express.Router();

const odsController = require('../controllers/odsController');


router.get('/ods', odsController.getOdsData);


router.post('/ods/save', odsController.save);

router.get('/odsBusca', odsController.list);

router.get('/odsBusca/next', odsController.next);

router.get('/odsBusca/prev', odsController.prev);

router.get('/odsBusca/delete/:OsNum', odsController.delete);

router.get('/odsBusca/update/:OsNum', odsController.edit);
      
router.post('/odsBusca/update/:OsNum', odsController.update);

module.exports = router;