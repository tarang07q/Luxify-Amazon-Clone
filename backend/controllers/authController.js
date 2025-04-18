const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Register admin user
// @route   POST /api/auth/register-admin
// @access  Public
exports.registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, secretKey } = req.body;

    // Verify secret key (this should be stored in environment variables in production)
    const ADMIN_SECRET_KEY = 'admin-secret-123';

    if (secretKey !== ADMIN_SECRET_KEY) {
      return res.status(401).json({
        success: false,
        error: 'Invalid admin secret key'
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    console.log('Creating admin user with email:', email);

    // Create admin user
    const user = await User.create({
      name,
      email,
      password,
      role: 'admin'
    });

    console.log('Admin user created:', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error('Error creating admin user:', err);
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt with email:', email);

    // Validate email & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('User not found with email:', email);
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Verify password field is included
    if (!user.password) {
      console.error('Password field not included in user object');
      // Try to fetch again with explicit password selection
      const userWithPassword = await User.findById(user._id).select('+password');
      if (!userWithPassword || !userWithPassword.password) {
        console.error('Still unable to get password field');
        return next(new ErrorResponse('Authentication error', 500));
      }
      // Replace user with the one that has password
      user.password = userWithPassword.password;
    }

    console.log('User found:', {
      id: user._id,
      email: user.email,
      role: user.role
    });

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log('Password does not match for user:', email);
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    console.log('Login successful for user:', {
      id: user._id,
      email: user.email,
      role: user.role
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('Login error:', err);
    next(err);
  }
};

// @desc    Log user out / clear cookie
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    // Clear the token cookie by setting it to 'none' and expiring it immediately
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000), // Expire in 10 seconds
      httpOnly: true,
      path: '/' // Ensure the cookie is cleared from all paths
    });

    // Also clear any other auth-related cookies if they exist
    res.cookie('jwt', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
      path: '/'
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
      data: {}
    });
  } catch (err) {
    console.error('Logout error:', err);
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Check if user is admin
// @route   GET /api/auth/verify-admin
// @access  Private
exports.verifyAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized as an admin', 403));
    }

    res.status(200).json({
      success: true,
      data: {
        isAdmin: true
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Log the user data being sent
  console.log('Sending user data:', {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  });

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
