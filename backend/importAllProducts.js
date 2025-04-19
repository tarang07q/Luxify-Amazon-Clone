const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const predefinedProducts1 = require('./data/predefinedProducts');
const predefinedProducts2 = require('./data/predefinedProducts2');
const predefinedProducts3 = require('./data/predefinedProducts3');
const predefinedProducts4 = require('./data/predefinedProducts4');

// Load env vars
dotenv.config();

// Connect to DB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/amazer';
console.log(`Connecting to MongoDB: ${MONGO_URI}`.cyan);
mongoose.connect(MONGO_URI);

// Combine all product batches
const allProducts = [
  ...predefinedProducts1,
  ...predefinedProducts2,
  ...predefinedProducts3,
  ...predefinedProducts4
];

// Import all predefined products
const importAllProducts = async () => {
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
    const productsWithUser = allProducts.map(product => ({
      ...product,
      user: admin._id
    }));

    console.log(`Preparing to import ${productsWithUser.length} products...`.yellow);

    // Check if products already exist
    const existingProducts = await Product.countDocuments();

    if (existingProducts > 0) {
      console.log(`Found ${existingProducts} existing products.`.yellow);
      console.log('Do you want to delete existing products before importing? (Y/N)'.cyan);

      // Simulate user input (in a real script, you would use readline or similar)
      const deleteExisting = process.argv.includes('--delete-existing');

      if (deleteExisting) {
        console.log('Deleting existing products...'.yellow);
        await Product.deleteMany();
        console.log('Existing products deleted.'.green);
      } else {
        console.log('Keeping existing products and adding new ones.'.green);
      }
    }

    // Insert predefined products
    await Product.insertMany(productsWithUser);

    console.log(`${productsWithUser.length} predefined products imported successfully!`.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red);
    process.exit(1);
  }
};

importAllProducts();
