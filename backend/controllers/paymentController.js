const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_fake_key_for_development');
const Order = require('../models/Order');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create payment intent
// @route   POST /api/payments/create-intent
// @access  Private
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, currency = 'usd', orderId } = req.body;

    // Validate amount
    if (!amount || amount < 50) {
      return next(new ErrorResponse('Amount must be at least $0.50', 400));
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        orderId: orderId || '',
        userId: req.user.id
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Stripe payment intent error:', error);
    next(new ErrorResponse('Payment processing failed', 500));
  }
};

// @desc    Confirm payment
// @route   POST /api/payments/confirm
// @access  Private
exports.confirmPayment = async (req, res, next) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update order payment status
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          isPaid: true,
          paidAt: new Date(),
          paymentResult: {
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: new Date().toISOString(),
            email_address: req.user.email
          }
        });
      }

      res.status(200).json({
        success: true,
        message: 'Payment confirmed successfully',
        paymentIntent: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount / 100
        }
      });
    } else {
      return next(new ErrorResponse('Payment not successful', 400));
    }
  } catch (error) {
    console.error('Payment confirmation error:', error);
    next(new ErrorResponse('Payment confirmation failed', 500));
  }
};

// @desc    Handle Stripe webhook
// @route   POST /api/payments/webhook
// @access  Public
exports.handleWebhook = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);

      // Update order status if orderId is in metadata
      if (paymentIntent.metadata.orderId) {
        try {
          await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
            isPaid: true,
            paidAt: new Date(),
            paymentResult: {
              id: paymentIntent.id,
              status: paymentIntent.status,
              update_time: new Date().toISOString()
            }
          });
        } catch (error) {
          console.error('Error updating order after payment:', error);
        }
      }
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// @desc    Get payment methods
// @route   GET /api/payments/methods
// @access  Private
exports.getPaymentMethods = async (req, res, next) => {
  try {
    // In a real app, you might store customer payment methods
    // For now, we'll return available payment options
    const paymentMethods = [
      {
        id: 'card',
        type: 'card',
        name: 'Credit/Debit Card',
        description: 'Pay with Visa, Mastercard, American Express',
        enabled: true
      },
      {
        id: 'apple_pay',
        type: 'apple_pay',
        name: 'Apple Pay',
        description: 'Pay with Touch ID or Face ID',
        enabled: true
      },
      {
        id: 'google_pay',
        type: 'google_pay',
        name: 'Google Pay',
        description: 'Pay with your Google account',
        enabled: true
      }
    ];

    res.status(200).json({
      success: true,
      data: paymentMethods
    });
  } catch (error) {
    next(new ErrorResponse('Failed to fetch payment methods', 500));
  }
};

// @desc    Process refund
// @route   POST /api/payments/refund
// @access  Private (Admin only)
exports.processRefund = async (req, res, next) => {
  try {
    const { paymentIntentId, amount, reason = 'requested_by_customer' } = req.body;

    // Create refund
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined, // Partial refund if amount specified
      reason
    });

    res.status(200).json({
      success: true,
      refund: {
        id: refund.id,
        amount: refund.amount / 100,
        status: refund.status,
        reason: refund.reason
      }
    });
  } catch (error) {
    console.error('Refund error:', error);
    next(new ErrorResponse('Refund processing failed', 500));
  }
};
