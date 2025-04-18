const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  verifyAdmin
} = require('../controllers/authController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.get('/verify-admin', protect, verifyAdmin);

module.exports = router;
