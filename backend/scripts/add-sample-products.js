require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/amazer')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample product data for each category
const sampleProducts = [
  // Electronics
  {
    title: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo.',
    price: 349.99,
    mrp: 399.99,
    discount: 50,
    stock: 50,
    category: 'Electronics',
    brand: 'Sony',
    rating: 4.8,
    numReviews: 203,
    images: ['/uploads/electronics/electronics-1.jpg', '/uploads/electronics/electronics-2.jpg']
  },
  {
    title: 'Samsung Galaxy S21 Ultra 5G',
    description: 'Pro-grade camera with 108MP, 100x Space Zoom, and 8K video. 5G connectivity for ultra-fast downloads and streaming.',
    price: 1199.99,
    mrp: 1299.99,
    discount: 100,
    stock: 30,
    category: 'Electronics',
    brand: 'Samsung',
    rating: 4.7,
    numReviews: 178,
    images: ['/uploads/electronics/electronics-3.jpg', '/uploads/electronics/electronics-4.jpg']
  },

  // Computers
  {
    title: 'Apple MacBook Pro 16-inch',
    description: 'Apple M1 Pro chip for a massive leap in CPU, GPU, and machine learning performance. Up to 21 hours of battery life.',
    price: 2499.99,
    mrp: 2699.99,
    discount: 7.4,
    stock: 25,
    category: 'Computers',
    brand: 'Apple',
    rating: 4.9,
    numReviews: 142,
    images: ['/uploads/computers/computers-1.jpg', '/uploads/computers/computers-2.jpg']
  },
  {
    title: 'Dell XPS 15 Laptop',
    description: 'InfinityEdge display with 100% Adobe RGB color. 11th Gen Intel Core processors and NVIDIA GeForce graphics.',
    price: 1799.99,
    mrp: 1999.99,
    discount: 10,
    stock: 20,
    category: 'Computers',
    brand: 'Dell',
    rating: 4.6,
    numReviews: 98,
    images: ['/uploads/computers/computers-3.jpg', '/uploads/computers/computers-4.jpg']
  },

  // Smart Home
  {
    title: 'Amazon Echo Show 10',
    description: 'HD smart display with motion, premium sound, and Alexa. Automatically moves to face you while you are interacting with Alexa.',
    price: 249.99,
    mrp: 279.99,
    discount: 30,
    stock: 40,
    category: 'Smart Home',
    brand: 'Amazon',
    rating: 4.5,
    numReviews: 112,
    images: ['/uploads/smart-home/smart-home-1.jpg', '/uploads/smart-home/smart-home-2.jpg']
  },
  {
    title: 'Google Nest Learning Thermostat',
    description: 'Programs itself. Then pays for itself. The Nest Learning Thermostat automatically adapts to your life and the seasons.',
    price: 249.99,
    mrp: 279.99,
    discount: 30,
    stock: 35,
    category: 'Smart Home',
    brand: 'Google',
    rating: 4.7,
    numReviews: 89,
    images: ['/uploads/smart-home/smart-home-3.jpg', '/uploads/smart-home/smart-home-4.jpg']
  },

  // Home & Kitchen
  {
    title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    description: '7-in-1 appliance: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.',
    price: 89.99,
    mrp: 119.99,
    discount: 30,
    stock: 60,
    category: 'Home & Kitchen',
    brand: 'Instant Pot',
    rating: 4.8,
    numReviews: 321,
    images: ['/uploads/home-&-kitchen/home-&-kitchen-1.jpg', '/uploads/home-&-kitchen/home-&-kitchen-2.jpg']
  },
  {
    title: 'Ninja Foodi 5-in-1 Indoor Grill',
    description: 'The grill that sears, sizzles, and air fry crisps. With Cyclonic Grilling Technology, super-hot 500°F air delivers Surround Searing.',
    price: 229.99,
    mrp: 279.99,
    discount: 50,
    stock: 45,
    category: 'Home & Kitchen',
    brand: 'Ninja',
    rating: 4.7,
    numReviews: 156,
    images: ['/uploads/home-&-kitchen/home-&-kitchen-3.jpg', '/uploads/home-&-kitchen/home-&-kitchen-4.jpg']
  },

  // Clothing
  {
    title: 'Levi\'s Men\'s 501 Original Fit Jeans',
    description: 'The original button fly, straight leg jeans. Sits at waist, regular through thigh, straight leg.',
    price: 59.99,
    mrp: 69.99,
    discount: 10,
    stock: 100,
    category: 'Clothing',
    brand: 'Levi\'s',
    rating: 4.6,
    numReviews: 287,
    images: ['/uploads/clothing/clothing-1.jpg', '/uploads/clothing/clothing-2.jpg']
  },
  {
    title: 'The North Face Women\'s Thermoball Eco Jacket',
    description: 'Lightweight, packable insulation for cold-weather adventures. Made with recycled materials.',
    price: 199.99,
    mrp: 229.99,
    discount: 30,
    stock: 75,
    category: 'Clothing',
    brand: 'The North Face',
    rating: 4.7,
    numReviews: 134,
    images: ['/uploads/clothing/clothing-3.jpg', '/uploads/clothing/clothing-4.jpg']
  },

  // Beauty & Personal Care
  {
    title: 'Dyson Supersonic Hair Dryer',
    description: 'Engineered to protect hair from extreme heat damage, with fast drying and controlled styling.',
    price: 399.99,
    mrp: 429.99,
    discount: 30,
    stock: 30,
    category: 'Beauty & Personal Care',
    brand: 'Dyson',
    rating: 4.8,
    numReviews: 176,
    images: ['/uploads/beauty-&-personal-care/beauty-&-personal-care-1.jpg', '/uploads/beauty-&-personal-care/beauty-&-personal-care-2.jpg']
  },
  {
    title: 'Philips Sonicare DiamondClean Smart Electric Toothbrush',
    description: 'Our best ever toothbrush, for complete oral care. 5 modes, 4 brush heads, and a charging travel case.',
    price: 229.99,
    mrp: 279.99,
    discount: 50,
    stock: 40,
    category: 'Beauty & Personal Care',
    brand: 'Philips',
    rating: 4.7,
    numReviews: 112,
    images: ['/uploads/beauty-&-personal-care/beauty-&-personal-care-3.jpg', '/uploads/beauty-&-personal-care/beauty-&-personal-care-4.jpg']
  },

  // Books
  {
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    description: 'A revolutionary system to get 1 percent better every day. Learn how tiny changes can lead to remarkable results.',
    price: 11.99,
    mrp: 16.99,
    discount: 5,
    stock: 200,
    category: 'Books',
    brand: 'Penguin Random House',
    rating: 4.9,
    numReviews: 432,
    images: ['/uploads/books/books-1.jpg', '/uploads/books/books-2.jpg']
  },
  {
    title: 'The Midnight Library: A Novel',
    description: 'Between life and death there is a library. When Nora finds herself in the Midnight Library, she has a chance to make things right.',
    price: 13.99,
    mrp: 18.99,
    discount: 5,
    stock: 150,
    category: 'Books',
    brand: 'Viking',
    rating: 4.8,
    numReviews: 287,
    images: ['/uploads/books/books-3.jpg', '/uploads/books/books-4.jpg']
  },

  // Toys & Games
  {
    title: 'LEGO Star Wars: The Mandalorian The Child Building Kit',
    description: 'Build and display this cute model of The Child from Star Wars: The Mandalorian. Features posable head, ears, and mouth.',
    price: 79.99,
    mrp: 89.99,
    discount: 10,
    stock: 80,
    category: 'Toys & Games',
    brand: 'LEGO',
    rating: 4.9,
    numReviews: 198,
    images: ['/uploads/toys-&-games/toys-&-games-1.jpg', '/uploads/toys-&-games/toys-&-games-2.jpg']
  },
  {
    title: 'Nintendo Switch with Neon Blue and Neon Red Joy‑Con',
    description: 'Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen. Includes a wide adjustable stand, a dock with a wired LAN port, 64 GB of internal storage.',
    price: 299.99,
    mrp: 349.99,
    discount: 50,
    stock: 60,
    category: 'Toys & Games',
    brand: 'Nintendo',
    rating: 4.8,
    numReviews: 312,
    images: ['/uploads/toys-&-games/toys-&-games-3.jpg', '/uploads/toys-&-games/toys-&-games-4.jpg']
  },

  // Sports & Outdoors
  {
    title: 'Peloton Bike+',
    description: 'The ultimate cardio experience, with an immersive 24" HD touchscreen and automatic resistance control.',
    price: 2495.00,
    mrp: 2695.00,
    discount: 7.4,
    stock: 20,
    category: 'Sports & Outdoors',
    brand: 'Peloton',
    rating: 4.8,
    numReviews: 156,
    images: ['/uploads/sports-&-outdoors/sports-&-outdoors-1.jpg', '/uploads/sports-&-outdoors/sports-&-outdoors-2.jpg']
  },
  {
    title: 'Hydro Flask 32 oz Wide Mouth Water Bottle',
    description: 'TempShield insulation keeps beverages cold up to 24 hours and hot up to 12 hours. Made with 18/8 pro-grade stainless steel.',
    price: 44.95,
    mrp: 49.95,
    discount: 5,
    stock: 120,
    category: 'Sports & Outdoors',
    brand: 'Hydro Flask',
    rating: 4.7,
    numReviews: 278,
    images: ['/uploads/sports-&-outdoors/sports-&-outdoors-3.jpg', '/uploads/sports-&-outdoors/sports-&-outdoors-4.jpg']
  },

  // Grocery & Gourmet Food
  {
    title: 'Starbucks Medium Roast Ground Coffee — Pike Place Roast',
    description: 'Smooth and balanced with subtle notes of cocoa and toasted nuts. The perfect cup of coffee for every day.',
    price: 9.99,
    mrp: 12.99,
    discount: 3,
    stock: 200,
    category: 'Grocery & Gourmet Food',
    brand: 'Starbucks',
    rating: 4.7,
    numReviews: 321,
    images: ['/uploads/grocery-&-gourmet-food/grocery-&-gourmet-food-1.jpg', '/uploads/grocery-&-gourmet-food/grocery-&-gourmet-food-2.jpg']
  },
  {
    title: 'Ghirardelli Chocolate Squares Premium Assortment',
    description: 'A premium assortment of Ghirardelli chocolate squares with caramel, mint, and dark chocolate varieties.',
    price: 19.99,
    mrp: 24.99,
    discount: 5,
    stock: 150,
    category: 'Grocery & Gourmet Food',
    brand: 'Ghirardelli',
    rating: 4.8,
    numReviews: 187,
    images: ['/uploads/grocery-&-gourmet-food/grocery-&-gourmet-food-3.jpg', '/uploads/grocery-&-gourmet-food/grocery-&-gourmet-food-4.jpg']
  },

  // Pet Supplies
  {
    title: 'Furbo Dog Camera',
    description: 'Treat-tossing pet camera with HD video, 2-way audio, and barking alerts. Stay connected to your dog when you are away from home.',
    price: 169.00,
    mrp: 249.00,
    discount: 80,
    stock: 40,
    category: 'Pet Supplies',
    brand: 'Furbo',
    rating: 4.6,
    numReviews: 132,
    images: ['/uploads/pet-supplies/pet-supplies-1.jpg', '/uploads/pet-supplies/pet-supplies-2.jpg']
  },
  {
    title: 'KONG Classic Dog Toy',
    description: 'The KONG Classic is the gold standard of dog toys. Made with durable rubber, it is perfect for stuffing with treats.',
    price: 12.99,
    mrp: 14.99,
    discount: 2,
    stock: 180,
    category: 'Pet Supplies',
    brand: 'KONG',
    rating: 4.7,
    numReviews: 298,
    images: ['/uploads/pet-supplies/pet-supplies-3.jpg', '/uploads/pet-supplies/pet-supplies-4.jpg']
  },

  // Automotive
  {
    title: 'NOCO Boost Plus GB40 1000 Amp 12-Volt UltraSafe Lithium Jump Starter',
    description: 'Start dead batteries with a compact, yet powerful lithium jump starter. Safe and easy to use on vehicles up to 6.0L gas and 3.0L diesel.',
    price: 99.95,
    mrp: 124.95,
    discount: 25,
    stock: 60,
    category: 'Automotive',
    brand: 'NOCO',
    rating: 4.7,
    numReviews: 176,
    images: ['/uploads/automotive/automotive-1.jpg', '/uploads/automotive/automotive-2.jpg']
  },
  {
    title: 'Chemical Guys HOL169 16-Piece Arsenal Builder Car Wash Kit',
    description: 'The ultimate car wash kit with everything you need to detail your car like a pro. Includes wash, wax, and interior cleaning products.',
    price: 149.99,
    mrp: 179.99,
    discount: 30,
    stock: 45,
    category: 'Automotive',
    brand: 'Chemical Guys',
    rating: 4.8,
    numReviews: 132,
    images: ['/uploads/automotive/automotive-3.jpg', '/uploads/automotive/automotive-4.jpg']
  },

  // Tools & Home Improvement
  {
    title: 'DeWalt 20V MAX Cordless Drill / Driver Kit',
    description: 'Compact, lightweight design fits into tight areas. High-performance motor delivers 300 unit watts out (UWO) of power.',
    price: 169.00,
    mrp: 199.00,
    discount: 30,
    stock: 70,
    category: 'Tools & Home Improvement',
    brand: 'DeWalt',
    rating: 4.8,
    numReviews: 287,
    images: ['/uploads/tools-&-home-improvement/tools-&-home-improvement-1.jpg', '/uploads/tools-&-home-improvement/tools-&-home-improvement-2.jpg']
  },
  {
    title: 'Philips Hue White and Color Ambiance LED Smart Bulb Starter Kit',
    description: 'Add smart lighting to your home with this starter kit. Control your lights with your voice or smartphone.',
    price: 199.99,
    mrp: 219.99,
    discount: 20,
    stock: 55,
    category: 'Tools & Home Improvement',
    brand: 'Philips',
    rating: 4.7,
    numReviews: 156,
    images: ['/uploads/tools-&-home-improvement/tools-&-home-improvement-3.jpg', '/uploads/tools-&-home-improvement/tools-&-home-improvement-4.jpg']
  },

  // Health & Household
  {
    title: 'Clorox Disinfecting Wipes Value Pack, 3 Pack',
    description: 'Kills 99.9% of viruses and bacteria. Cleans and disinfects in one easy step. Safe for use on multiple surfaces.',
    price: 14.99,
    mrp: 19.99,
    discount: 5,
    stock: 200,
    category: 'Health & Household',
    brand: 'Clorox',
    rating: 4.8,
    numReviews: 432,
    images: ['/uploads/health-&-household/health-&-household-1.jpg', '/uploads/health-&-household/health-&-household-2.jpg']
  },
  {
    title: 'Waterpik Aquarius Water Flosser',
    description: 'The easy and more effective way to floss. Removes up to 99.9% of plaque from treated areas.',
    price: 69.99,
    mrp: 89.99,
    discount: 20,
    stock: 80,
    category: 'Health & Household',
    brand: 'Waterpik',
    rating: 4.7,
    numReviews: 198,
    images: ['/uploads/health-&-household/health-&-household-3.jpg', '/uploads/health-&-household/health-&-household-4.jpg']
  },

  // Office Products
  {
    title: 'HP OfficeJet Pro 9015e All-in-One Wireless Printer',
    description: 'Print, scan, copy, and fax with this wireless all-in-one printer. Includes 6 months of free ink with HP+.',
    price: 229.99,
    mrp: 269.99,
    discount: 40,
    stock: 50,
    category: 'Office Products',
    brand: 'HP',
    rating: 4.6,
    numReviews: 143,
    images: ['/uploads/office-products/office-products-1.jpg', '/uploads/office-products/office-products-2.jpg']
  },
  {
    title: 'Logitech MX Master 3 Advanced Wireless Mouse',
    description: 'Ultra-fast and precise scrolling. Works on any surface, even glass. Control multiple computers with one mouse.',
    price: 99.99,
    mrp: 119.99,
    discount: 20,
    stock: 65,
    category: 'Office Products',
    brand: 'Logitech',
    rating: 4.8,
    numReviews: 176,
    images: ['/uploads/office-products/office-products-3.jpg', '/uploads/office-products/office-products-4.jpg']
  },

  // Gift Cards
  {
    title: 'Amazon.com Gift Card in a Premium Gift Box',
    description: 'Gift card in a premium gift box. No returns and no expiration date. Redeemable towards millions of items store-wide.',
    price: 50.00,
    mrp: 50.00,
    discount: 0,
    stock: 500,
    category: 'Gift Cards',
    brand: 'Amazon',
    rating: 4.9,
    numReviews: 543,
    images: ['/uploads/gift-cards/gift-cards-1.jpg', '/uploads/gift-cards/gift-cards-2.jpg']
  },
  {
    title: 'Starbucks Gift Card',
    description: 'The perfect gift for any occasion. Redeemable at most Starbucks locations. No returns and no expiration date.',
    price: 25.00,
    mrp: 25.00,
    discount: 0,
    stock: 500,
    category: 'Gift Cards',
    brand: 'Starbucks',
    rating: 4.8,
    numReviews: 321,
    images: ['/uploads/gift-cards/gift-cards-3.jpg', '/uploads/gift-cards/gift-cards-4.jpg']
  }
];

// Function to add products to the database
const seedProducts = async () => {
  try {
    // Create default admin user if it doesn't exist
    let adminUser = await User.findOne({ email: 'admin@amazer.com' });

    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@amazer.com',
        password: 'password123',
        role: 'admin',
        address: {
          street: '123 Admin St',
          city: 'Admin City',
          state: 'Admin State',
          zipCode: '12345',
          country: 'Admin Country'
        },
        phone: '123-456-7890'
      });
      console.log('Created default admin user');
    } else {
      console.log('Admin user already exists');
    }

    // Clear existing products
    await Product.deleteMany({});
    console.log('Deleted existing products');

    // Add user reference to each product
    const productsWithUser = sampleProducts.map(product => ({
      ...product,
      user: adminUser._id
    }));

    // Insert new products
    const createdProducts = await Product.insertMany(productsWithUser);
    console.log(`Added ${createdProducts.length} products to the database`);

    // Close the connection
    mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.disconnect();
  }
};

// Run the seeding function
seedProducts();
