const express = require('express');
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
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

module.exports = router;
