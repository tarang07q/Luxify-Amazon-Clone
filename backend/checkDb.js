const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

// Load env vars
dotenv.config({ path: './.env' });

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check products
    const products = await Product.find({});
    console.log(`📦 Products in database: ${products.length}`);
    
    if (products.length > 0) {
      console.log('📋 Sample products:');
      products.forEach((product, index) => {
        console.log(`  ${index + 1}. ${product.title} - $${product.price} (${product.category})`);
      });
    }

    // Check users
    const users = await User.find({});
    console.log(`\n👥 Users in database: ${users.length}`);
    
    if (users.length > 0) {
      console.log('📋 Users:');
      users.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkDatabase();
