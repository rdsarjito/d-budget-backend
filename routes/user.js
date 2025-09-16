const express = require('express');
const router = express.Router();

const { createUserGoogleLogin, getUserGoogleLogin } = require('../controllers/user');

router.post('/', createUserGoogleLogin);
router.get('/', getUserGoogleLogin);

module.exports = router;