const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// @route   GET api/auth/me
// @desc    Get user by token
// @access  Private
const auth = require('../middleware/authMiddleware');
router.get('/me', auth, require('../controllers/authController').getMe);

module.exports = router;