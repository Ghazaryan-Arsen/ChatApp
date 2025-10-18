const express = require('express');
const router = express.Router();
const { getUserProfile, withdraw, getUserSales } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// @route   GET api/users/:id
// @desc    Get user profile
// @access  Public
router.get('/:id', getUserProfile);

// @route   GET api/users/:id/sales
// @desc    Get user sales
// @access  Private
router.get('/:id/sales', auth, getUserSales);

// @route   POST api/users/:id/withdraw
// @desc    Withdraw funds
// @access  Private
router.post('/:id/withdraw', auth, withdraw);


module.exports = router;