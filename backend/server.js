const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Import security middleware
const {
  generalLimiter,
  authLimiter,
  apiLimiter,
  paymentLimiter,
  uploadLimiter,
  securityHeaders,
  sanitizeData,
  customSecurity,
  requestSizeLimiter,
  suspiciousActivityDetector,
  corsSecurityCheck
} = require('./middleware/security');

// Initialize Express app
const app = express();

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware (apply early)
app.use(securityHeaders);
app.use(customSecurity);
app.use(corsSecurityCheck);
app.use(requestSizeLimiter);
app.use(suspiciousActivityDetector);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Data sanitization
app.use(sanitizeData);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CORS_ORIGIN ?
      process.env.CORS_ORIGIN.split(',') :
      ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005'];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// General rate limiting
app.use('/api/', apiLimiter);

// Static folder for uploads
const uploadsPath = path.join(__dirname, 'uploads');
console.log('Uploads directory path:', uploadsPath);
app.use('/uploads', express.static(uploadsPath));

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');
const uploadRoutes = require('./routes/upload');
const analyticsRoutes = require('./routes/analytics');
const settingsRoutes = require('./routes/settings');
const paymentRoutes = require('./routes/payments');
const wishlistRoutes = require('./routes/wishlist');

// Use routes with specific rate limiting
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews/:productId', reviewRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/upload', uploadLimiter, uploadRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/payments', paymentLimiter, paymentRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Luxify API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Luxify API is running...');
});

// Import error handler middleware
const errorHandler = require('./middleware/error');

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
