const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Simple test route
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Product routes working!' });
});

// Get all products
router.get('/', (req, res, next) => {
  console.log('🚀 Products route hit!');
  getProducts(req, res, next);
});

// Create product (admin only)
router.post('/', protect, authorize('admin'), createProduct);

// Get single product
router.get('/:id', getProduct);

// Update product (admin only)
router.put('/:id', protect, authorize('admin'), updateProduct);

// Delete product (admin only)
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;
