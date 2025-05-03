const express = require('express');
const router = express.Router();
const {
  getDashboardAnalytics,
  getSalesAnalytics,
  getProductAnalytics,
  getUserAnalytics
} = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Check if admin middleware exists
const adminCheck = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to access this route. Admin access required.'
    });
  }
  next();
};

router.route('/dashboard').get(adminCheck, getDashboardAnalytics);
router.route('/sales').get(adminCheck, getSalesAnalytics);
router.route('/products').get(adminCheck, getProductAnalytics);
router.route('/users').get(adminCheck, getUserAnalytics);

module.exports = router;
