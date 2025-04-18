const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const testAdminAuth = async () => {
  try {
    console.log('Starting admin authentication test...');
    
    // Create a test admin user
    const testEmail = `testadmin_${Date.now()}@test.com`;
    const testPassword = 'password123';
    
    console.log(`Creating test admin user with email: ${testEmail}`);
    
    // Delete any existing test user
    await User.deleteOne({ email: testEmail });
    
    // Create the admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(testPassword, salt);
    
    const adminUser = await User.create({
      name: 'Test Admin',
      email: testEmail,
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('Test admin user created:', {
      id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role
    });
    
    // Verify the user exists and has admin role
    const foundUser = await User.findOne({ email: testEmail });
    
    if (!foundUser) {
      console.error('Error: User not found after creation');
      process.exit(1);
    }
    
    console.log('Found user:', {
      id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role
    });
    
    if (foundUser.role !== 'admin') {
      console.error('Error: User does not have admin role');
      process.exit(1);
    }
    
    console.log('Admin role verified successfully');
    
    // Test password matching
    const isMatch = await foundUser.matchPassword(testPassword);
    
    if (!isMatch) {
      console.error('Error: Password does not match');
      process.exit(1);
    }
    
    console.log('Password verification successful');
    
    console.log('All tests passed! Admin authentication is working correctly.');
    console.log(`You can now log in with email: ${testEmail} and password: ${testPassword}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error in admin authentication test:', error);
    process.exit(1);
  }
};

testAdminAuth();
