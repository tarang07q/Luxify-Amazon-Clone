const express = require('express');
const router = express.Router();
const {
  getDashboardAnalytics,
  getSalesAnalytics,
  getProductAnalytics,
  getUserAnalytics
} = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/auth');

// All routes are protected and require admin access
router.use(protect);
router.use(admin);

router.route('/dashboard').get(getDashboardAnalytics);
router.route('/sales').get(getSalesAnalytics);
router.route('/products').get(getProductAnalytics);
router.route('/users').get(getUserAnalytics);

module.exports = router;
