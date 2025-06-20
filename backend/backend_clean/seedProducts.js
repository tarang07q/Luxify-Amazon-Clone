const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Product Schema (matching the auth_server.js schema)
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a product title'],
    trim: true,
    maxlength: [100, 'Product title cannot be more than 100 characters']
  },
  name: {
    type: String,
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  mrp: {
    type: Number,
    min: [0, 'MRP cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot be more than 100%']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Electronics',
      'Clothing',
      'Books',
      'Home & Garden',
      'Sports',
      'Beauty',
      'Toys',
      'Automotive',
      'Health',
      'Food'
    ]
  },
  brand: {
    type: String,
    trim: true
  },
  images: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  numReviews: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);

// Sample products data
const sampleProducts = [
  {
    title: 'iPhone 15 Pro Max - 256GB - Deep Blue',
    name: 'iPhone 15 Pro Max',
    description: 'The iPhone 15 Pro Max features a stunning 6.7-inch Super Retina XDR display with ProMotion technology, A17 Pro chip, and a professional camera system with 48MP main camera.',
    brand: 'Apple',
    price: 1199.99,
    mrp: 1299.99,
    originalPrice: 1299.99,
    discount: 8,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.8,
    numReviews: 125
  },
  {
    title: 'Samsung Galaxy S24 Ultra - 512GB - Titanium Gray',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'The Samsung Galaxy S24 Ultra delivers exceptional performance with its advanced AI features, S Pen functionality, and professional-grade camera system.',
    brand: 'Samsung',
    price: 1099.99,
    mrp: 1199.99,
    originalPrice: 1199.99,
    discount: 8,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.7,
    numReviews: 89
  },
  {
    title: 'MacBook Pro 14-inch - M3 Pro - Space Black',
    name: 'MacBook Pro 14-inch',
    description: 'The MacBook Pro 14-inch with M3 Pro chip delivers groundbreaking performance and battery life. Perfect for professionals.',
    brand: 'Apple',
    price: 1999.99,
    mrp: 2199.99,
    originalPrice: 2199.99,
    discount: 9,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.9,
    numReviews: 67
  },
  {
    title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling with Dual Noise Sensor technology. Premium comfort and exceptional sound quality.',
    brand: 'Sony',
    price: 349.99,
    mrp: 399.99,
    originalPrice: 399.99,
    discount: 12,
    stock: 75,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.6,
    numReviews: 234
  },
  {
    title: 'Nike Air Max 270 - Men\'s Running Shoes',
    name: 'Nike Air Max 270',
    description: 'The Nike Air Max 270 delivers exceptional comfort with its large Air unit and modern design. Perfect for running.',
    brand: 'Nike',
    price: 149.99,
    mrp: 179.99,
    originalPrice: 179.99,
    discount: 16,
    stock: 120,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: false,
    rating: 4.4,
    numReviews: 156
  },
  {
    title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    name: 'Instant Pot Duo',
    description: 'The Instant Pot Duo combines 7 kitchen appliances in one: pressure cooker, slow cooker, rice cooker, steamer, and more.',
    brand: 'Instant Pot',
    price: 79.99,
    mrp: 99.99,
    originalPrice: 99.99,
    discount: 20,
    stock: 85,
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Home & Garden',
    featured: false,
    rating: 4.5,
    numReviews: 892
  },
  {
    title: 'Kindle Paperwhite E-reader - 11th Generation',
    name: 'Kindle Paperwhite',
    description: 'The Kindle Paperwhite features a 6.8" display, adjustable warm light, and weeks of battery life.',
    brand: 'Amazon',
    price: 139.99,
    mrp: 159.99,
    originalPrice: 159.99,
    discount: 12,
    stock: 200,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Books',
    featured: false,
    rating: 4.3,
    numReviews: 1024
  },
  {
    title: 'Adidas Ultraboost 22 Running Shoes - Black/White',
    name: 'Adidas Ultraboost 22',
    description: 'Experience incredible energy return with every step. The Ultraboost 22 features responsive BOOST midsole.',
    brand: 'Adidas',
    price: 189.99,
    mrp: 220.00,
    originalPrice: 220.00,
    discount: 14,
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: true,
    rating: 4.6,
    numReviews: 445
  },
  // BATCH 1: Electronics (20 products)
  {
    title: 'Apple AirPods Pro (2nd Generation)',
    name: 'AirPods Pro 2nd Gen',
    description: 'Active Noise Cancellation, Transparency mode, Spatial audio, and up to 6 hours of listening time with ANC enabled.',
    brand: 'Apple',
    price: 249.99,
    mrp: 279.99,
    originalPrice: 279.99,
    discount: 11,
    stock: 150,
    images: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.7,
    numReviews: 892
  },
  {
    title: 'Samsung 65" QLED 4K Smart TV',
    name: 'Samsung QLED TV',
    description: 'Quantum Dot technology delivers over a billion shades of color with 100% Color Volume for exceptional picture quality.',
    brand: 'Samsung',
    price: 1299.99,
    mrp: 1499.99,
    originalPrice: 1499.99,
    discount: 13,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.6,
    numReviews: 234
  },
  {
    title: 'Canon EOS R5 Mirrorless Camera',
    name: 'Canon EOS R5',
    description: 'Professional 45MP full-frame mirrorless camera with 8K video recording and advanced autofocus system.',
    brand: 'Canon',
    price: 3899.99,
    mrp: 4199.99,
    originalPrice: 4199.99,
    discount: 7,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.9,
    numReviews: 156
  },
  {
    title: 'Nintendo Switch OLED Console',
    name: 'Nintendo Switch OLED',
    description: 'Enhanced gaming experience with vibrant 7-inch OLED screen, improved audio, and 64GB internal storage.',
    brand: 'Nintendo',
    price: 349.99,
    mrp: 379.99,
    originalPrice: 379.99,
    discount: 8,
    stock: 75,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.8,
    numReviews: 445
  },
  {
    title: 'Bose QuietComfort 45 Headphones',
    name: 'Bose QC45',
    description: 'World-class noise cancellation, premium comfort, and up to 24 hours of battery life.',
    brand: 'Bose',
    price: 329.99,
    mrp: 379.99,
    originalPrice: 379.99,
    discount: 13,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.5,
    numReviews: 678
  },
  {
    title: 'iPad Air 5th Generation - 256GB',
    name: 'iPad Air 5th Gen',
    description: 'Powerful M1 chip, stunning 10.9-inch Liquid Retina display, and all-day battery life.',
    brand: 'Apple',
    price: 749.99,
    mrp: 849.99,
    originalPrice: 849.99,
    discount: 12,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.7,
    numReviews: 523
  },
  {
    title: 'Dell XPS 13 Laptop - Intel i7',
    name: 'Dell XPS 13',
    description: 'Ultra-portable laptop with 13.4-inch InfinityEdge display, Intel Core i7, and premium build quality.',
    brand: 'Dell',
    price: 1199.99,
    mrp: 1399.99,
    originalPrice: 1399.99,
    discount: 14,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.6,
    numReviews: 289
  },
  {
    title: 'Apple Watch Series 9 - 45mm',
    name: 'Apple Watch Series 9',
    description: 'Advanced health monitoring, fitness tracking, and seamless iPhone integration with Always-On Retina display.',
    brand: 'Apple',
    price: 429.99,
    mrp: 479.99,
    originalPrice: 479.99,
    discount: 10,
    stock: 85,
    images: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.8,
    numReviews: 756
  },
  {
    title: 'Sony PlayStation 5 Console',
    name: 'PlayStation 5',
    description: 'Next-generation gaming with lightning-fast loading, haptic feedback, and stunning 4K graphics.',
    brand: 'Sony',
    price: 499.99,
    mrp: 549.99,
    originalPrice: 549.99,
    discount: 9,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.9,
    numReviews: 1234
  },
  {
    title: 'Microsoft Surface Pro 9',
    name: 'Surface Pro 9',
    description: '2-in-1 laptop and tablet with Intel Core processors, all-day battery, and premium design.',
    brand: 'Microsoft',
    price: 999.99,
    mrp: 1199.99,
    originalPrice: 1199.99,
    discount: 17,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.4,
    numReviews: 345
  },
  {
    title: 'Google Pixel 8 Pro - 128GB',
    name: 'Google Pixel 8 Pro',
    description: 'AI-powered photography, pure Android experience, and advanced computational photography features.',
    brand: 'Google',
    price: 999.99,
    mrp: 1099.99,
    originalPrice: 1099.99,
    discount: 9,
    stock: 55,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.6,
    numReviews: 423
  },
  {
    title: 'Amazon Echo Dot (5th Gen)',
    name: 'Echo Dot 5th Gen',
    description: 'Smart speaker with Alexa, improved audio quality, and smart home control capabilities.',
    brand: 'Amazon',
    price: 49.99,
    mrp: 59.99,
    originalPrice: 59.99,
    discount: 17,
    stock: 200,
    images: [
      'https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.3,
    numReviews: 1567
  },
  {
    title: 'JBL Charge 5 Portable Speaker',
    name: 'JBL Charge 5',
    description: 'Powerful portable Bluetooth speaker with 20 hours of playtime and IP67 waterproof rating.',
    brand: 'JBL',
    price: 179.99,
    mrp: 199.99,
    originalPrice: 199.99,
    discount: 10,
    stock: 90,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.5,
    numReviews: 789
  },
  {
    title: 'Logitech MX Master 3S Mouse',
    name: 'MX Master 3S',
    description: 'Advanced wireless mouse with precision tracking, customizable buttons, and ergonomic design.',
    brand: 'Logitech',
    price: 99.99,
    mrp: 119.99,
    originalPrice: 119.99,
    discount: 17,
    stock: 120,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.7,
    numReviews: 456
  },
  {
    title: 'Razer DeathAdder V3 Gaming Mouse',
    name: 'Razer DeathAdder V3',
    description: 'Professional gaming mouse with 30K DPI sensor, ergonomic design, and customizable RGB lighting.',
    brand: 'Razer',
    price: 89.99,
    mrp: 109.99,
    originalPrice: 109.99,
    discount: 18,
    stock: 75,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.6,
    numReviews: 234
  },
  {
    title: 'Anker PowerCore 10000 Power Bank',
    name: 'Anker PowerCore 10000',
    description: 'Ultra-compact portable charger with high-speed charging and PowerIQ technology.',
    brand: 'Anker',
    price: 29.99,
    mrp: 39.99,
    originalPrice: 39.99,
    discount: 25,
    stock: 300,
    images: [
      'https://images.unsplash.com/photo-1609592806596-b43bada2f4b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.4,
    numReviews: 2345
  },
  {
    title: 'SteelSeries Arctis 7P Wireless Headset',
    name: 'SteelSeries Arctis 7P',
    description: 'Premium wireless gaming headset with lossless 2.4GHz connection and 24-hour battery life.',
    brand: 'SteelSeries',
    price: 149.99,
    mrp: 179.99,
    originalPrice: 179.99,
    discount: 17,
    stock: 65,
    images: [
      'https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.5,
    numReviews: 567
  },
  {
    title: 'Corsair K95 RGB Platinum Keyboard',
    name: 'Corsair K95 RGB',
    description: 'Mechanical gaming keyboard with Cherry MX switches, dedicated macro keys, and dynamic RGB backlighting.',
    brand: 'Corsair',
    price: 199.99,
    mrp: 249.99,
    originalPrice: 249.99,
    discount: 20,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.7,
    numReviews: 389
  },
  {
    title: 'Fitbit Versa 4 Fitness Smartwatch',
    name: 'Fitbit Versa 4',
    description: 'Advanced fitness tracking, built-in GPS, 6+ day battery life, and comprehensive health insights.',
    brand: 'Fitbit',
    price: 199.99,
    mrp: 229.99,
    originalPrice: 229.99,
    discount: 13,
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.3,
    numReviews: 678
  },
  {
    title: 'GoPro HERO12 Black Action Camera',
    name: 'GoPro HERO12',
    description: 'Ultimate action camera with 5.3K video, advanced stabilization, and rugged waterproof design.',
    brand: 'GoPro',
    price: 399.99,
    mrp: 449.99,
    originalPrice: 449.99,
    discount: 11,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.8,
    numReviews: 445
  }
];

// Connect to MongoDB and seed products
const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/luxify');
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Added ${createdProducts.length} sample products`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedProducts();
