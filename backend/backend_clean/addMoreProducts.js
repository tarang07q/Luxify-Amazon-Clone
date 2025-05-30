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

// BATCH 3: Home & Garden Products (20 products)
const homeGardenProducts = [
  {
    title: 'KitchenAid Stand Mixer - Artisan Series',
    name: 'KitchenAid Stand Mixer',
    description: 'Professional-grade stand mixer with 5-quart bowl, 10 speeds, and multiple attachments included.',
    brand: 'KitchenAid',
    price: 379.99,
    mrp: 429.99,
    originalPrice: 429.99,
    discount: 12,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Home & Garden',
    featured: true,
    rating: 4.8,
    numReviews: 1234
  },
  {
    title: 'Dyson V15 Detect Cordless Vacuum',
    name: 'Dyson V15 Vacuum',
    description: 'Advanced cordless vacuum with laser dust detection and powerful suction technology.',
    brand: 'Dyson',
    price: 649.99,
    mrp: 749.99,
    originalPrice: 749.99,
    discount: 13,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Home & Garden',
    featured: true,
    rating: 4.7,
    numReviews: 567
  },
  {
    title: 'Ninja Foodi Personal Blender',
    name: 'Ninja Foodi Blender',
    description: 'Powerful personal blender with nutrient extraction technology, perfect for smoothies.',
    brand: 'Ninja',
    price: 79.99,
    mrp: 99.99,
    originalPrice: 99.99,
    discount: 18,
    stock: 75,
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: true,
    rating: 4.7,
    numReviews: 345
  },
  {
    title: 'Ralph Lauren Polo Shirt - Classic Fit',
    name: 'Ralph Lauren Polo',
    description: 'Timeless polo shirt with signature embroidered pony logo, made from soft cotton piqué.',
    brand: 'Ralph Lauren',
    price: 89.99,
    mrp: 109.99,
    originalPrice: 109.99,
    discount: 18,
    stock: 120,
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: false,
    rating: 4.4,
    numReviews: 789
  },
  {
    title: 'Zara Tailored Blazer - Women\'s',
    name: 'Zara Blazer',
    description: 'Elegant tailored blazer with structured shoulders and classic lapels, perfect for professional wear.',
    brand: 'Zara',
    price: 129.99,
    mrp: 159.99,
    originalPrice: 159.99,
    discount: 19,
    stock: 85,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: true,
    rating: 4.6,
    numReviews: 456
  },
  {
    title: 'H&M Organic Cotton T-Shirt - Basic Tee',
    name: 'H&M Basic Tee',
    description: 'Soft organic cotton t-shirt in classic fit, available in multiple colors.',
    brand: 'H&M',
    price: 12.99,
    mrp: 19.99,
    originalPrice: 19.99,
    discount: 35,
    stock: 300,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: false,
    rating: 4.2,
    numReviews: 2345
  },
  {
    title: 'Converse Chuck Taylor All Star High Top',
    name: 'Converse Chuck Taylor',
    description: 'Iconic canvas sneakers with rubber toe cap and classic star logo, timeless style.',
    brand: 'Converse',
    price: 65.99,
    mrp: 79.99,
    originalPrice: 79.99,
    discount: 17,
    stock: 180,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: false,
    rating: 4.5,
    numReviews: 1567
  },
  {
    title: 'Uniqlo Heattech Ultra Warm Crew Neck Long Sleeve T-Shirt',
    name: 'Uniqlo Heattech',
    description: 'Advanced thermal underwear with moisture-wicking and heat-retaining technology.',
    brand: 'Uniqlo',
    price: 29.99,
    mrp: 39.99,
    originalPrice: 39.99,
    discount: 25,
    stock: 250,
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: false,
    rating: 4.3,
    numReviews: 678
  },
  {
    title: 'Tommy Hilfiger Denim Jacket - Classic Blue',
    name: 'Tommy Hilfiger Denim Jacket',
    description: 'Classic denim jacket with signature Tommy Hilfiger styling and premium cotton construction.',
    brand: 'Tommy Hilfiger',
    price: 119.99,
    mrp: 149.99,
    originalPrice: 149.99,
    discount: 20,
    stock: 90,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: true,
    rating: 4.6,
    numReviews: 234
  },
  {
    title: 'Vans Old Skool Sneakers - Black/White',
    name: 'Vans Old Skool',
    description: 'Classic skate shoes with durable canvas and suede uppers, waffle outsole for grip.',
    brand: 'Vans',
    price: 69.99,
    mrp: 84.99,
    originalPrice: 84.99,
    discount: 18,
    stock: 160,
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: false,
    rating: 4.4,
    numReviews: 890
  },
  {
    title: 'Calvin Klein Underwear - Cotton Classics',
    name: 'Calvin Klein Underwear',
    description: 'Premium cotton underwear with iconic waistband, comfortable fit and breathable fabric.',
    brand: 'Calvin Klein',
    price: 24.99,
    mrp: 34.99,
    originalPrice: 34.99,
    discount: 29,
    stock: 400,
    images: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: false,
    rating: 4.3,
    numReviews: 1234
  },
  {
    title: 'North Face Venture 2 Rain Jacket',
    name: 'North Face Rain Jacket',
    description: 'Waterproof and breathable rain jacket with adjustable hood, perfect for outdoor adventures.',
    brand: 'The North Face',
    price: 99.99,
    mrp: 129.99,
    originalPrice: 129.99,
    discount: 23,
    stock: 70,
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: false,
    rating: 4.5,
    numReviews: 567
  },
  {
    title: 'Gucci Ace Leather Sneakers - White',
    name: 'Gucci Ace Sneakers',
    description: 'Luxury leather sneakers with signature green and red stripe, premium Italian craftsmanship.',
    brand: 'Gucci',
    price: 590.99,
    mrp: 650.99,
    originalPrice: 650.99,
    discount: 9,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: true,
    rating: 4.8,
    numReviews: 123
  },
  {
    title: 'Lululemon Align High-Rise Pant - Women\'s',
    name: 'Lululemon Align Pants',
    description: 'Buttery-soft yoga pants with four-way stretch, perfect for yoga and everyday wear.',
    brand: 'Lululemon',
    price: 128.99,
    mrp: 148.99,
    originalPrice: 148.99,
    discount: 13,
    stock: 110,
    images: [
      'https://images.unsplash.com/photo-1506629905607-c52b1b8e8d19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: true,
    rating: 4.7,
    numReviews: 789
  },
  {
    title: 'Carhartt Work Pants - Durable Canvas',
    name: 'Carhartt Work Pants',
    description: 'Heavy-duty work pants with reinforced knees, multiple pockets, and durable construction.',
    brand: 'Carhartt',
    price: 79.99,
    mrp: 99.99,
    originalPrice: 99.99,
    discount: 20,
    stock: 140,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: false,
    rating: 4.6,
    numReviews: 456
  },
  {
    title: 'Patagonia Baggies Shorts 5" - Men\'s',
    name: 'Patagonia Baggies Shorts',
    description: 'Versatile shorts made from recycled nylon, quick-drying and perfect for water activities.',
    brand: 'Patagonia',
    price: 59.99,
    mrp: 69.99,
    originalPrice: 69.99,
    discount: 14,
    stock: 130,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: false,
    rating: 4.4,
    numReviews: 345
  },
  {
    title: 'Allbirds Tree Runners - Sustainable Sneakers',
    name: 'Allbirds Tree Runners',
    description: 'Eco-friendly sneakers made from eucalyptus tree fiber, incredibly comfortable and sustainable.',
    brand: 'Allbirds',
    price: 98.99,
    mrp: 118.99,
    originalPrice: 118.99,
    discount: 17,
    stock: 95,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: false,
    rating: 4.5,
    numReviews: 678
  },
  {
    title: 'Everlane Cashmere Crew Sweater',
    name: 'Everlane Cashmere Sweater',
    description: 'Luxurious 100% cashmere sweater with classic crew neck, soft and warm.',
    brand: 'Everlane',
    price: 168.99,
    mrp: 198.99,
    originalPrice: 198.99,
    discount: 15,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: true,
    rating: 4.8,
    numReviews: 234
  },
  {
    title: 'Reformation Midi Dress - Floral Print',
    name: 'Reformation Midi Dress',
    description: 'Sustainable midi dress with beautiful floral print, made from eco-friendly materials.',
    brand: 'Reformation',
    price: 218.99,
    mrp: 248.99,
    originalPrice: 248.99,
    discount: 12,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: true,
    rating: 4.6,
    numReviews: 189
  },
  {
    title: 'Supreme Box Logo Hoodie - Limited Edition',
    name: 'Supreme Box Logo Hoodie',
    description: 'Iconic streetwear hoodie with classic box logo, premium cotton fleece construction.',
    brand: 'Supreme',
    price: 398.99,
    mrp: 450.99,
    originalPrice: 450.99,
    discount: 12,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: true,
    rating: 4.9,
    numReviews: 567
  }
];

// Connect to MongoDB and add products
const addClothingProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/luxify');
    console.log('✅ Connected to MongoDB');

    // Insert clothing products
    const createdProducts = await Product.insertMany(clothingProducts);
    console.log(`✅ Added ${createdProducts.length} clothing products`);

    console.log('🎉 Clothing products added successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error adding products:', error);
    process.exit(1);
  }
};

// Run the function
addClothingProducts();
