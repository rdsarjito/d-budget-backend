const express = require('express');
const router = express.Router();

const accesToken = require('../middlewares/accesToken');
const { createExpense, getExpense, deleteExpense } = require('../controllers/expense');

router.post('/', accesToken, createExpense);
router.get('/', accesToken, getExpense);
router.delete('/:id', accesToken, deleteExpense);

module.exports = router;