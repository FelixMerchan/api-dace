const { Router } = require('express');
const router = Router();

const { login, renewToken } = require('../controllers/auth.controller');

const authMiddleware = require('../authMiddleware');

router.post('/auth/login', login);
router.get('/auth/renew', authMiddleware, renewToken);

module.exports = router;