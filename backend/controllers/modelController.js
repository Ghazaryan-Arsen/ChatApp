const Model = require('../models/Model');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Get all models
// @route   GET /api/models
// @access  Public
exports.getModels = async (req, res) => {
    try {
        const models = await Model.find().populate('uploader', 'username');
        res.json(models);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Purchase a model
// @route   POST /api/models/:id/purchase
// @access  Private
exports.purchaseModel = async (req, res) => {
    try {
        const model = await Model.findById(req.params.id);
        if (!model) {
            return res.status(404).json({ msg: 'Model not found' });
        }

        const buyer = await User.findById(req.user.id);
        const seller = await User.findById(model.uploader);

        if (buyer.id === seller.id) {
            return res.status(400).json({ msg: 'You cannot purchase your own model' });
        }

        // For now, we'll simulate a successful payment
        const amount = model.price;
        const platformFee = amount * 0.20;
        const sellerRevenue = amount - platformFee;

        // Create a new transaction
        const transaction = new Transaction({
            model: model.id,
            buyer: buyer.id,
            seller: seller.id,
            amount,
            platformFee,
            sellerRevenue,
        });

        await transaction.save();

        // Update seller's balance
        seller.balance += sellerRevenue;
        await seller.save();

        res.json({ msg: 'Purchase successful', transaction });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get model by ID
// @route   GET /api/models/:id
// @access  Public
exports.getModelById = async (req, res) => {
    try {
        const model = await Model.findById(req.params.id).populate('uploader', 'username');
        if (!model) {
            return res.status(404).json({ msg: 'Model not found' });
        }
        res.json(model);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Model not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Upload a new model
// @route   POST /api/models/upload
// @access  Private
exports.uploadModel = async (req, res) => {
    const { name, description, category, tags, price } = req.body;

    // For now, we'll use placeholder URLs for the file and image.
    // In a real application, you would get these from your file storage service (e.g., S3).
    const fileUrl = 'https://via.placeholder.com/500';
    const imageUrl = 'https://via.placeholder.com/300x200';

    try {
        const newModel = new Model({
            name,
            description,
            category,
            tags: tags.split(',').map(tag => tag.trim()),
            price,
            fileUrl,
            imageUrl,
            uploader: req.user.id,
        });

        const model = await newModel.save();
        res.json(model);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};