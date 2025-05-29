const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, 'Please add some text'],
    maxlength: 1000
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  images: [{
    type: String
  }],
  verified: {
    type: Boolean,
    default: false
  },
  helpful: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isHelpful: Boolean
  }],
  helpfulCount: {
    type: Number,
    default: 0
  },
  reported: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  isApproved: {
    type: Boolean,
    default: true
  },
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderatedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent user from submitting more than one review per product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Additional indexes for performance
ReviewSchema.index({ product: 1, isApproved: 1 });
ReviewSchema.index({ user: 1 });
ReviewSchema.index({ rating: 1 });

// Update the updatedAt field before saving
ReviewSchema.pre('save', function(next) {
  this.updatedAt = new Date();

  // Set verified to true if order is provided
  if (this.order && !this.verified) {
    this.verified = true;
  }

  next();
});

// Method to mark review as helpful/unhelpful
ReviewSchema.methods.markHelpful = function(userId, isHelpful) {
  // Remove existing vote from this user
  this.helpful = this.helpful.filter(h => !h.user.equals(userId));

  // Add new vote
  this.helpful.push({ user: userId, isHelpful });

  // Update helpful count
  this.helpfulCount = this.helpful.filter(h => h.isHelpful).length;

  return this.save();
};

// Method to report review
ReviewSchema.methods.reportReview = function(userId, reason) {
  // Check if user already reported this review
  const existingReport = this.reported.find(r => r.user.equals(userId));

  if (!existingReport) {
    this.reported.push({ user: userId, reason });
    return this.save();
  }

  return Promise.resolve(this);
};

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function(productId) {
  const obj = await this.aggregate([
    {
      $match: { product: productId }
    },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    await this.model('Product').findByIdAndUpdate(productId, {
      rating: obj[0] ? obj[0].averageRating : 0,
      numReviews: obj[0] ? obj[0].numReviews : 0
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
ReviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.product);
});

// Call getAverageRating after remove
ReviewSchema.post('remove', function() {
  this.constructor.getAverageRating(this.product);
});

module.exports = mongoose.model('Review', ReviewSchema);
