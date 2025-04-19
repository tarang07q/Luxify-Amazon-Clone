const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load env vars
dotenv.config();

// Connect to DB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/amazer';
console.log(`Connecting to MongoDB: ${MONGO_URI}`.cyan);
mongoose.connect(MONGO_URI);

// Update featured products
const updateFeaturedProducts = async () => {
  try {
    console.log('Updating featured products...'.yellow);
    
    // Get all products
    const products = await Product.find().sort('-rating');
    
    if (products.length === 0) {
      console.log('No products found in the database.'.red);
      process.exit(1);
    }
    
    console.log(`Found ${products.length} products.`.yellow);
    
    // Mark top 20 products as featured
    const topProducts = products.slice(0, 20);
    
    for (const product of topProducts) {
      product.featured = true;
      await product.save();
      console.log(`Marked product as featured: ${product.title}`.green);
    }
    
    console.log('Featured products updated successfully!'.green);
    process.exit(0);
  } catch (err) {
    console.error(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

// Run the update function
updateFeaturedProducts();
