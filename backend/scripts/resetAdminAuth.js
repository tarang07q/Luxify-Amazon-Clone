const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: './.env' });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

const resetAdminAuth = async () => {
  try {
    await connectDB();

    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@luxify.com' });
    
    if (!adminUser) {
      console.log('Admin user not found');
      process.exit(1);
    }

    console.log('Current admin user data:', {
      id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
      createdAt: adminUser.createdAt,
      lastLogin: adminUser.lastLogin
    });

    // Verify role is admin
    if (adminUser.role !== 'admin') {
      console.log('Updating admin user role to admin...');
      adminUser.role = 'admin';
      await adminUser.save();
      console.log('Role updated successfully');
    } else {
      console.log('Admin role is already set correctly');
    }

    // Clear last login
    adminUser.lastLogin = null;
    await adminUser.save();
    console.log('Last login cleared');

    console.log('\nAdmin user reset complete. Please:');
    console.log('1. Clear your browser\'s localStorage and cookies');
    console.log('2. Log out if you\'re currently logged in');
    console.log('3. Log in again with admin credentials');

    process.exit(0);
  } catch (err) {
    console.error('Error resetting admin auth:', err);
    process.exit(1);
  }
};

resetAdminAuth(); 