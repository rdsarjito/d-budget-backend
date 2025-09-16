const express = require('express');
const router = express.Router();

const accesToken = require('../middlewares/accesToken');
const { createCategory, getCategory, deleteCategory } = require('../controllers/category');

router.post('/', accesToken, createCategory);
router.get('/', accesToken, getCategory);
router.delete('/:id', accesToken, deleteCategory);

module.exports = router;