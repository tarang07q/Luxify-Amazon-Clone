const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.getOrCreateForUser(req.user.id);
    
    res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    next(new ErrorResponse('Failed to fetch wishlist', 500));
  }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist/add
// @access  Private
exports.addToWishlist = async (req, res, next) => {
  try {
    const { productId, priority = 'medium', notes = '' } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorResponse('Product not found', 404));
    }

    // Get or create wishlist
    const wishlist = await Wishlist.getOrCreateForUser(req.user.id);
    
    // Add item to wishlist
    await wishlist.addItem(productId, priority, notes);
    
    // Populate and return updated wishlist
    const updatedWishlist = await Wishlist.findById(wishlist._id).populate('items.product');

    res.status(200).json({
      success: true,
      message: 'Item added to wishlist',
      data: updatedWishlist
    });
  } catch (error) {
    next(new ErrorResponse('Failed to add item to wishlist', 500));
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/remove/:productId
// @access  Private
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      return next(new ErrorResponse('Wishlist not found', 404));
    }

    await wishlist.removeItem(productId);
    
    // Populate and return updated wishlist
    const updatedWishlist = await Wishlist.findById(wishlist._id).populate('items.product');

    res.status(200).json({
      success: true,
      message: 'Item removed from wishlist',
      data: updatedWishlist
    });
  } catch (error) {
    next(new ErrorResponse('Failed to remove item from wishlist', 500));
  }
};

// @desc    Clear entire wishlist
// @route   DELETE /api/wishlist/clear
// @access  Private
exports.clearWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      return next(new ErrorResponse('Wishlist not found', 404));
    }

    await wishlist.clearAll();

    res.status(200).json({
      success: true,
      message: 'Wishlist cleared',
      data: wishlist
    });
  } catch (error) {
    next(new ErrorResponse('Failed to clear wishlist', 500));
  }
};

// @desc    Update wishlist settings
// @route   PUT /api/wishlist/settings
// @access  Private
exports.updateWishlistSettings = async (req, res, next) => {
  try {
    const { name, description, isPublic } = req.body;

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      return next(new ErrorResponse('Wishlist not found', 404));
    }

    // Update settings
    if (name !== undefined) wishlist.name = name;
    if (description !== undefined) wishlist.description = description;
    if (isPublic !== undefined) wishlist.isPublic = isPublic;

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: 'Wishlist settings updated',
      data: wishlist
    });
  } catch (error) {
    next(new ErrorResponse('Failed to update wishlist settings', 500));
  }
};

// @desc    Check if product is in wishlist
// @route   GET /api/wishlist/check/:productId
// @access  Private
exports.checkProductInWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;
    
    const isInWishlist = await Wishlist.isProductInWishlist(req.user.id, productId);

    res.status(200).json({
      success: true,
      data: {
        isInWishlist
      }
    });
  } catch (error) {
    next(new ErrorResponse('Failed to check wishlist status', 500));
  }
};

// @desc    Move item from wishlist to cart
// @route   POST /api/wishlist/move-to-cart/:productId
// @access  Private
exports.moveToCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity = 1 } = req.body;

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      return next(new ErrorResponse('Wishlist not found', 404));
    }

    // Check if product is in wishlist
    const wishlistItem = wishlist.items.find(item => item.product.equals(productId));
    
    if (!wishlistItem) {
      return next(new ErrorResponse('Product not found in wishlist', 404));
    }

    // Remove from wishlist
    await wishlist.removeItem(productId);

    // Here you would add logic to add to cart
    // For now, we'll just return success
    res.status(200).json({
      success: true,
      message: 'Item moved to cart',
      data: {
        productId,
        quantity
      }
    });
  } catch (error) {
    next(new ErrorResponse('Failed to move item to cart', 500));
  }
};

// @desc    Get public wishlist by user ID
// @route   GET /api/wishlist/public/:userId
// @access  Public
exports.getPublicWishlist = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ 
      user: userId, 
      isPublic: true 
    }).populate('items.product').populate('user', 'name');

    if (!wishlist) {
      return next(new ErrorResponse('Public wishlist not found', 404));
    }

    res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    next(new ErrorResponse('Failed to fetch public wishlist', 500));
  }
};
