const express = require('express');
const {
  register,
  registerAdmin,
  login,
  logout,
  getMe
} = require('../controllers/authController_final');

const router = express.Router();

const { protect } = require('../middleware/auth_final');

router.post('/register', register);
router.post('/register-admin', registerAdmin);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

module.exports = router;
