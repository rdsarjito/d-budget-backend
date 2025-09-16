const express = require('express');
const router = express.Router();

const accesToken = require('../middlewares/accesToken');
const { createIncome, getIncome, deleteIncome } = require('../controllers/income');

router.post('/', accesToken, createIncome);
router.get('/', accesToken, getIncome);
router.delete('/:id', accesToken, deleteIncome);

module.exports = router;