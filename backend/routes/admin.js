const express = require('express');
const router = express.Router();
const { getStats, getUsers } = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// @route   GET api/admin/stats
// @desc    Get admin statistics
// @access  Private/Admin
router.get('/stats', auth, admin, getStats);

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', auth, admin, getUsers);

module.exports = router;