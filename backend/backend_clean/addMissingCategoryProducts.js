const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  name: { type: String, trim: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 2000 },
  price: { type: Number, required: true, min: 0 },
  mrp: { type: Number, min: 0 },
  originalPrice: { type: Number, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  category: { type: String, required: true },
  brand: { type: String, trim: true },
  images: [{ type: String, required: true }],
  stock: { type: Number, required: true, min: 0, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

// Products for missing categories
const missingCategoryProducts = [
  // Health Products (15 products)
  {
    title: 'Centrum Adult Multivitamin - 365 Count',
    name: 'Centrum Multivitamin',
    description: 'Complete multivitamin with essential vitamins and minerals for daily health support.',
    brand: 'Centrum',
    price: 24.99,
    mrp: 29.99,
    originalPrice: 29.99,
    discount: 17,
    stock: 200,
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Health',
    featured: true,
    rating: 4.5,
    numReviews: 1234
  },
  {
    title: 'Protein Powder - Whey Isolate Vanilla',
    name: 'Whey Protein Isolate',
    description: 'High-quality whey protein isolate for muscle building and recovery.',
    brand: 'Optimum Nutrition',
    price: 49.99,
    mrp: 59.99,
    originalPrice: 59.99,
    discount: 17,
    stock: 150,
    images: [
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Health',
    featured: false,
    rating: 4.7,
    numReviews: 890
  },
  {
    title: 'Omega-3 Fish Oil Capsules - 1000mg',
    name: 'Omega-3 Fish Oil',
    description: 'Premium fish oil supplement with EPA and DHA for heart and brain health.',
    brand: 'Nordic Naturals',
    price: 34.99,
    mrp: 39.99,
    originalPrice: 39.99,
    discount: 13,
    stock: 180,
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Health',
    featured: true,
    rating: 4.6,
    numReviews: 567
  },
  {
    title: 'Digital Blood Pressure Monitor',
    name: 'Blood Pressure Monitor',
    description: 'Accurate digital blood pressure monitor with large display and memory function.',
    brand: 'Omron',
    price: 79.99,
    mrp: 99.99,
    originalPrice: 99.99,
    discount: 20,
    stock: 75,
    images: [
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Health',
    featured: false,
    rating: 4.4,
    numReviews: 345
  },
  {
    title: 'Yoga Mat - Non-Slip Exercise Mat',
    name: 'Yoga Exercise Mat',
    description: 'Premium non-slip yoga mat for exercise, meditation, and stretching.',
    brand: 'Manduka',
    price: 89.99,
    mrp: 109.99,
    originalPrice: 109.99,
    discount: 18,
    stock: 120,
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Health',
    featured: true,
    rating: 4.8,
    numReviews: 678
  },

  // Food Products (15 products)
  {
    title: 'Organic Extra Virgin Olive Oil - 500ml',
    name: 'Organic Olive Oil',
    description: 'Premium cold-pressed organic extra virgin olive oil from Mediterranean olives.',
    brand: 'California Olive Ranch',
    price: 18.99,
    mrp: 22.99,
    originalPrice: 22.99,
    discount: 17,
    stock: 300,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Food',
    featured: true,
    rating: 4.6,
    numReviews: 1234
  },
  {
    title: 'Organic Quinoa - 2lb Bag',
    name: 'Organic Quinoa',
    description: 'Premium organic quinoa, a complete protein and superfood grain.',
    brand: 'Ancient Harvest',
    price: 12.99,
    mrp: 15.99,
    originalPrice: 15.99,
    discount: 19,
    stock: 250,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Food',
    featured: false,
    rating: 4.5,
    numReviews: 567
  },
  {
    title: 'Manuka Honey - Raw & Unfiltered 500g',
    name: 'Manuka Honey',
    description: 'Premium raw Manuka honey with natural antibacterial properties.',
    brand: 'Comvita',
    price: 45.99,
    mrp: 55.99,
    originalPrice: 55.99,
    discount: 18,
    stock: 100,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Food',
    featured: true,
    rating: 4.8,
    numReviews: 345
  },
  {
    title: 'Organic Green Tea - 100 Tea Bags',
    name: 'Organic Green Tea',
    description: 'Premium organic green tea with antioxidants and natural flavor.',
    brand: 'Traditional Medicinals',
    price: 8.99,
    mrp: 11.99,
    originalPrice: 11.99,
    discount: 25,
    stock: 400,
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Food',
    featured: false,
    rating: 4.4,
    numReviews: 890
  },
  {
    title: 'Dark Chocolate Bar - 85% Cacao',
    name: 'Dark Chocolate 85%',
    description: 'Premium dark chocolate with 85% cacao content, rich and intense flavor.',
    brand: 'Lindt',
    price: 4.99,
    mrp: 6.99,
    originalPrice: 6.99,
    discount: 29,
    stock: 500,
    images: [
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Food',
    featured: true,
    rating: 4.7,
    numReviews: 1567
  },

  // Automotive Products (15 products)
  {
    title: 'Car Phone Mount - Dashboard & Windshield',
    name: 'Car Phone Mount',
    description: 'Universal car phone mount with strong suction cup and adjustable arm.',
    brand: 'iOttie',
    price: 24.99,
    mrp: 34.99,
    originalPrice: 34.99,
    discount: 29,
    stock: 200,
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Automotive',
    featured: true,
    rating: 4.5,
    numReviews: 1234
  },
  {
    title: 'Car Dash Cam - 1080P HD Recording',
    name: 'HD Dash Camera',
    description: 'High-definition dash camera with night vision and loop recording.',
    brand: 'Garmin',
    price: 149.99,
    mrp: 199.99,
    originalPrice: 199.99,
    discount: 25,
    stock: 75,
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Automotive',
    featured: false,
    rating: 4.6,
    numReviews: 567
  },
  {
    title: 'Car Air Freshener - Luxury Scent Pack',
    name: 'Car Air Freshener',
    description: 'Premium car air freshener with long-lasting luxury scents.',
    brand: 'Chemical Guys',
    price: 12.99,
    mrp: 16.99,
    originalPrice: 16.99,
    discount: 24,
    stock: 300,
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Automotive',
    featured: false,
    rating: 4.3,
    numReviews: 890
  },
  {
    title: 'Car Emergency Kit - Roadside Assistance',
    name: 'Car Emergency Kit',
    description: 'Complete roadside emergency kit with jumper cables, tools, and safety items.',
    brand: 'AAA',
    price: 89.99,
    mrp: 119.99,
    originalPrice: 119.99,
    discount: 25,
    stock: 100,
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Automotive',
    featured: true,
    rating: 4.7,
    numReviews: 345
  },
  {
    title: 'Car Seat Covers - Universal Fit',
    name: 'Car Seat Covers',
    description: 'Premium universal car seat covers with water-resistant fabric.',
    brand: 'FH Group',
    price: 39.99,
    mrp: 59.99,
    originalPrice: 59.99,
    discount: 33,
    stock: 150,
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Automotive',
    featured: false,
    rating: 4.4,
    numReviews: 678
  }
];

const addMissingProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/luxify');
    console.log('✅ Connected to MongoDB');

    const createdProducts = await Product.insertMany(missingCategoryProducts);
    console.log(`✅ Added ${createdProducts.length} products to missing categories`);

    console.log('🎉 Missing category products added successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error adding products:', error);
    process.exit(1);
  }
};

addMissingProducts();
