const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const lastProduct = require('./data/lastProduct');

// Load env vars
dotenv.config();

// Connect to DB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/amazer';
console.log(`Connecting to MongoDB: ${MONGO_URI}`.cyan);
mongoose.connect(MONGO_URI);

// Import last product
const importLastProduct = async () => {
  try {
    console.log('Looking for admin user...'.yellow);
    
    // Find admin user
    let admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.log('Admin user not found. Creating a default admin user...'.yellow);
      
      // Create a default admin user if none exists
      const defaultAdmin = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      });
      
      console.log(`Created default admin user: ${defaultAdmin.name} (${defaultAdmin.email})`.green);
      console.log('Please change the default password after logging in!'.red);
      
      // Use the newly created admin
      admin = defaultAdmin;
    } else {
      console.log(`Found admin user: ${admin.name} (${admin.email})`.green);
    }
    
    // Add admin user ID to the product
    const productWithUser = {
      ...lastProduct,
      user: admin._id
    };
    
    console.log(`Preparing to import the last product...`.yellow);
    
    // Get current product count
    const existingProductCount = await Product.countDocuments();
    console.log(`Current product count: ${existingProductCount}`.cyan);
    
    // Insert last product
    await Product.create(productWithUser);
    
    // Get new product count
    const newProductCount = await Product.countDocuments();
    console.log(`New product count: ${newProductCount}`.cyan);
    console.log(`Added ${newProductCount - existingProductCount} new product`.green);
    
    console.log(`Last product imported successfully!`.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red);
    process.exit(1);
  }
};

importLastProduct();
