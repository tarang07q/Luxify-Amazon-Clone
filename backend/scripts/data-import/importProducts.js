const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const products = require('./sampleProducts');

// Load env vars
dotenv.config({ path: './backend/.env' });

// Load models
const Product = require('./models/Product');
const User = require('./models/User');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Import sample products
const importProducts = async () => {
  try {
    // Find admin user
    const admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.log('Admin user not found. Please create an admin user first with: node backend/seeder.js -a'.red);
      process.exit(1);
    }
    
    // Add admin user ID to each product
    const productsWithUser = products.map(product => ({
      ...product,
      user: admin._id
    }));
    
    // Delete existing products
    await Product.deleteMany();
    
    // Insert sample products
    await Product.insertMany(productsWithUser);
    
    console.log('Sample products imported successfully!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red);
    process.exit(1);
  }
};

importProducts();
