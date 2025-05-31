const Order = require('../models/Order');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    console.log('🚀 CreateOrder - Full request body:', JSON.stringify(req.body, null, 2));
    console.log('👤 CreateOrder - User info:', req.user ? { id: req.user.id, email: req.user.email } : 'No user found');

    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return next(new ErrorResponse('User not authenticated', 401));
    }

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    console.log('📦 CreateOrder - Extracted shipping address:', shippingAddress);

    if (orderItems && orderItems.length === 0) {
      return next(new ErrorResponse('No order items', 400));
    }

    // Validate shipping address fields
    if (!shippingAddress) {
      return next(new ErrorResponse('Shipping address is required', 400));
    }

    const requiredFields = ['name', 'street', 'city', 'state', 'zipCode', 'country'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field]);

    if (missingFields.length > 0) {
      console.error('❌ Missing shipping address fields:', missingFields);
      console.error('📋 Received shipping address:', shippingAddress);
      return next(new ErrorResponse(`Missing required shipping address fields: ${missingFields.join(', ')}`, 400));
    }

    // Create order
    const order = await Order.create({
      orderItems,
      user: req.user.id,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    console.log('✅ Order created successfully:', order._id);

    // Update product stock with error handling
    try {
      for (const item of orderItems) {
        console.log(`📦 Updating stock for product: ${item.product}, quantity: ${item.quantity}`);
        const product = await Product.findById(item.product);
        if (product) {
          const newStock = Math.max(0, product.stock - item.quantity);
          await Product.findByIdAndUpdate(
            item.product,
            { stock: newStock },
            { runValidators: false }
          );
          console.log(`✅ Updated product ${item.product} stock from ${product.stock} to ${newStock}`);
        } else {
          console.warn(`⚠️ Product not found: ${item.product}`);
        }
      }
      console.log('✅ Product stock updated for order:', order._id);
    } catch (stockError) {
      console.error('❌ Error updating product stock:', stockError);
      // Don't fail the order creation if stock update fails
    }

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is order owner or admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to access this order`, 401));
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
exports.updateOrderStatus = async (req, res, next) => {
  try {
    console.log('🔄 updateOrderStatus called with:', {
      orderId: req.params.id,
      body: req.body,
      user: req.user ? { id: req.user.id, role: req.user.role } : 'No user'
    });

    const { status, paymentReceived } = req.body;

    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('orderItems.product', 'name price images');

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }

    // Validate status transition
    const validStatuses = ['Pending', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'];
    if (!validStatuses.includes(status)) {
      return next(new ErrorResponse(`Invalid status: ${status}`, 400));
    }

    // Update order status
    const previousStatus = order.status;
    order.status = status;

    // Handle specific status updates
    if (status === 'Delivered') {
      order.deliveredAt = Date.now();
      // For Cash on Delivery, mark as paid when delivered
      if (order.paymentMethod === 'Cash on Delivery' && !order.isPaid) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: `cod-${Date.now()}`,
          status: 'completed',
          update_time: new Date().toISOString(),
          email_address: order.user.email,
          payment_method: 'Cash on Delivery'
        };
      }
    }

    // Handle manual payment received by admin
    if (paymentReceived && !order.isPaid) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: `admin-${Date.now()}`,
        status: 'completed',
        update_time: new Date().toISOString(),
        email_address: order.user.email,
        payment_method: order.paymentMethod,
        processed_by: 'admin'
      };
    }

    // Generate tracking number for shipped orders
    if (status === 'Shipped' && !order.trackingNumber) {
      order.trackingNumber = `LUX${Date.now().toString().slice(-8)}`;
    }

    // Set estimated delivery date for shipped orders (3-5 business days)
    if (status === 'Shipped' && !order.estimatedDelivery) {
      const estimatedDate = new Date();
      estimatedDate.setDate(estimatedDate.getDate() + 4); // 4 days from now
      order.estimatedDelivery = estimatedDate;
    }

    // Use findByIdAndUpdate to avoid validation issues
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: order.status,
        isPaid: order.isPaid,
        paidAt: order.paidAt,
        paymentResult: order.paymentResult,
        deliveredAt: order.deliveredAt,
        trackingNumber: order.trackingNumber,
        estimatedDelivery: order.estimatedDelivery,
        $push: {
          statusHistory: {
            status: status,
            timestamp: new Date(),
            previousStatus: previousStatus,
            updatedBy: req.user.id
          }
        }
      },
      {
        new: true,
        runValidators: false
      }
    ).populate('user', 'name email').populate('orderItems.product', 'name price images');

    console.log(`✅ Order ${order._id} status updated from ${previousStatus} to: ${status}`);

    res.status(200).json({
      success: true,
      data: updatedOrder,
      message: `Order status updated to ${status}`,
      statusChange: {
        from: previousStatus,
        to: status,
        timestamp: new Date()
      }
    });
  } catch (err) {
    console.error('❌ Error updating order status:', err);
    next(err);
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is order owner or admin
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to update this order`, 401));
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.paymentResult.id,
      status: req.body.paymentResult.status,
      update_time: req.body.paymentResult.update_time,
      email_address: req.body.paymentResult.email_address
    };

    const updatedOrder = await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: updatedOrder
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};
