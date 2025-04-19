const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const predefinedProducts = require('./data/predefinedProducts');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Import predefined products
const importPredefinedProducts = async () => {
  try {
    console.log('Looking for admin user...'.yellow);
    
    // Find admin user
    const admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.log('Admin user not found. Please create an admin user first.'.red);
      process.exit(1);
    }
    
    console.log(`Found admin user: ${admin.name} (${admin.email})`.green);
    
    // Add admin user ID to each product
    const productsWithUser = predefinedProducts.map(product => ({
      ...product,
      user: admin._id
    }));
    
    console.log(`Preparing to import ${productsWithUser.length} products...`.yellow);
    
    // Insert predefined products
    await Product.insertMany(productsWithUser);
    
    console.log('Predefined products imported successfully!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red);
    process.exit(1);
  }
};

importPredefinedProducts();
