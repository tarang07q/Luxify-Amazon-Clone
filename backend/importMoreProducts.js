const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const moreProducts = require('./data/moreProducts');

// Load env vars
dotenv.config();

// Connect to DB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/amazer';
console.log(`Connecting to MongoDB: ${MONGO_URI}`.cyan);
mongoose.connect(MONGO_URI);

// Import more products
const importMoreProducts = async () => {
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
    
    // Add admin user ID to each product
    const productsWithUser = moreProducts.map(product => ({
      ...product,
      user: admin._id
    }));
    
    console.log(`Preparing to import ${productsWithUser.length} more products...`.yellow);
    
    // Get current product count
    const existingProductCount = await Product.countDocuments();
    console.log(`Current product count: ${existingProductCount}`.cyan);
    
    // Insert more products
    await Product.insertMany(productsWithUser);
    
    // Get new product count
    const newProductCount = await Product.countDocuments();
    console.log(`New product count: ${newProductCount}`.cyan);
    console.log(`Added ${newProductCount - existingProductCount} new products`.green);
    
    console.log(`More products imported successfully!`.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red);
    process.exit(1);
  }
};

importMoreProducts();
