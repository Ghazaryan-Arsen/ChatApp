const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Model = require('../models/Model');

// @desc    Get admin statistics
// @route   GET /api/admin/stats
// @access  Private (for admins)
exports.getStats = async (req, res) => {
    try {
        const totalSales = await Transaction.aggregate([
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        const platformIncome = await Transaction.aggregate([
            { $group: { _id: null, total: { $sum: '$platformFee' } } },
        ]);

        const totalUsers = await User.countDocuments();
        const totalModels = await Model.countDocuments();

        res.json({
            totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
            platformIncome: platformIncome.length > 0 ? platformIncome[0].total : 0,
            totalUsers,
            totalModels,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (for admins)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};