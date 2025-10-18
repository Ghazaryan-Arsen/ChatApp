const express = require('express');
const router = express.Router();
const { getModels, getModelById, uploadModel, purchaseModel } = require('../controllers/modelController');
const auth = require('../middleware/authMiddleware');

// @route   GET api/models
// @desc    Get all models
// @access  Public
router.get('/', getModels);

// @route   GET api/models/:id
// @desc    Get model by ID
// @access  Public
router.get('/:id', getModelById);

// @route   POST api/models/upload
// @desc    Upload a new model
// @access  Private
router.post('/upload', auth, uploadModel);

// @route   POST api/models/:id/purchase
// @desc    Purchase a model
// @access  Private
router.post('/:id/purchase', auth, purchaseModel);

module.exports = router;