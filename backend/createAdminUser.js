const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@luxify.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }
    
    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@luxify.com',
      password: 'admin123',
      role: 'admin'
    });
    
    console.log('Admin user created successfully');
    console.log('Email: admin@luxify.com');
    console.log('Password: admin123');
    
    process.exit();
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
