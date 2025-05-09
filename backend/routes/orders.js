const express = require('express');
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
  updateOrderToPaid,
  getMyOrders,
  getOrders
} = require('../controllers/orderController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .post(protect, createOrder)
  .get(protect, authorize('admin'), getOrders);

router.route('/my-orders').get(protect, getMyOrders);

router
  .route('/:id')
  .get(protect, getOrderById)
  .put(protect, authorize('admin'), updateOrderStatus);

router.route('/:id/pay').put(protect, updateOrderToPaid);

module.exports = router;
