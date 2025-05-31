const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Environment variable configuration with fallbacks
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/luxify';
const JWT_SECRET = process.env.JWT_SECRET || 'luxify_secret_key_2024';
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Warn about missing environment variables
if (!process.env.MONGO_URI) {
  console.log('⚠️  MONGO_URI not set, using default: mongodb://localhost:27017/luxify');
}
if (!process.env.JWT_SECRET) {
  console.log('⚠️  JWT_SECRET not set, using fallback (not secure for production)');
}

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
    'http://localhost:3006',
    'http://localhost:3007',
    'http://localhost:3008'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [3, 'Password must be at least 3 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
      email: this.email
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password || !enteredPassword) {
    return false;
  }
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};

const User = mongoose.model('User', UserSchema);

// Product Schema
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a product title'],
    trim: true,
    maxlength: [100, 'Product title cannot be more than 100 characters']
  },
  name: {
    type: String,
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  mrp: {
    type: Number,
    min: [0, 'MRP cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot be more than 100%']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Electronics',
      'Clothing',
      'Books',
      'Home & Garden',
      'Sports',
      'Beauty',
      'Toys',
      'Automotive',
      'Health',
      'Food'
    ]
  },
  brand: {
    type: String,
    trim: true
  },
  images: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  numReviews: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);

// Order Schema
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
  }],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'PayPal'
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);

// Helper function to send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
};

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

// Middleware to check if user is admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: 'Access denied. Admin only.'
    });
  }
};

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Luxify API is healthy',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Luxify API is running!',
    version: '1.0.0'
  });
});

// Register user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log('🔐 Registration attempt:', { name, email });

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email and password'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    const user = await User.create({ name, email, password });
    console.log('✅ User created successfully:', { id: user._id, email: user.email });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
});

// Register admin
app.post('/api/auth/register-admin', async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    console.log('🔐 Admin registration attempt:', { name, email });

    if (!name || !email || !password || !secretKey) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, password and secret key'
      });
    }

    const ADMIN_SECRET_KEY = 'admin-secret-123';
    if (secretKey !== ADMIN_SECRET_KEY) {
      return res.status(401).json({
        success: false,
        error: 'Invalid admin secret key'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    const user = await User.create({ name, email, password, role: 'admin' });
    console.log('✅ Admin user created successfully:', { id: user._id, email: user.email });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error('❌ Admin registration error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error during admin registration'
    });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login attempt:', { email });

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log('❌ Password mismatch for user:', email);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    user.lastLogin = new Date();
    await user.save();

    console.log('✅ Login successful:', { id: user._id, email: user.email, role: user.role });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    path: '/'
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Luxify API is healthy',
    timestamp: new Date().toISOString()
  });
});

// ===== PRODUCT ROUTES =====

// Get all products with filtering, pagination, and search
app.get('/api/products', async (req, res) => {
  try {
    const {
      q = '',
      page = 1,
      limit = 12,
      category = '',
      sort = 'createdAt',
      featured = false,
      minPrice,
      maxPrice
    } = req.query;

    // Build query object
    const query = { isActive: true };

    // Search functionality
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } }
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Featured filter
    if (featured === 'true') {
      query.featured = true;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'price_asc':
        sortOption = { price: 1 };
        break;
      case 'price_desc':
        sortOption = { price: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    console.log(`📦 Products fetched: ${products.length}/${total} total`);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });

  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching products'
    });
  }
});

// Get single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('❌ Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching product'
    });
  }
});

// Create new product (Admin only)
app.post('/api/products', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);

    console.log('✅ Product created:', product.name);

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('❌ Error creating product:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Update product (Admin only)
app.put('/api/products/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    console.log('✅ Product updated:', product.name);

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('❌ Error updating product:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Delete product (Admin only)
app.delete('/api/products/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    console.log('✅ Product deleted:', product.name);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting product:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting product'
    });
  }
});

// Get product categories
app.get('/api/products/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching categories'
    });
  }
});

// ===== ORDER ROUTES =====

// Get all orders (Admin only)
app.get('/api/orders', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .populate('orderItems.product', 'name')
      .sort({ createdAt: -1 });

    console.log(`📋 Orders fetched: ${orders.length} total`);

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching orders'
    });
  }
});

// Get user's orders
app.get('/api/orders/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('orderItems.product', 'name')
      .sort({ createdAt: -1 });

    console.log(`📋 User orders fetched: ${orders.length} for user ${req.user.id}`);

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error('❌ Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching orders'
    });
  }
});

// Get single order by ID
app.get('/api/orders/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this order'
      });
    }

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('❌ Error fetching order:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching order'
    });
  }
});

// Create new order
app.post('/api/orders', protect, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No order items'
      });
    }

    const order = new Order({
      orderItems,
      user: req.user.id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();

    console.log('✅ Order created:', createdOrder._id);

    res.status(201).json({
      success: true,
      data: createdOrder
    });

  } catch (error) {
    console.error('❌ Error creating order:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Update order status (Admin only)
app.put('/api/orders/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    order.status = status;

    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    console.log('✅ Order status updated:', updatedOrder._id, status);

    res.json({
      success: true,
      data: updatedOrder
    });

  } catch (error) {
    console.error('❌ Error updating order status:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Admin Analytics Endpoint
app.get('/api/admin/analytics', protect, adminOnly, async (req, res) => {
  try {
    // Get total counts
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });

    // Get products by category
    const productsByCategory = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 }, totalStock: { $sum: '$stock' } } },
      { $sort: { count: -1 } }
    ]);

    // Get low stock products (stock < 10)
    const lowStockProducts = await Product.find({
      isActive: true,
      stock: { $lt: 10 }
    }).select('title stock category').sort({ stock: 1 });

    // Get featured products count
    const featuredProducts = await Product.countDocuments({ featured: true, isActive: true });

    // Get top rated products
    const topRatedProducts = await Product.find({ isActive: true })
      .select('title rating numReviews category')
      .sort({ rating: -1, numReviews: -1 })
      .limit(5);

    // Calculate total inventory value
    const inventoryValue = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, totalValue: { $sum: { $multiply: ['$price', '$stock'] } } } }
    ]);

    console.log('📊 Analytics fetched for admin');

    res.json({
      success: true,
      data: {
        overview: {
          totalProducts,
          totalUsers,
          totalAdmins,
          featuredProducts,
          totalInventoryValue: inventoryValue[0]?.totalValue || 0
        },
        productsByCategory,
        lowStockProducts,
        topRatedProducts
      }
    });
  } catch (error) {
    console.error('❌ Analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching analytics'
    });
  }
});

// ===== ADDRESS ROUTES =====

// Get all Indian states
app.get('/api/address/states', (req, res) => {
  try {
    const indianStatesAndCities = require('../data/indianStatesAndCities');
    const states = Object.keys(indianStatesAndCities).sort();
    res.json({
      success: true,
      count: states.length,
      data: states
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// Get cities by state
app.get('/api/address/cities/:state', (req, res) => {
  try {
    const indianStatesAndCities = require('../data/indianStatesAndCities');
    const { state } = req.params;
    const cities = indianStatesAndCities[state];

    if (!cities) {
      return res.status(404).json({
        success: false,
        message: 'State not found'
      });
    }

    res.json({
      success: true,
      state: state,
      count: cities.length,
      data: cities.sort()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log(`📍 Database: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
      console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
      console.log(`🌍 Environment: ${NODE_ENV}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });
