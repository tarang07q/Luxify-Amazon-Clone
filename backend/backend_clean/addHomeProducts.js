const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Product Schema (matching the auth_server.js schema)
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  name: { type: String, trim: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 2000 },
  price: { type: Number, required: true, min: 0 },
  mrp: { type: Number, min: 0 },
  originalPrice: { type: Number, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  category: { type: String, required: true, enum: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty', 'Toys', 'Automotive', 'Health', 'Food'] },
  brand: { type: String, trim: true },
  images: [{ type: String, required: true }],
  stock: { type: Number, required: true, min: 0, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

// Home & Garden Products (20 products)
const homeProducts = [
  {
    title: 'Breville Barista Express Espresso Machine',
    name: 'Breville Espresso Machine',
    description: 'Professional espresso machine with built-in grinder, milk frother, and precise temperature control.',
    brand: 'Breville',
    price: 699.99,
    mrp: 799.99,
    originalPrice: 799.99,
    discount: 13,
    stock: 30,
    images: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Home & Garden',
    featured: true,
    rating: 4.8,
    numReviews: 456
  },
  {
    title: 'Le Creuset Dutch Oven - 5.5 Quart',
    name: 'Le Creuset Dutch Oven',
    description: 'Premium cast iron Dutch oven with enamel coating, perfect for braising, roasting, and baking.',
    brand: 'Le Creuset',
    price: 349.99,
    mrp: 399.99,
    originalPrice: 399.99,
    discount: 13,
    stock: 40,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Home & Garden',
    featured: true,
    rating: 4.9,
    numReviews: 789
  },
  {
    title: 'Vitamix A3500 Ascent Series Blender',
    name: 'Vitamix A3500 Blender',
    description: 'High-performance blender with smart technology, variable speed control, and self-cleaning.',
    brand: 'Vitamix',
    price: 549.99,
    mrp: 629.99,
    originalPrice: 629.99,
    discount: 13,
    stock: 25,
    images: ['https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Home & Garden',
    featured: false,
    rating: 4.7,
    numReviews: 234
  },
  {
    title: 'All-Clad D3 Stainless Steel Cookware Set',
    name: 'All-Clad Cookware Set',
    description: '10-piece professional cookware set with tri-ply construction and lifetime warranty.',
    brand: 'All-Clad',
    price: 799.99,
    mrp: 999.99,
    originalPrice: 999.99,
    discount: 20,
    stock: 20,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Home & Garden',
    featured: true,
    rating: 4.8,
    numReviews: 567
  },
  {
    title: 'Shark Navigator Lift-Away Vacuum',
    name: 'Shark Navigator Vacuum',
    description: 'Versatile upright vacuum with lift-away canister and anti-allergen complete seal technology.',
    brand: 'Shark',
    price: 179.99,
    mrp: 219.99,
    originalPrice: 219.99,
    discount: 18,
    stock: 60,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Home & Garden',
    featured: false,
    rating: 4.4,
    numReviews: 1234
  },
  {
    title: 'Nest Learning Thermostat - 3rd Generation',
    name: 'Nest Thermostat',
    description: 'Smart thermostat that learns your schedule and programs itself to save energy.',
    brand: 'Google Nest',
    price: 249.99,
    mrp: 279.99,
    originalPrice: 279.99,
    discount: 11,
    stock: 80,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Home & Garden',
    featured: false,
    rating: 4.5,
    numReviews: 890
  },
  {
    title: 'Weber Genesis II E-335 Gas Grill',
    name: 'Weber Genesis Grill',
    description: 'Premium gas grill with three burners, porcelain-enameled cast iron grates, and built-in thermometer.',
    brand: 'Weber',
    price: 899.99,
    mrp: 1099.99,
    originalPrice: 1099.99,
    discount: 18,
    stock: 15,
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Home & Garden',
    featured: true,
    rating: 4.7,
    numReviews: 345
  },
  {
    title: 'Philips Hue White and Color Ambiance Starter Kit',
    name: 'Philips Hue Starter Kit',
    description: 'Smart LED lighting system with millions of colors and wireless control via smartphone.',
    brand: 'Philips',
    price: 199.99,
    mrp: 229.99,
    originalPrice: 229.99,
    discount: 13,
    stock: 100,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Home & Garden',
    featured: false,
    rating: 4.6,
    numReviews: 678
  },
  {
    title: 'iRobot Roomba j7+ Robot Vacuum',
    name: 'iRobot Roomba j7+',
    description: 'Smart robot vacuum with obstacle avoidance, self-emptying base, and app control.',
    brand: 'iRobot',
    price: 849.99,
    mrp: 999.99,
    originalPrice: 999.99,
    discount: 15,
    stock: 35,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Home & Garden',
    featured: true,
    rating: 4.5,
    numReviews: 456
  },
  {
    title: 'Casper Original Mattress - Queen Size',
    name: 'Casper Original Mattress',
    description: 'Premium memory foam mattress with zoned support and cooling technology.',
    brand: 'Casper',
    price: 1095.99,
    mrp: 1295.99,
    originalPrice: 1295.99,
    discount: 15,
    stock: 20,
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Home & Garden',
    featured: true,
    rating: 4.6,
    numReviews: 1234
  }
];

// Connect to MongoDB and add products
const addHomeProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/luxify');
    console.log('✅ Connected to MongoDB');

    const createdProducts = await Product.insertMany(homeProducts);
    console.log(`✅ Added ${createdProducts.length} home & garden products`);

    console.log('🎉 Home & Garden products added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding products:', error);
    process.exit(1);
  }
};

addHomeProducts();
