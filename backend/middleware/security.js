const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Rate limiting configurations
const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      error: message
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// General rate limiting
const generalLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  100, // limit each IP to 100 requests per windowMs
  'Too many requests from this IP, please try again later.'
);

// Strict rate limiting for auth endpoints
const authLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // limit each IP to 5 requests per windowMs
  'Too many authentication attempts, please try again later.'
);

// API rate limiting
const apiLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  1000, // limit each IP to 1000 requests per windowMs
  'API rate limit exceeded, please try again later.'
);

// Payment rate limiting
const paymentLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  10, // limit each IP to 10 payment requests per windowMs
  'Too many payment attempts, please try again later.'
);

// File upload rate limiting
const uploadLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  20, // limit each IP to 20 upload requests per windowMs
  'Too many upload attempts, please try again later.'
);

// Security headers configuration
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.stripe.com"],
      frameSrc: ["'self'", "https://js.stripe.com"],
    },
  },
  crossOriginEmbedderPolicy: false,
});

// Data sanitization middleware
const sanitizeData = [
  mongoSanitize(), // Prevent NoSQL injection attacks
  xss(), // Clean user input from malicious HTML
  hpp() // Prevent HTTP Parameter Pollution
];

// Custom security middleware
const customSecurity = (req, res, next) => {
  // Remove sensitive headers
  res.removeHeader('X-Powered-By');
  
  // Add custom security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Add HSTS header in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  
  next();
};

// IP whitelist middleware (for admin endpoints)
const ipWhitelist = (allowedIPs = []) => {
  return (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      return next(); // Skip in development
    }
    
    const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    
    if (allowedIPs.length > 0 && !allowedIPs.includes(clientIP)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied from this IP address'
      });
    }
    
    next();
  };
};

// Request size limiter
const requestSizeLimiter = (req, res, next) => {
  const maxSize = process.env.MAX_REQUEST_SIZE || '10mb';
  
  if (req.headers['content-length'] && parseInt(req.headers['content-length']) > parseInt(maxSize)) {
    return res.status(413).json({
      success: false,
      error: 'Request entity too large'
    });
  }
  
  next();
};

// Suspicious activity detector
const suspiciousActivityDetector = (req, res, next) => {
  const suspiciousPatterns = [
    /(\<|\%3C)script(\>|\%3E)/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /eval\(/i,
    /expression\(/i,
    /\.\.\/\.\.\//,
    /etc\/passwd/i,
    /cmd\.exe/i,
    /powershell/i
  ];
  
  const checkString = JSON.stringify(req.body) + JSON.stringify(req.query) + JSON.stringify(req.params);
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(checkString)) {
      console.warn(`Suspicious activity detected from IP: ${req.ip}, Pattern: ${pattern}, URL: ${req.originalUrl}`);
      
      return res.status(400).json({
        success: false,
        error: 'Invalid request detected'
      });
    }
  }
  
  next();
};

// CORS security enhancement
const corsSecurityCheck = (req, res, next) => {
  const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3004'];
  const origin = req.headers.origin;
  
  if (origin && !allowedOrigins.includes(origin)) {
    console.warn(`Blocked request from unauthorized origin: ${origin}`);
    return res.status(403).json({
      success: false,
      error: 'CORS policy violation'
    });
  }
  
  next();
};

// API key validation middleware
const validateApiKey = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    return next(); // Skip in development
  }
  
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY;
  
  if (validApiKey && (!apiKey || apiKey !== validApiKey)) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or missing API key'
    });
  }
  
  next();
};

module.exports = {
  generalLimiter,
  authLimiter,
  apiLimiter,
  paymentLimiter,
  uploadLimiter,
  securityHeaders,
  sanitizeData,
  customSecurity,
  ipWhitelist,
  requestSizeLimiter,
  suspiciousActivityDetector,
  corsSecurityCheck,
  validateApiKey
};
