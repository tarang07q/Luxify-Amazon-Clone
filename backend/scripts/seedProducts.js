const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleProducts = [
  // Electronics
  {
    title: "iPhone 15 Pro Max",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    brand: "Apple",
    price: 1199,
    mrp: 1299,
    discount: 8,
    rating: 4.8,
    numReviews: 2847,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500"
    ],
    category: "Electronics",
    subCategory: "Smartphones",
    specifications: {
      "Display": "6.7-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Storage": "256GB",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      "Battery": "Up to 29 hours video playback"
    },
    featured: true
  },
  {
    title: "Samsung Galaxy S24 Ultra",
    description: "Premium Android smartphone with S Pen, 200MP camera, and AI features",
    brand: "Samsung",
    price: 1099,
    mrp: 1199,
    discount: 8,
    rating: 4.7,
    numReviews: 1923,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500"
    ],
    category: "Electronics",
    subCategory: "Smartphones",
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Storage": "256GB",
      "Camera": "200MP + 50MP + 12MP + 10MP"
    },
    featured: true
  },
  {
    title: "MacBook Pro 16-inch M3",
    description: "Professional laptop with M3 chip, Liquid Retina XDR display, and all-day battery",
    brand: "Apple",
    price: 2499,
    mrp: 2699,
    discount: 7,
    rating: 4.9,
    numReviews: 1456,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500"
    ],
    category: "Electronics",
    subCategory: "Laptops",
    specifications: {
      "Chip": "Apple M3 Pro",
      "Memory": "18GB Unified Memory",
      "Storage": "512GB SSD",
      "Display": "16.2-inch Liquid Retina XDR",
      "Battery": "Up to 22 hours"
    },
    featured: true
  },
  {
    title: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling wireless headphones with 30-hour battery",
    brand: "Sony",
    price: 349,
    mrp: 399,
    discount: 13,
    rating: 4.6,
    numReviews: 3421,
    stock: 75,
    images: [
      "/uploads/electronics/sony-headphones-1.jpg",
      "/uploads/electronics/sony-headphones-2.jpg"
    ],
    category: "Electronics",
    subCategory: "Audio",
    specifications: {
      "Type": "Over-ear, Wireless",
      "Noise Canceling": "Yes, Industry-leading",
      "Battery": "30 hours",
      "Connectivity": "Bluetooth 5.2, NFC",
      "Weight": "250g"
    },
    featured: false
  },
  {
    title: "iPad Pro 12.9-inch M2",
    description: "Most advanced iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support",
    brand: "Apple",
    price: 1099,
    mrp: 1199,
    discount: 8,
    rating: 4.8,
    numReviews: 2156,
    stock: 40,
    images: [
      "/uploads/electronics/ipad-pro-1.jpg",
      "/uploads/electronics/ipad-pro-2.jpg"
    ],
    category: "Electronics",
    subCategory: "Tablets",
    specifications: {
      "Display": "12.9-inch Liquid Retina XDR",
      "Chip": "Apple M2",
      "Storage": "256GB",
      "Camera": "12MP Wide + 10MP Ultra Wide",
      "Connectivity": "Wi-Fi 6E + 5G"
    },
    featured: true
  },

  // Fashion
  {
    title: "Nike Air Jordan 1 Retro High",
    description: "Classic basketball sneakers with premium leather and iconic design",
    brand: "Nike",
    price: 170,
    mrp: 200,
    discount: 15,
    rating: 4.7,
    numReviews: 5432,
    stock: 120,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    ],
    category: "Fashion",
    subCategory: "Shoes",
    specifications: {
      "Material": "Premium Leather",
      "Sole": "Rubber Outsole",
      "Closure": "Lace-up",
      "Style": "High-top",
      "Gender": "Unisex"
    },
    featured: false
  },
  {
    title: "Levi's 501 Original Jeans",
    description: "The original blue jean since 1873, straight fit with button fly",
    brand: "Levi's",
    price: 89,
    mrp: 110,
    discount: 19,
    rating: 4.5,
    numReviews: 8765,
    stock: 200,
    images: [
      "/uploads/fashion/levis-501-1.jpg",
      "/uploads/fashion/levis-501-2.jpg"
    ],
    category: "Fashion",
    subCategory: "Jeans",
    specifications: {
      "Fit": "Straight",
      "Material": "100% Cotton Denim",
      "Closure": "Button Fly",
      "Wash": "Medium Blue",
      "Origin": "Made in USA"
    },
    featured: false
  },

  // Home & Kitchen
  {
    title: "Instant Pot Duo 7-in-1 Pressure Cooker",
    description: "Multi-use programmable pressure cooker, slow cooker, rice cooker, and more",
    brand: "Instant Pot",
    price: 79,
    mrp: 99,
    discount: 20,
    rating: 4.6,
    numReviews: 12456,
    stock: 85,
    images: [
      "/uploads/home/instant-pot-1.jpg",
      "/uploads/home/instant-pot-2.jpg"
    ],
    category: "Home & Kitchen",
    subCategory: "Kitchen Appliances",
    specifications: {
      "Capacity": "6 Quart",
      "Functions": "7-in-1 Multi-Cooker",
      "Material": "Stainless Steel",
      "Safety": "10+ Safety Features",
      "Warranty": "1 Year"
    },
    featured: false
  },
  {
    title: "Dyson V15 Detect Cordless Vacuum",
    description: "Powerful cordless vacuum with laser dust detection and LCD screen",
    brand: "Dyson",
    price: 649,
    mrp: 749,
    discount: 13,
    rating: 4.8,
    numReviews: 3421,
    stock: 30,
    images: [
      "/uploads/home/dyson-v15-1.jpg",
      "/uploads/home/dyson-v15-2.jpg"
    ],
    category: "Home & Kitchen",
    subCategory: "Vacuum Cleaners",
    specifications: {
      "Type": "Cordless Stick Vacuum",
      "Battery": "Up to 60 minutes",
      "Filtration": "Advanced HEPA",
      "Weight": "6.8 lbs",
      "Features": "Laser dust detection, LCD screen"
    },
    featured: true
  },

  // Books
  {
    title: "The Psychology of Money",
    description: "Timeless lessons on wealth, greed, and happiness by Morgan Housel",
    brand: "Harriman House",
    price: 14,
    mrp: 18,
    discount: 22,
    rating: 4.9,
    numReviews: 15678,
    stock: 150,
    images: [
      "/uploads/books/psychology-money-1.jpg"
    ],
    category: "Books",
    subCategory: "Finance",
    specifications: {
      "Author": "Morgan Housel",
      "Pages": "256",
      "Publisher": "Harriman House",
      "Language": "English",
      "Format": "Paperback"
    },
    featured: false
  },

  // Additional Electronics
  {
    title: "Dell XPS 13 Laptop",
    description: "Ultra-thin laptop with InfinityEdge display and 11th Gen Intel processors",
    brand: "Dell",
    price: 999,
    mrp: 1199,
    discount: 17,
    rating: 4.5,
    numReviews: 2341,
    stock: 45,
    images: ["/uploads/electronics/dell-xps-1.jpg"],
    category: "Electronics",
    subCategory: "Laptops",
    specifications: {
      "Processor": "Intel Core i7-1165G7",
      "RAM": "16GB LPDDR4x",
      "Storage": "512GB SSD",
      "Display": "13.3-inch FHD+",
      "Weight": "2.64 lbs"
    },
    featured: false
  },
  {
    title: "AirPods Pro (2nd Generation)",
    description: "Active Noise Cancellation, Adaptive Transparency, and Spatial Audio",
    brand: "Apple",
    price: 249,
    mrp: 279,
    discount: 11,
    rating: 4.7,
    numReviews: 8934,
    stock: 100,
    images: ["/uploads/electronics/airpods-pro-1.jpg"],
    category: "Electronics",
    subCategory: "Audio",
    specifications: {
      "Type": "True Wireless Earbuds",
      "Noise Cancellation": "Active",
      "Battery": "6 hours + 24 hours with case",
      "Connectivity": "Bluetooth 5.3",
      "Water Resistance": "IPX4"
    },
    featured: true
  },
  {
    title: "Samsung 55\" QLED 4K Smart TV",
    description: "Quantum Dot technology with HDR10+ and smart TV features",
    brand: "Samsung",
    price: 799,
    mrp: 999,
    discount: 20,
    rating: 4.6,
    numReviews: 1876,
    stock: 25,
    images: ["/uploads/electronics/samsung-tv-1.jpg"],
    category: "Electronics",
    subCategory: "TVs",
    specifications: {
      "Screen Size": "55 inches",
      "Resolution": "4K UHD (3840 x 2160)",
      "Technology": "QLED",
      "Smart Platform": "Tizen OS",
      "HDR": "HDR10+"
    },
    featured: false
  },

  // Additional Fashion Items
  {
    title: "Adidas Ultraboost 22 Running Shoes",
    description: "Energy-returning running shoes with Boost midsole technology",
    brand: "Adidas",
    price: 180,
    mrp: 220,
    discount: 18,
    rating: 4.6,
    numReviews: 4567,
    stock: 80,
    images: ["/uploads/fashion/ultraboost-1.jpg"],
    category: "Fashion",
    subCategory: "Shoes",
    specifications: {
      "Type": "Running Shoes",
      "Technology": "Boost Midsole",
      "Upper": "Primeknit",
      "Sole": "Continental Rubber",
      "Gender": "Unisex"
    },
    featured: false
  },
  {
    title: "Ray-Ban Aviator Classic Sunglasses",
    description: "Iconic aviator sunglasses with crystal lenses and gold frame",
    brand: "Ray-Ban",
    price: 154,
    mrp: 180,
    discount: 14,
    rating: 4.8,
    numReviews: 6789,
    stock: 60,
    images: ["/uploads/fashion/rayban-aviator-1.jpg"],
    category: "Fashion",
    subCategory: "Accessories",
    specifications: {
      "Frame Material": "Metal",
      "Lens Material": "Crystal",
      "UV Protection": "100%",
      "Frame Color": "Gold",
      "Lens Color": "Green Classic G-15"
    },
    featured: false
  },

  // Sports & Outdoors
  {
    title: "Yeti Rambler 20oz Tumbler",
    description: "Insulated stainless steel tumbler that keeps drinks hot or cold",
    brand: "Yeti",
    price: 35,
    mrp: 40,
    discount: 13,
    rating: 4.8,
    numReviews: 9876,
    stock: 150,
    images: ["/uploads/sports/yeti-tumbler-1.jpg"],
    category: "Sports & Outdoors",
    subCategory: "Drinkware",
    specifications: {
      "Capacity": "20 oz",
      "Material": "Stainless Steel",
      "Insulation": "Double-wall vacuum",
      "Lid": "MagSlider",
      "Dishwasher Safe": "Yes"
    },
    featured: false
  },
  {
    title: "Fitbit Charge 5 Fitness Tracker",
    description: "Advanced fitness tracker with built-in GPS and health monitoring",
    brand: "Fitbit",
    price: 149,
    mrp: 199,
    discount: 25,
    rating: 4.3,
    numReviews: 4321,
    stock: 65,
    images: ["/uploads/sports/fitbit-charge5-1.jpg"],
    category: "Sports & Outdoors",
    subCategory: "Fitness Trackers",
    specifications: {
      "GPS": "Built-in",
      "Battery": "Up to 7 days",
      "Water Resistance": "50 meters",
      "Health Features": "Heart rate, SpO2, stress",
      "Display": "Color AMOLED"
    },
    featured: false
  }
];

const seedProducts = async () => {
  try {
    console.log('🌱 Starting product seeding...');

    // Find an admin user to assign as creator
    let adminUser = await User.findOne({ role: 'admin' });

    if (!adminUser) {
      console.log('Creating admin user for product seeding...');
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@luxify.com',
        password: 'admin123',
        role: 'admin'
      });
    }

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Add user ID to each product
    const productsWithUser = sampleProducts.map(product => ({
      ...product,
      user: adminUser._id
    }));

    // Insert products
    const createdProducts = await Product.insertMany(productsWithUser);
    console.log(`✅ Successfully seeded ${createdProducts.length} products`);

    // Display summary
    const categories = [...new Set(createdProducts.map(p => p.category))];
    console.log(`📊 Categories: ${categories.join(', ')}`);
    console.log(`⭐ Featured products: ${createdProducts.filter(p => p.featured).length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
