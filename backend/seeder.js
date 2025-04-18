const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config({ path: './backend/.env' });

// Load models
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const Review = require('./models/Review');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Clear database
const clearDatabase = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();

    console.log('Database cleared...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Create admin user
const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@amazer.com' });

    if (adminExists) {
      console.log('Admin user already exists'.yellow);
      process.exit();
    }

    // Create admin user
    await User.create({
      name: 'Admin User',
      email: 'admin@amazer.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-c') {
  clearDatabase();
} else if (process.argv[2] === '-a') {
  createAdminUser();
} else {
  console.log('Please provide proper command: -c (clear database) or -a (create admin)');
  process.exit();
}
