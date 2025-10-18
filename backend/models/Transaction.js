const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model',
        required: true,
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    platformFee: {
        type: Number,
        required: true,
    },
    sellerRevenue: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);