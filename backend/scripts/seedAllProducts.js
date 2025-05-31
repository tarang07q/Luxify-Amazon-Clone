const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import the Product model from the main models directory
const Product = require('../models/Product');
const User = require('../models/User');

// Sample products data (combined from all sources)
const sampleProducts = [
  // --- ELECTRONICS (at least 15) ---
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
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.8,
    numReviews: 125,
    createdAt: new Date('2024-06-01T10:00:00Z')
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
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.7,
    numReviews: 89,
    createdAt: new Date('2024-06-02T10:00:00Z')
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
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.9,
    numReviews: 67,
    createdAt: new Date('2024-06-03T10:00:00Z')
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
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.6,
    numReviews: 234,
    createdAt: new Date('2024-06-04T10:00:00Z')
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
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    featured: false,
    rating: 4.4,
    numReviews: 156,
    createdAt: new Date('2024-06-05T10:00:00Z')
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
    numReviews: 892,
    createdAt: new Date('2024-06-06T10:00:00Z')
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
    numReviews: 1024,
    createdAt: new Date('2024-06-07T10:00:00Z')
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
    numReviews: 445,
    createdAt: new Date('2024-06-08T10:00:00Z')
  },
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
    numReviews: 892,
    createdAt: new Date('2024-06-09T10:00:00Z')
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
    numReviews: 234,
    createdAt: new Date('2024-06-10T10:00:00Z')
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
    numReviews: 156,
    createdAt: new Date('2024-06-11T10:00:00Z')
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
    numReviews: 445,
    createdAt: new Date('2024-06-12T10:00:00Z')
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
    numReviews: 678,
    createdAt: new Date('2024-06-13T10:00:00Z')
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
    numReviews: 523,
    createdAt: new Date('2024-06-14T10:00:00Z')
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
    numReviews: 289,
    createdAt: new Date('2024-06-15T10:00:00Z')
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
    numReviews: 756,
    createdAt: new Date('2024-06-16T10:00:00Z')
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
    numReviews: 1234,
    createdAt: new Date('2024-06-17T10:00:00Z')
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
    numReviews: 345,
    createdAt: new Date('2024-06-18T10:00:00Z')
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
    numReviews: 423,
    createdAt: new Date('2024-06-19T10:00:00Z')
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
    numReviews: 1567,
    createdAt: new Date('2024-06-20T10:00:00Z')
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
    numReviews: 789,
    createdAt: new Date('2024-06-21T10:00:00Z')
  },
  {
    title: 'Logitech MX Master 3S Wireless Mouse',
    name: 'Logitech MX Master 3S',
    description: 'Advanced wireless mouse for productivity and gaming.',
    brand: 'Logitech',
    price: 99.99,
    mrp: 119.99,
    originalPrice: 119.99,
    discount: 17,
    stock: 120,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80'],
    category: 'Electronics',
    featured: true,
    rating: 4.7,
    numReviews: 456,
    createdAt: new Date('2024-06-22T10:00:00Z')
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
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.6,
    numReviews: 234,
    createdAt: new Date('2024-06-23T10:00:00Z')
  },
  {
    title: 'Apple Magic Keyboard',
    name: 'Apple Magic Keyboard',
    description: 'Wireless keyboard with numeric keypad, rechargeable battery, and sleek design.',
    brand: 'Apple',
    price: 129.99,
    mrp: 149.99,
    originalPrice: 149.99,
    discount: 13,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.8,
    numReviews: 900,
    createdAt: new Date('2024-06-24T10:00:00Z')
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
      'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.5,
    numReviews: 567,
    createdAt: new Date('2024-06-25T10:00:00Z')
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
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.7,
    numReviews: 389,
    createdAt: new Date('2024-06-26T10:00:00Z')
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
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.3,
    numReviews: 678,
    createdAt: new Date('2024-06-27T10:00:00Z')
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
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: true,
    rating: 4.8,
    numReviews: 445,
    createdAt: new Date('2024-06-28T10:00:00Z')
  },
  // --- FASHION (at least 10) ---
  {
    title: "Levi's 511 Slim Fit Jeans",
    name: "Levi's 511",
    description: 'Modern slim fit jeans with stretch for comfort.',
    brand: "Levi's",
    price: 69.99,
    mrp: 89.99,
    originalPrice: 89.99,
    discount: 22,
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Fashion',
    featured: false,
    rating: 4.6,
    numReviews: 1100,
    createdAt: new Date('2024-06-29T10:00:00Z')
  },
  {
    title: 'Ray-Ban Wayfarer Sunglasses',
    name: 'Ray-Ban Wayfarer',
    description: 'Iconic sunglasses with UV protection and classic style.',
    brand: 'Ray-Ban',
    price: 129.99,
    mrp: 149.99,
    originalPrice: 149.99,
    discount: 13,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Fashion',
    featured: false,
    rating: 4.7,
    numReviews: 900,
    createdAt: new Date('2024-06-30T10:00:00Z')
  },
  // --- HOME & KITCHEN (at least 10) ---
  {
    title: 'Dyson Pure Cool Air Purifier',
    name: 'Dyson Pure Cool',
    description: 'Advanced air purifier and fan with HEPA filter.',
    brand: 'Dyson',
    price: 399.99,
    mrp: 499.99,
    originalPrice: 499.99,
    discount: 20,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1503389152951-9c3d0c6b7a5c?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Home & Kitchen',
    featured: true,
    rating: 4.8,
    numReviews: 500,
    createdAt: new Date('2024-07-01T10:00:00Z')
  },
  {
    title: 'Instant Pot Duo Evo Plus',
    name: 'Instant Pot Duo Evo',
    description: '10-in-1 multi-use programmable pressure cooker.',
    brand: 'Instant Pot',
    price: 119.99,
    mrp: 139.99,
    originalPrice: 139.99,
    discount: 14,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Home & Kitchen',
    featured: false,
    rating: 4.7,
    numReviews: 800,
    createdAt: new Date('2024-07-02T10:00:00Z')
  },
  // --- BOOKS (at least 10) ---
  {
    title: 'Atomic Habits',
    name: 'Atomic Habits',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear.',
    brand: 'Penguin',
    price: 16.99,
    mrp: 20.99,
    originalPrice: 20.99,
    discount: 19,
    stock: 200,
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Books',
    featured: false,
    rating: 4.9,
    numReviews: 15000,
    createdAt: new Date('2024-07-03T10:00:00Z')
  },
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    name: 'The Subtle Art',
    description: 'A Counterintuitive Approach to Living a Good Life by Mark Manson.',
    brand: 'HarperOne',
    price: 14.99,
    mrp: 18.99,
    originalPrice: 18.99,
    discount: 21,
    stock: 180,
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Books',
    featured: false,
    rating: 4.8,
    numReviews: 12000,
    createdAt: new Date('2024-07-04T10:00:00Z')
  },
  // --- SPORTS & OUTDOORS (at least 10) ---
  {
    title: 'Wilson Evolution Basketball',
    name: 'Wilson Evolution',
    description: 'Official size indoor basketball with superior grip and feel.',
    brand: 'Wilson',
    price: 59.99,
    mrp: 69.99,
    originalPrice: 69.99,
    discount: 14,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Sports & Outdoors',
    featured: false,
    rating: 4.7,
    numReviews: 900,
    createdAt: new Date('2024-07-05T10:00:00Z')
  },
  {
    title: 'Adidas Predator Soccer Ball',
    name: 'Adidas Predator Ball',
    description: 'FIFA quality pro soccer ball for training and matches.',
    brand: 'Adidas',
    price: 39.99,
    mrp: 49.99,
    originalPrice: 49.99,
    discount: 20,
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1505843273132-b09c3d6c3c1c?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Sports & Outdoors',
    featured: false,
    rating: 4.6,
    numReviews: 700,
    createdAt: new Date('2024-07-06T10:00:00Z')
  },
  // --- BEAUTY & PERSONAL CARE (at least 10) ---
  {
    title: 'Philips Norelco Multigroom Trimmer',
    name: 'Philips Multigroom',
    description: 'All-in-one trimmer for beard, hair, and body.',
    brand: 'Philips',
    price: 29.99,
    mrp: 39.99,
    originalPrice: 39.99,
    discount: 25,
    stock: 90,
    images: [
      'https://images.unsplash.com/photo-1515378791036-4c8f8e92946d?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Beauty & Personal Care',
    featured: false,
    rating: 4.5,
    numReviews: 600,
    createdAt: new Date('2024-07-07T10:00:00Z')
  },
  {
    title: 'Revlon One-Step Hair Dryer',
    name: 'Revlon Hair Dryer',
    description: 'Volumizer hot air brush for styling and drying.',
    brand: 'Revlon',
    price: 49.99,
    mrp: 59.99,
    originalPrice: 59.99,
    discount: 17,
    stock: 70,
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Beauty & Personal Care',
    featured: false,
    rating: 4.6,
    numReviews: 800,
    createdAt: new Date('2024-07-08T10:00:00Z')
  },
  // --- AUTOMOTIVE (at least 10) ---
  {
    title: "Meguiar's Ultimate Car Wash & Wax",
    name: "Meguiar's Car Wash",
    description: 'Premium car wash and wax for a deep clean and shine.',
    brand: "Meguiar's",
    price: 19.99,
    mrp: 24.99,
    originalPrice: 24.99,
    discount: 20,
    stock: 100,
    images: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Automotive',
    featured: false,
    rating: 4.7,
    numReviews: 500,
    createdAt: new Date('2024-07-09T10:00:00Z')
  },
  {
    title: 'Armor All Car Interior Cleaner',
    name: 'Armor All Cleaner',
    description: 'All-in-one car interior cleaner for dashboard, seats, and more.',
    brand: 'Armor All',
    price: 12.99,
    mrp: 15.99,
    originalPrice: 15.99,
    discount: 19,
    stock: 120,
    images: [
      'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Automotive',
    featured: false,
    rating: 4.5,
    numReviews: 400,
    createdAt: new Date('2024-07-10T10:00:00Z')
  },
  // --- TOYS & GAMES (at least 10) ---
  {
    title: 'LEGO Classic Bricks Set',
    name: 'LEGO Classic',
    description: 'Creative building blocks for kids and adults.',
    brand: 'LEGO',
    price: 29.99,
    mrp: 34.99,
    originalPrice: 34.99,
    discount: 14,
    stock: 200,
    images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Toys & Games',
    featured: false,
    rating: 4.8,
    numReviews: 2000,
    createdAt: new Date('2024-07-11T10:00:00Z')
  },
  {
    title: 'Hasbro Monopoly Board Game',
    name: 'Monopoly',
    description: 'Classic family board game for 2-6 players.',
    brand: 'Hasbro',
    price: 19.99,
    mrp: 24.99,
    originalPrice: 24.99,
    discount: 20,
    stock: 150,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Toys & Games',
    featured: false,
    rating: 4.7,
    numReviews: 1800,
    createdAt: new Date('2024-07-12T10:00:00Z')
  },
  {
    title: 'KONG Classic Dog Toy',
    name: 'KONG Dog Toy',
    description: 'Durable rubber toy for chewing and fetching.',
    brand: 'KONG',
    price: 13.99,
    mrp: 16.99,
    originalPrice: 16.99,
    discount: 18,
    stock: 90,
    images: [
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Pet Supplies',
    featured: false,
    rating: 4.8,
    numReviews: 900,
    createdAt: new Date('2024-07-13T10:00:00Z')
  },
  {
    title: 'Purina ONE SmartBlend Dog Food',
    name: 'Purina ONE Dog Food',
    description: 'High-protein dry dog food for adult dogs.',
    brand: 'Purina',
    price: 34.99,
    mrp: 39.99,
    originalPrice: 39.99,
    discount: 13,
    stock: 70,
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Pet Supplies',
    featured: false,
    rating: 4.7,
    numReviews: 700,
    createdAt: new Date('2024-07-14T10:00:00Z')
  },
  // --- PET SUPPLIES (at least 10) ---
  {
    title: 'Starbucks Pike Place Roast Coffee',
    name: 'Starbucks Pike Place',
    description: 'Medium roast ground coffee, smooth and balanced.',
    brand: 'Starbucks',
    price: 12.99,
    mrp: 15.99,
    originalPrice: 15.99,
    discount: 19,
    stock: 100,
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Grocery',
    featured: false,
    rating: 4.6,
    numReviews: 600,
    createdAt: new Date('2024-07-15T10:00:00Z')
  },
  {
    title: 'Nature Valley Crunchy Granola Bars',
    name: 'Nature Valley Granola Bars',
    description: 'Oats & Honey crunchy granola bars, 12 count.',
    brand: 'Nature Valley',
    price: 4.99,
    mrp: 6.99,
    originalPrice: 6.99,
    discount: 29,
    stock: 200,
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Grocery',
    featured: false,
    rating: 4.5,
    numReviews: 400,
    createdAt: new Date('2024-07-16T10:00:00Z')
  },
  // --- CLOTHING (at least 10) ---
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
    numReviews: 445,
    createdAt: new Date('2024-07-17T10:00:00Z')
  },
  // --- HOME & GARDEN (at least 10) ---
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
    numReviews: 892,
    createdAt: new Date('2024-07-18T10:00:00Z')
  },
  // --- HEALTH (at least 10) ---
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
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    featured: false,
    rating: 4.3,
    numReviews: 678,
    createdAt: new Date('2024-07-19T10:00:00Z')
  },
  // --- FOOD (at least 10) ---
  {
    title: 'Starbucks Pike Place Roast Coffee',
    name: 'Starbucks Pike Place',
    description: 'Medium roast ground coffee, smooth and balanced.',
    brand: 'Starbucks',
    price: 12.99,
    mrp: 15.99,
    originalPrice: 15.99,
    discount: 19,
    stock: 100,
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Grocery',
    featured: false,
    rating: 4.6,
    numReviews: 600,
    createdAt: new Date('2024-07-20T10:00:00Z')
  },
  {
    title: 'Nature Valley Crunchy Granola Bars',
    name: 'Nature Valley Granola Bars',
    description: 'Oats & Honey crunchy granola bars, 12 count.',
    brand: 'Nature Valley',
    price: 4.99,
    mrp: 6.99,
    originalPrice: 6.99,
    discount: 29,
    stock: 200,
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Grocery',
    featured: false,
    rating: 4.5,
    numReviews: 400,
    createdAt: new Date('2024-07-21T10:00:00Z')
  }
];

const categories = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Books',
  'Sports & Outdoors',
  'Beauty & Personal Care',
  'Automotive',
  'Toys & Games',
  'Pet Supplies',
  'Grocery',
  'Clothing',
  'Home & Garden',
  'Health',
  'Food'
];

const searchTerms = ['mouse', 'keyboard', 'laptop', 'shoes', 'book', 'bottle', 'bag', 'camera', 'headphones', 'watch', 'toy', 'car', 'lamp', 'sofa', 't-shirt', 'pants', 'jacket', 'blender', 'mixer', 'grill', 'bike', 'ball', 'doll', 'dog', 'cat', 'snack', 'cereal', 'juice', 'milk', 'tea', 'coffee'];

// Category to image mapping for generated products
const categoryImages = {
  'Electronics': [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80'
  ],
  'Fashion': [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80'
  ],
  'Home & Kitchen': [
    'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1503389152951-9c3d0c6b7a5c?auto=format&fit=crop&w=1000&q=80'
  ],
  'Books': [
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80'
  ],
  'Sports & Outdoors': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1000&q=80',
  'Beauty & Personal Care': 'https://images.unsplash.com/photo-1515378791036-4c8f8e92946d?auto=format&fit=crop&w=1000&q=80',
  'Automotive': 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=80',
  'Toys & Games': 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1000&q=80',
  'Pet Supplies': 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1000&q=80',
  'Grocery': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
  'Clothing': 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80',
  'Home & Garden': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80',
  'Health': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1000&q=80',
  'Food': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
};

// Product type to image mapping for generated products
const productTypeImages = {
  mouse: [
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80',
    'https://resource.logitech.com/w_1200,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-top-view-graphite.png?v=1'
  ],
  keyboard: [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80'
  ],
  laptop: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    'https://i.dell.com/sites/csimages/Video_Imagery/all/xps-13-9300-laptop.jpg'
  ],
  shoes: [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80',
    'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/6b6e2e2e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/air-max-270-mens-shoes-KkLcGR.png',
    'https://assets.adidas.com/images/w_600,f_auto,q_auto/0c7e2e2e2e2e2e2e2e2e2e2e2e2e2e2e_9366/Ultraboost_22_Shoes_Black_GX5462_01_standard.jpg'
  ],
  book: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
  bottle: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
  bag: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
  camera: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1000&q=80',
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
  watch: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1000&q=80',
  toy: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1000&q=80',
  car: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=80',
  lamp: 'https://images.unsplash.com/photo-1503389152951-9c3d0c6b7a5c?auto=format&fit=crop&w=1000&q=80',
  sofa: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80',
  't-shirt': 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80',
  pants: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80',
  jacket: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80',
  blender: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1000&q=80',
  mixer: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1000&q=80',
  grill: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1000&q=80',
  bike: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1000&q=80',
  ball: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1000&q=80',
  doll: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1000&q=80',
  dog: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1000&q=80',
  cat: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1000&q=80',
  snack: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
  cereal: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
  juice: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
  milk: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
  tea: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
  coffee: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
};

// Curated keyword-to-image mapping for real product images
const keywordImageMap = [
  { keyword: 'Logitech Mouse', urls: [
    'https://resource.logitech.com/w_1200,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-top-view-graphite.png?v=1',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80'
  ] },
  { keyword: 'Apple iPhone', urls: [
    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch-blue-titanium?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923777972',
    'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  ] },
  { keyword: 'Nike Shoes', urls: [
    'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/6b6e2e2e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/air-max-270-mens-shoes-KkLcGR.png',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  ] },
  { keyword: 'Canon Camera', urls: [
    'https://static.bhphoto.com/images/images500x500/canon_eos_r5_mirrorless_digital_1594227986_1575636.jpg',
    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1000&q=80'
  ] },
  { keyword: 'Sony Headphones', urls: [
    'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'
  ] },
  { keyword: 'Dell Laptop', urls: [
    'https://i.dell.com/sites/csimages/Video_Imagery/all/xps-13-9300-laptop.jpg',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80'
  ] },
  { keyword: 'Adidas Shoes', urls: [
    'https://assets.adidas.com/images/w_600,f_auto,q_auto/0c7e2e2e2e2e2e2e2e2e2e2e2e2e2e2e_9366/Ultraboost_22_Shoes_Black_GX5462_01_standard.jpg',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80'
  ] },
  { keyword: 'Kindle', urls: [
    'https://m.media-amazon.com/images/I/61Iz2yy2CKL._AC_SL1000_.jpg',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80'
  ] },
  { keyword: 'MacBook', urls: [
    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1697309296342',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80'
  ] },
  { keyword: 'Samsung TV', urls: [
    'https://images.samsung.com/is/image/samsung/p6pim/in/ua65au8000klxl/gallery/in-uhd-au8000-ua65au8000klxl-530347601?$650_519_PNG$',
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80'
  ] },
  // ...add more as needed
];

function getRelevantImages(title, category, term) {
  // Try to match the most specific keyword first
  for (const entry of keywordImageMap) {
    if (title.toLowerCase().includes(entry.keyword.toLowerCase())) {
      return entry.urls;
    }
  }
  // Fallback to productTypeImages, then categoryImages
  if (productTypeImages[term]) return productTypeImages[term];
  if (categoryImages[category]) return categoryImages[category];
  return ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80']; // generic fallback
}

let generatedProducts = [];
categories.forEach((cat, cIdx) => {
  for (let i = 1; i <= 30; i++) {
    const term = searchTerms[(i + cIdx) % searchTerms.length];
    const title = `${cat} ${term.charAt(0).toUpperCase() + term.slice(1)} Model ${i}`;
    const imagesArr = getRelevantImages(title, cat, term);
    // Pick up to 5 images, shuffle for variety
    const shuffled = imagesArr.sort(() => 0.5 - Math.random());
    const selectedImages = shuffled.slice(0, Math.min(5, imagesArr.length));
    generatedProducts.push({
      title,
      name: `${term.charAt(0).toUpperCase() + term.slice(1)} ${i}`,
      description: `A high-quality ${term} for ${cat.toLowerCase()}. Perfect for your needs.`,
      brand: `${cat}Brand${i}`,
      price: 20 + Math.floor(Math.random() * 500),
      mrp: 30 + Math.floor(Math.random() * 600),
      originalPrice: 30 + Math.floor(Math.random() * 600),
      discount: Math.floor(Math.random() * 30),
      stock: 10 + Math.floor(Math.random() * 100),
      images: selectedImages,
      category: cat,
      featured: i <= 15,
      rating: 3.5 + Math.random() * 1.5,
      numReviews: Math.floor(Math.random() * 1000),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000))
    });
  }
});

const seedAllProducts = async () => {
  try {
    console.log('🚀 Starting comprehensive product seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Find or create admin user
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@luxify.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created');
    }

    // Add user reference to each product
    const allProducts = [...sampleProducts, ...generatedProducts].map(product => ({
      ...product,
      user: adminUser._id
    }));

    // Insert all products
    const createdProducts = await Product.insertMany(allProducts);
    console.log(`✅ Successfully seeded ${createdProducts.length} products`);

    // Update featured products based on rating
    await Product.updateMany(
      { rating: { $gte: 4.5 } },
      { featured: true }
    );

    const featuredCount = await Product.countDocuments({ featured: true });
    console.log(`⭐ Set ${featuredCount} products as featured`);

    // Display summary
    const categories = [...new Set(createdProducts.map(p => p.category))];
    console.log(`📊 Categories: ${categories.join(', ')}`);

    console.log('🎉 All products seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

// Run the seeding function
  seedAllProducts();

module.exports = { seedAllProducts };
