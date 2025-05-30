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

// Mixed Categories - Books, Beauty, Sports, Toys (40 products)
const finalBatchProducts = [
  // Books (10 products)
  {
    title: 'The Psychology of Money by Morgan Housel',
    name: 'Psychology of Money',
    description: 'Timeless lessons on wealth, greed, and happiness from one of the most important financial books.',
    brand: 'Harriman House',
    price: 16.99,
    mrp: 19.99,
    originalPrice: 19.99,
    discount: 15,
    stock: 200,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Books',
    featured: true,
    rating: 4.8,
    numReviews: 2345
  },
  {
    title: 'Atomic Habits by James Clear',
    name: 'Atomic Habits',
    description: 'An easy and proven way to build good habits and break bad ones.',
    brand: 'Avery',
    price: 14.99,
    mrp: 18.99,
    originalPrice: 18.99,
    discount: 21,
    stock: 300,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Books',
    featured: true,
    rating: 4.9,
    numReviews: 5678
  },
  {
    title: 'Educated by Tara Westover',
    name: 'Educated',
    description: 'A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD.',
    brand: 'Random House',
    price: 13.99,
    mrp: 17.99,
    originalPrice: 17.99,
    discount: 22,
    stock: 150,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Books',
    featured: false,
    rating: 4.7,
    numReviews: 1234
  },
  {
    title: 'The Seven Husbands of Evelyn Hugo',
    name: 'Seven Husbands Evelyn Hugo',
    description: 'A reclusive Hollywood icon finally tells her story in this captivating novel.',
    brand: 'Atria Books',
    price: 12.99,
    mrp: 16.99,
    originalPrice: 16.99,
    discount: 24,
    stock: 180,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Books',
    featured: false,
    rating: 4.6,
    numReviews: 3456
  },
  {
    title: 'Dune by Frank Herbert',
    name: 'Dune',
    description: 'The epic science fiction masterpiece set on the desert planet Arrakis.',
    brand: 'Ace Books',
    price: 15.99,
    mrp: 19.99,
    originalPrice: 19.99,
    discount: 20,
    stock: 120,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Books',
    featured: true,
    rating: 4.8,
    numReviews: 2789
  },
  
  // Beauty Products (10 products)
  {
    title: 'Fenty Beauty Pro Filt\'r Foundation',
    name: 'Fenty Beauty Foundation',
    description: 'Long-wearing, buildable foundation with medium to full coverage in 50 shades.',
    brand: 'Fenty Beauty',
    price: 39.99,
    mrp: 44.99,
    originalPrice: 44.99,
    discount: 11,
    stock: 150,
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Beauty',
    featured: true,
    rating: 4.7,
    numReviews: 1567
  },
  {
    title: 'The Ordinary Niacinamide 10% + Zinc 1%',
    name: 'The Ordinary Niacinamide',
    description: 'High-strength vitamin and mineral blemish formula for clearer skin.',
    brand: 'The Ordinary',
    price: 7.99,
    mrp: 9.99,
    originalPrice: 9.99,
    discount: 20,
    stock: 300,
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Beauty',
    featured: false,
    rating: 4.5,
    numReviews: 2345
  },
  {
    title: 'Charlotte Tilbury Pillow Talk Lipstick',
    name: 'Charlotte Tilbury Lipstick',
    description: 'Iconic matte lipstick in the universally flattering Pillow Talk shade.',
    brand: 'Charlotte Tilbury',
    price: 38.99,
    mrp: 42.99,
    originalPrice: 42.99,
    discount: 9,
    stock: 100,
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Beauty',
    featured: true,
    rating: 4.8,
    numReviews: 890
  },
  {
    title: 'Drunk Elephant C-Firma Day Serum',
    name: 'Drunk Elephant Vitamin C',
    description: 'Potent vitamin C day serum that firms, brightens, and improves signs of photoaging.',
    brand: 'Drunk Elephant',
    price: 78.99,
    mrp: 89.99,
    originalPrice: 89.99,
    discount: 12,
    stock: 80,
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Beauty',
    featured: false,
    rating: 4.6,
    numReviews: 567
  },
  {
    title: 'Rare Beauty Soft Pinch Liquid Blush',
    name: 'Rare Beauty Blush',
    description: 'Weightless, long-lasting liquid blush that blends seamlessly for a natural flush.',
    brand: 'Rare Beauty',
    price: 22.99,
    mrp: 26.99,
    originalPrice: 26.99,
    discount: 15,
    stock: 120,
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Beauty',
    featured: true,
    rating: 4.7,
    numReviews: 1234
  },
  
  // Sports Products (10 products)
  {
    title: 'Peloton Bike+ Indoor Exercise Bike',
    name: 'Peloton Bike+',
    description: 'Premium indoor cycling bike with rotating HD touchscreen and live classes.',
    brand: 'Peloton',
    price: 2495.99,
    mrp: 2795.99,
    originalPrice: 2795.99,
    discount: 11,
    stock: 15,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Sports',
    featured: true,
    rating: 4.8,
    numReviews: 456
  },
  {
    title: 'Yeti Rambler 20oz Tumbler',
    name: 'Yeti Rambler Tumbler',
    description: 'Double-wall vacuum insulated tumbler that keeps drinks hot or cold for hours.',
    brand: 'Yeti',
    price: 34.99,
    mrp: 39.99,
    originalPrice: 39.99,
    discount: 13,
    stock: 200,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Sports',
    featured: false,
    rating: 4.7,
    numReviews: 1890
  },
  {
    title: 'Wilson Pro Staff Tennis Racket',
    name: 'Wilson Pro Staff Racket',
    description: 'Professional tennis racket used by top players, precision and power combined.',
    brand: 'Wilson',
    price: 249.99,
    mrp: 299.99,
    originalPrice: 299.99,
    discount: 17,
    stock: 45,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Sports',
    featured: false,
    rating: 4.6,
    numReviews: 234
  },
  {
    title: 'Hydro Flask Water Bottle 32oz',
    name: 'Hydro Flask 32oz',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours.',
    brand: 'Hydro Flask',
    price: 44.99,
    mrp: 49.99,
    originalPrice: 49.99,
    discount: 10,
    stock: 150,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Sports',
    featured: true,
    rating: 4.8,
    numReviews: 2345
  },
  {
    title: 'Bowflex SelectTech 552 Dumbbells',
    name: 'Bowflex SelectTech Dumbbells',
    description: 'Adjustable dumbbells that replace 15 sets of weights, 5 to 52.5 lbs per dumbbell.',
    brand: 'Bowflex',
    price: 399.99,
    mrp: 499.99,
    originalPrice: 499.99,
    discount: 20,
    stock: 25,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Sports',
    featured: true,
    rating: 4.7,
    numReviews: 567
  },
  
  // Toys (10 products)
  {
    title: 'LEGO Creator Expert Taj Mahal',
    name: 'LEGO Taj Mahal',
    description: 'Detailed LEGO replica of the iconic Taj Mahal with over 5900 pieces.',
    brand: 'LEGO',
    price: 369.99,
    mrp: 399.99,
    originalPrice: 399.99,
    discount: 8,
    stock: 30,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Toys',
    featured: true,
    rating: 4.9,
    numReviews: 234
  },
  {
    title: 'Barbie Dreamhouse Playset',
    name: 'Barbie Dreamhouse',
    description: 'Three-story dollhouse with elevator, lights, sounds, and over 70 accessories.',
    brand: 'Mattel',
    price: 199.99,
    mrp: 249.99,
    originalPrice: 249.99,
    discount: 20,
    stock: 50,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Toys',
    featured: false,
    rating: 4.6,
    numReviews: 890
  },
  {
    title: 'Hot Wheels Ultimate Garage Playset',
    name: 'Hot Wheels Ultimate Garage',
    description: 'Multi-level garage with car elevator, loops, and space for over 140 cars.',
    brand: 'Hot Wheels',
    price: 149.99,
    mrp: 179.99,
    originalPrice: 179.99,
    discount: 17,
    stock: 40,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Toys',
    featured: false,
    rating: 4.5,
    numReviews: 567
  },
  {
    title: 'Nerf Elite 2.0 Commander Blaster',
    name: 'Nerf Elite Commander',
    description: 'High-performance dart blaster with customizable features and tactical accessories.',
    brand: 'Nerf',
    price: 29.99,
    mrp: 34.99,
    originalPrice: 34.99,
    discount: 14,
    stock: 100,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Toys',
    featured: true,
    rating: 4.4,
    numReviews: 1234
  },
  {
    title: 'Monopoly Classic Board Game',
    name: 'Monopoly Classic',
    description: 'The classic property trading game that has been bringing families together for generations.',
    brand: 'Hasbro',
    price: 19.99,
    mrp: 24.99,
    originalPrice: 24.99,
    discount: 20,
    stock: 200,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    category: 'Toys',
    featured: false,
    rating: 4.3,
    numReviews: 2345
  }
];

const addFinalBatch = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/luxify');
    console.log('✅ Connected to MongoDB');

    const createdProducts = await Product.insertMany(finalBatchProducts);
    console.log(`✅ Added ${createdProducts.length} products from multiple categories`);

    console.log('🎉 Final batch added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding products:', error);
    process.exit(1);
  }
};

addFinalBatch();
