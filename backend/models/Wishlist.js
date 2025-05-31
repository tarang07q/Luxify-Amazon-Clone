const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    notes: {
      type: String,
      maxlength: 200
    }
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: 'My Wishlist',
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: 200
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries (user field already has unique: true, so no need for additional index)
WishlistSchema.index({ 'items.product': 1 });

// Update the updatedAt field before saving
WishlistSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Method to add item to wishlist
WishlistSchema.methods.addItem = function(productId, priority = 'medium', notes = '') {
  // Check if item already exists
  const existingItem = this.items.find(item => item.product.equals(productId));
  
  if (existingItem) {
    // Update existing item
    existingItem.priority = priority;
    existingItem.notes = notes;
    existingItem.addedAt = new Date();
  } else {
    // Add new item
    this.items.push({
      product: productId,
      priority,
      notes,
      addedAt: new Date()
    });
  }
  
  return this.save();
};

// Method to remove item from wishlist
WishlistSchema.methods.removeItem = function(productId) {
  this.items = this.items.filter(item => !item.product.equals(productId));
  return this.save();
};

// Method to clear all items
WishlistSchema.methods.clearAll = function() {
  this.items = [];
  return this.save();
};

// Method to move item to cart (would need cart integration)
WishlistSchema.methods.moveToCart = function(productId, quantity = 1) {
  // This would integrate with cart functionality
  // For now, just remove from wishlist
  return this.removeItem(productId);
};

// Static method to get or create wishlist for user
WishlistSchema.statics.getOrCreateForUser = async function(userId) {
  let wishlist = await this.findOne({ user: userId }).populate('items.product');
  
  if (!wishlist) {
    wishlist = await this.create({ user: userId });
    wishlist = await this.findById(wishlist._id).populate('items.product');
  }
  
  return wishlist;
};

// Static method to check if product is in user's wishlist
WishlistSchema.statics.isProductInWishlist = async function(userId, productId) {
  const wishlist = await this.findOne({ 
    user: userId,
    'items.product': productId 
  });
  
  return !!wishlist;
};

module.exports = mongoose.model('Wishlist', WishlistSchema);
