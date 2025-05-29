const express = require('express');
const {
  register,
  registerAdmin,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  deleteAccount,
  verifyAdmin
} = require('../controllers/authController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/register-admin', registerAdmin);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.delete('/delete-account', protect, deleteAccount);
router.get('/verify-admin', protect, verifyAdmin);

module.exports = router;
