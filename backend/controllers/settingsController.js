const User = require('../models/User');
const asyncHandler = require('../middleware/async');

// @desc    Get admin settings
// @route   GET /api/settings
// @access  Private/Admin
const getSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Return user settings
  res.json({
    name: user.name,
    email: user.email,
    notificationPreferences: user.notificationPreferences || {
      emailNotifications: true,
      orderUpdates: true,
      marketingEmails: false,
      securityAlerts: true
    },
    displayPreferences: user.displayPreferences || {
      darkMode: true,
      compactView: false,
      showAnalyticsSummary: true
    },
    securitySettings: {
      twoFactorEnabled: user.twoFactorEnabled || false,
      lastPasswordChange: user.lastPasswordChange || user.updatedAt
    }
  });
});

// @desc    Update admin settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Update notification preferences
  if (req.body.notificationPreferences) {
    user.notificationPreferences = {
      ...user.notificationPreferences,
      ...req.body.notificationPreferences
    };
  }
  
  // Update display preferences
  if (req.body.displayPreferences) {
    user.displayPreferences = {
      ...user.displayPreferences,
      ...req.body.displayPreferences
    };
  }
  
  // Update security settings
  if (req.body.twoFactorEnabled !== undefined) {
    user.twoFactorEnabled = req.body.twoFactorEnabled;
  }
  
  // Save the updated user
  await user.save();
  
  res.json({
    name: user.name,
    email: user.email,
    notificationPreferences: user.notificationPreferences,
    displayPreferences: user.displayPreferences,
    securitySettings: {
      twoFactorEnabled: user.twoFactorEnabled,
      lastPasswordChange: user.lastPasswordChange || user.updatedAt
    }
  });
});

// @desc    Change admin password
// @route   PUT /api/settings/password
// @access  Private/Admin
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Please provide current and new password' });
  }
  
  const user = await User.findById(req.user._id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Check if current password is correct
  const isMatch = await user.matchPassword(currentPassword);
  
  if (!isMatch) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }
  
  // Update password
  user.password = newPassword;
  user.lastPasswordChange = Date.now();
  
  await user.save();
  
  res.json({ message: 'Password updated successfully' });
});

// @desc    Get system settings
// @route   GET /api/settings/system
// @access  Private/Admin
const getSystemSettings = asyncHandler(async (req, res) => {
  // This would typically come from a database, but for simplicity we'll hardcode it
  res.json({
    siteSettings: {
      siteName: 'Amazer',
      siteDescription: 'Your one-stop shop for everything',
      maintenanceMode: false,
      allowUserRegistration: true
    },
    emailSettings: {
      emailProvider: 'SMTP',
      senderEmail: 'noreply@amazer.com',
      senderName: 'Amazer Admin'
    },
    paymentSettings: {
      paymentGateways: ['Stripe', 'PayPal'],
      currency: 'USD',
      taxRate: 7.5
    },
    shippingSettings: {
      defaultShippingMethod: 'Standard',
      freeShippingThreshold: 50,
      internationalShipping: true
    }
  });
});

// @desc    Update system settings
// @route   PUT /api/settings/system
// @access  Private/Admin
const updateSystemSettings = asyncHandler(async (req, res) => {
  // This would typically update a database, but for simplicity we'll just return the request body
  res.json({
    message: 'System settings updated successfully',
    settings: req.body
  });
});

module.exports = {
  getSettings,
  updateSettings,
  changePassword,
  getSystemSettings,
  updateSystemSettings
};
