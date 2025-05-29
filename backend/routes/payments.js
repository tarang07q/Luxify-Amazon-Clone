const express = require('express');
const {
  createPaymentIntent,
  confirmPayment,
  handleWebhook,
  getPaymentMethods,
  processRefund
} = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Protected routes
router.use(protect);
router.post('/create-intent', createPaymentIntent);
router.post('/confirm', confirmPayment);
router.get('/methods', getPaymentMethods);

// Admin only routes
router.post('/refund', admin, processRefund);

module.exports = router;
