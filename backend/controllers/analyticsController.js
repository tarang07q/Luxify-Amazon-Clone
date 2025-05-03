const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');

// @desc    Get dashboard analytics data
// @route   GET /api/analytics/dashboard
// @access  Private/Admin
const getDashboardAnalytics = asyncHandler(async (req, res) => {
  // Get total revenue
  const orders = await Order.find({ isPaid: true });
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  
  // Get total orders
  const totalOrders = await Order.countDocuments();
  
  // Get total products
  const totalProducts = await Product.countDocuments();
  
  // Get total users
  const totalUsers = await User.countDocuments({ isAdmin: false });
  
  // Get recent orders
  const recentOrders = await Order.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email');
  
  // Get top selling products
  const topProducts = await Product.find({})
    .sort({ sold: -1 })
    .limit(5);
  
  res.json({
    totalRevenue,
    totalOrders,
    totalProducts,
    totalUsers,
    recentOrders,
    topProducts
  });
});

// @desc    Get sales analytics data
// @route   GET /api/analytics/sales
// @access  Private/Admin
const getSalesAnalytics = asyncHandler(async (req, res) => {
  // Get sales data for the last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const orders = await Order.find({
    isPaid: true,
    paidAt: { $gte: sixMonthsAgo }
  });
  
  // Group orders by month
  const salesByMonth = {};
  
  orders.forEach(order => {
    const month = new Date(order.paidAt).toLocaleString('default', { month: 'long' });
    if (!salesByMonth[month]) {
      salesByMonth[month] = 0;
    }
    salesByMonth[month] += order.totalPrice;
  });
  
  // Get sales by category
  const products = await Product.find({});
  const salesByCategory = {};
  
  orders.forEach(order => {
    order.orderItems.forEach(item => {
      const product = products.find(p => p._id.toString() === item.product.toString());
      if (product) {
        if (!salesByCategory[product.category]) {
          salesByCategory[product.category] = 0;
        }
        salesByCategory[product.category] += item.price * item.qty;
      }
    });
  });
  
  res.json({
    salesByMonth,
    salesByCategory
  });
});

// @desc    Get product analytics data
// @route   GET /api/analytics/products
// @access  Private/Admin
const getProductAnalytics = asyncHandler(async (req, res) => {
  // Get top selling products
  const topSellingProducts = await Product.find({})
    .sort({ sold: -1 })
    .limit(10);
  
  // Get products with low stock
  const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
    .sort({ stock: 1 })
    .limit(10);
  
  // Get products by category
  const products = await Product.find({});
  const productsByCategory = {};
  
  products.forEach(product => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = 0;
    }
    productsByCategory[product.category]++;
  });
  
  res.json({
    topSellingProducts,
    lowStockProducts,
    productsByCategory
  });
});

// @desc    Get user analytics data
// @route   GET /api/analytics/users
// @access  Private/Admin
const getUserAnalytics = asyncHandler(async (req, res) => {
  // Get total users
  const totalUsers = await User.countDocuments({ isAdmin: false });
  
  // Get new users in the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const newUsers = await User.countDocuments({
    isAdmin: false,
    createdAt: { $gte: thirtyDaysAgo }
  });
  
  // Get users by registration date (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const users = await User.find({
    isAdmin: false,
    createdAt: { $gte: sixMonthsAgo }
  });
  
  const usersByMonth = {};
  
  users.forEach(user => {
    const month = new Date(user.createdAt).toLocaleString('default', { month: 'long' });
    if (!usersByMonth[month]) {
      usersByMonth[month] = 0;
    }
    usersByMonth[month]++;
  });
  
  res.json({
    totalUsers,
    newUsers,
    usersByMonth
  });
});

module.exports = {
  getDashboardAnalytics,
  getSalesAnalytics,
  getProductAnalytics,
  getUserAnalytics
};
