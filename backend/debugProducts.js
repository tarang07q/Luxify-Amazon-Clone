const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load env vars
dotenv.config({ path: './.env' });

const debugProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Test 1: Direct find all
    console.log('\n1️⃣ Testing direct Product.find()...');
    const allProducts = await Product.find({});
    console.log(`Found ${allProducts.length} products directly`);

    // Test 2: Test the exact query from controller
    console.log('\n2️⃣ Testing controller query logic...');
    
    // Simulate empty query (no filters)
    const reqQuery = {};
    const removeFields = ['select', 'sort', 'page', 'limit', 'q', 'featured'];
    removeFields.forEach(param => delete reqQuery[param]);
    
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    const parsedQuery = JSON.parse(queryStr);
    
    console.log('Parsed query:', parsedQuery);
    
    const products = await Product.find(parsedQuery);
    console.log(`Found ${products.length} products with controller logic`);

    // Test 3: Check if products have required fields
    if (allProducts.length > 0) {
      console.log('\n3️⃣ Sample product structure:');
      const sample = allProducts[0];
      console.log({
        id: sample._id,
        title: sample.title,
        price: sample.price,
        category: sample.category,
        images: sample.images?.length || 0,
        user: sample.user
      });
    }

    // Test 4: Test pagination
    console.log('\n4️⃣ Testing pagination...');
    const page = 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    
    const paginatedProducts = await Product.find({})
      .skip(startIndex)
      .limit(limit)
      .sort('-createdAt');
    
    console.log(`Paginated query returned ${paginatedProducts.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

debugProducts();
