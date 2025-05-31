const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const total = await Product.countDocuments();
    const featured = await Product.countDocuments({ featured: true });
    const categories = await Product.distinct('category');
    const example = await Product.findOne();
    console.log('Total products:', total);
    console.log('Featured products:', featured);
    console.log('Categories:', categories);
    console.log('Example product:', example);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})(); 