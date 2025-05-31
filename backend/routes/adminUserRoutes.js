const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/adminUserController');
const { protect, authorize } = require('../middleware/auth');

router.route('/users').post(protect, authorize('admin'), createUser);

module.exports = router; 