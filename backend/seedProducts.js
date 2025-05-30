const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const Product = require('./models/Product');
const User = require('./models/User');
const sampleProducts = require('./sampleProducts');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const importProducts = async () => {
  try {
    // Find admin user
    const adminUser = await User.findOne({ role: 'admin' });

    if (!adminUser) {
      console.log('No admin user found. Please create an admin user first.'.red);
      process.exit(1);
    }

    // Add user reference to each product
    const productsWithUser = sampleProducts.map(product => {
      return { ...product, user: adminUser._id };
    });

    // Clear existing products
    await Product.deleteMany();
    console.log('Products cleared...'.yellow);

    // Insert sample products
    await Product.insertMany(productsWithUser);
    console.log(`${productsWithUser.length} products imported...`.green);

    process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

const deleteProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Products cleared...'.red);
    process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteProducts();
} else {
  importProducts();
}
