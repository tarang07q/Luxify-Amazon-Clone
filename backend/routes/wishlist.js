const express = require('express');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  updateWishlistSettings,
  checkProductInWishlist,
  moveToCart,
  getPublicWishlist
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/public/:userId', getPublicWishlist);

// Protected routes
router.use(protect);
router.get('/', getWishlist);
router.post('/add', addToWishlist);
router.delete('/remove/:productId', removeFromWishlist);
router.delete('/clear', clearWishlist);
router.put('/settings', updateWishlistSettings);
router.get('/check/:productId', checkProductInWishlist);
router.post('/move-to-cart/:productId', moveToCart);

module.exports = router;
