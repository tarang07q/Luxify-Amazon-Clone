const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const createSimpleAdmin = async () => {
  try {
    const email = 'admin@test.com';
    const password = 'admin123';
    
    // Check if admin already exists
    const adminExists = await User.findOne({ email });
    
    if (adminExists) {
      console.log('Admin user already exists');
      console.log('Email:', email);
      console.log('Password:', password);
      process.exit();
    }
    
    // Create admin user
    const admin = await User.create({
      name: 'Simple Admin',
      email,
      password,
      role: 'admin'
    });
    
    console.log('Admin user created successfully');
    console.log('Email:', email);
    console.log('Password:', password);
    
    process.exit();
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createSimpleAdmin();
