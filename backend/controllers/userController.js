const mongoose = require('mongoose');
const User = require('../models/User');
const Model = require('../models/Model');
const Transaction = require('../models/Transaction');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const models = await Model.find({ uploader: req.params.id });

        res.json({ user, models });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Get user sales
// @route   GET /api/users/:id/sales
// @access  Private
exports.getUserSales = async (req, res) => {
    try {
        const sales = await Transaction.aggregate([
            { $match: { seller: new mongoose.Types.ObjectId(req.params.id) } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        res.json({ totalSales: sales.length > 0 ? sales[0].total : 0 });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Withdraw funds
// @route   POST /api/users/:id/withdraw
// @access  Private
exports.withdraw = async (req, res) => {
    try {
        // In a real application, this would trigger a payout process (e.g., via Stripe).
        // For now, we'll just reset the user's balance to 0.
        const user = await User.findById(req.user.id);
        user.balance = 0;
        await user.save();

        res.json({ msg: 'Withdrawal successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};