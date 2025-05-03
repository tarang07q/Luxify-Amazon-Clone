const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings,
  changePassword,
  getSystemSettings,
  updateSystemSettings
} = require('../controllers/settingsController');
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

router.route('/')
  .get(adminCheck, getSettings)
  .put(adminCheck, updateSettings);

router.route('/password').put(adminCheck, changePassword);

router.route('/system')
  .get(adminCheck, getSystemSettings)
  .put(adminCheck, updateSystemSettings);

module.exports = router;
