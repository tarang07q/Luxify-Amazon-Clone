const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createTestUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if users already exist
    const existingAdmin = await User.findOne({ email: 'admin@luxify.com' });
    const existingUser = await User.findOne({ email: 'user@luxify.com' });

    if (!existingAdmin) {
      // Create admin user
      const adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@luxify.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created:', adminUser.email);
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    if (!existingUser) {
      // Create regular user
      const regularUser = await User.create({
        name: 'Test User',
        email: 'user@luxify.com',
        password: 'user123',
        role: 'user'
      });
      console.log('✅ Regular user created:', regularUser.email);
    } else {
      console.log('ℹ️ Regular user already exists');
    }

    console.log('\n🎉 Test users setup complete!');
    console.log('📧 Admin Login: admin@luxify.com / admin123');
    console.log('📧 User Login: user@luxify.com / user123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test users:', error);
    process.exit(1);
  }
};

createTestUsers();
