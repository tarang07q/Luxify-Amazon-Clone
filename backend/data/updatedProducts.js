const updatedProducts = [
  // Electronics - Smartphones
  {
    title: 'Apple iPhone 15 Pro Max',
    description: 'The iPhone 15 Pro Max features a stunning 6.7-inch Super Retina XDR display with ProMotion technology, A17 Pro chip, and a professional camera system with 48MP main camera. Experience the power of Apple\'s latest flagship smartphone with all-day battery life and the new Action button for quick access to your favorite features.',
    brand: 'Apple',
    price: 1199.99,
    mrp: 1299.99,
    discount: 8,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484bce71?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1695048133396-e6a1c2d5b5a8?q=80&w=1470&auto=format&fit=crop'
    ],
    category: 'Electronics',
    subCategory: 'Smartphones',
    specifications: {
      display: '6.7-inch Super Retina XDR',
      processor: 'A17 Pro chip',
      camera: '48MP main, 12MP ultra-wide, 12MP telephoto',
      battery: '4422 mAh',
      storage: '256GB',
      os: 'iOS 17'
    },
    featured: true
  },
  {
    title: 'Samsung Galaxy S23 Ultra',
    description: 'The Samsung Galaxy S23 Ultra comes with a massive 6.8-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2 processor, and a revolutionary 200MP camera system. With S Pen support and a massive battery, it\'s the ultimate productivity and creativity tool.',
    brand: 'Samsung',
    price: 1099.99,
    mrp: 1199.99,
    discount: 8,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1678911820864-e5a3eb0b4b5f?q=80&w=1632&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1676373666353-a691f7e1d0a6?q=80&w=1632&auto=format&fit=crop'
    ],
    category: 'Electronics',
    subCategory: 'Smartphones',
    specifications: {
      display: '6.8-inch Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 2',
      camera: '200MP main, 12MP ultra-wide, 10MP telephoto',
      battery: '5000 mAh',
      storage: '256GB',
      os: 'Android 13'
    },
    featured: true
  },
  
  // Electronics - Laptops
  {
    title: 'Apple MacBook Pro 16-inch',
    description: 'The MacBook Pro 16-inch features the powerful M2 Pro or M2 Max chip, delivering exceptional performance for demanding tasks like video editing and 3D rendering. With a stunning Liquid Retina XDR display, up to 22 hours of battery life, and a range of connectivity options, it\'s the ultimate professional laptop.',
    brand: 'Apple',
    price: 2499.99,
    mrp: 2699.99,
    discount: 7,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1626&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1470&auto=format&fit=crop'
    ],
    category: 'Electronics',
    subCategory: 'Laptops',
    specifications: {
      processor: 'Apple M2 Pro',
      ram: '16GB',
      storage: '512GB SSD',
      display: '16.2-inch Liquid Retina XDR',
      graphics: 'Apple M2 Pro GPU',
      battery: 'Up to 22 hours'
    },
    featured: true
  },
  {
    title: 'Dell XPS 15',
    description: 'The Dell XPS 15 combines stunning design with powerful performance. Featuring a 15.6-inch 4K OLED display, 12th Gen Intel Core processors, and NVIDIA GeForce RTX graphics, it\'s perfect for creative professionals and power users who need performance on the go.',
    brand: 'Dell',
    price: 1899.99,
    mrp: 2099.99,
    discount: 10,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1469&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593642702821-c8e775f4e513?q=80&w=1469&auto=format&fit=crop'
    ],
    category: 'Electronics',
    subCategory: 'Laptops',
    specifications: {
      processor: 'Intel Core i7-12700H',
      ram: '16GB',
      storage: '1TB SSD',
      display: '15.6-inch 4K OLED',
      graphics: 'NVIDIA GeForce RTX 3050 Ti',
      battery: 'Up to 12 hours'
    },
    featured: false
  },
  
  // Electronics - Headphones
  {
    title: 'Sony WH-1000XM5',
    description: 'The Sony WH-1000XM5 wireless headphones offer industry-leading noise cancellation, exceptional sound quality, and up to 30 hours of battery life. With a lightweight design, touch controls, and speak-to-chat functionality, they provide the ultimate listening experience for music lovers and travelers.',
    brand: 'Sony',
    price: 349.99,
    mrp: 399.99,
    discount: 13,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1588&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1465&auto=format&fit=crop'
    ],
    category: 'Electronics',
    subCategory: 'Headphones',
    specifications: {
      type: 'Over-ear',
      connectivity: 'Bluetooth 5.2',
      noiseCancellation: 'Active Noise Cancellation',
      batteryLife: 'Up to 30 hours',
      charging: 'USB-C',
      weight: '250g'
    },
    featured: true
  },
  {
    title: 'Apple AirPods Pro (2nd Generation)',
    description: 'The AirPods Pro (2nd Generation) deliver up to 2x more Active Noise Cancellation than the previous generation, along with Adaptive Transparency, Personalized Spatial Audio, and improved battery life. With the new charging case featuring precise finding capability, they offer the ultimate wireless earbuds experience.',
    brand: 'Apple',
    price: 229.99,
    mrp: 249.99,
    discount: 8,
    stock: 75,
    images: [
      'https://images.unsplash.com/photo-1606741965509-717b9fdd6549?q=80&w=1587&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop'
    ],
    category: 'Electronics',
    subCategory: 'Headphones',
    specifications: {
      type: 'In-ear',
      connectivity: 'Bluetooth 5.3',
      noiseCancellation: 'Active Noise Cancellation',
      batteryLife: 'Up to 6 hours (30 hours with case)',
      charging: 'USB-C, MagSafe, Qi',
      waterResistance: 'IPX4'
    },
    featured: true
  },
  
  // Electronics - Tablets
  {
    title: 'Apple iPad Pro 12.9-inch',
    description: 'The iPad Pro 12.9-inch with M2 chip delivers extreme performance, an immersive 12.9-inch Liquid Retina XDR display, and all-day battery life. With support for Apple Pencil hover, Wi-Fi 6E, and advanced cameras, it\'s the ultimate iPad experience for professionals and creatives.',
    brand: 'Apple',
    price: 1099.99,
    mrp: 1199.99,
    discount: 8,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1471&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=1587&auto=format&fit=crop'
    ],
    category: 'Electronics',
    subCategory: 'Tablets',
    specifications: {
      processor: 'Apple M2',
      display: '12.9-inch Liquid Retina XDR',
      storage: '256GB',
      camera: '12MP Wide, 10MP Ultra Wide',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.3',
      battery: 'Up to 10 hours'
    },
    featured: false
  },
  {
    title: 'Samsung Galaxy Tab S9 Ultra',
    description: 'The Galaxy Tab S9 Ultra features a massive 14.6-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2 processor, and S Pen support. With a slim design, quad speakers, and long battery life, it\'s perfect for productivity, creativity, and entertainment on the go.',
    brand: 'Samsung',
    price: 1199.99,
    mrp: 1299.99,
    discount: 8,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?q=80&w=1587&auto=format&fit=crop'
    ],
    category: 'Electronics',
    subCategory: 'Tablets',
    specifications: {
      processor: 'Snapdragon 8 Gen 2',
      display: '14.6-inch Dynamic AMOLED 2X',
      storage: '256GB',
      camera: '13MP Wide, 8MP Ultra Wide',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.3',
      battery: '11,200 mAh'
    },
    featured: false
  },
  
  // Electronics - Smartwatches
  {
    title: 'Apple Watch Series 9',
    description: 'The Apple Watch Series 9 features the new S9 chip for faster performance, a brighter Always-On Retina display, and a carbon-neutral design option. With advanced health sensors, crash detection, and a range of fitness tracking features, it\'s the ultimate companion for a healthy lifestyle.',
    brand: 'Apple',
    price: 399.99,
    mrp: 429.99,
    discount: 7,
    stock: 55,
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1472&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1528&auto=format&fit=crop'
    ],
    category: 'Electronics',
    subCategory: 'Smartwatches',
    specifications: {
      display: 'Always-On Retina LTPO OLED',
      processor: 'S9 SiP',
      storage: '64GB',
      connectivity: 'Bluetooth 5.3, Wi-Fi',
      waterResistance: '50 meters',
      battery: 'Up to 18 hours'
    },
    featured: true
  },
  {
    title: 'Samsung Galaxy Watch 6',
    description: 'The Galaxy Watch 6 offers comprehensive health monitoring, including advanced sleep coaching, body composition analysis, and heart health features. With a sleek design, vibrant display, and seamless connectivity with Galaxy devices, it\'s the perfect smartwatch for Android users.',
    brand: 'Samsung',
    price: 299.99,
    mrp: 329.99,
    discount: 9,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1527&auto=format&fit=crop'
    ],
    category: 'Electronics',
    subCategory: 'Smartwatches',
    specifications: {
      display: '1.3-inch Super AMOLED',
      processor: 'Exynos W930',
      storage: '16GB',
      connectivity: 'Bluetooth 5.3, Wi-Fi',
      waterResistance: '5 ATM + IP68',
      battery: 'Up to 40 hours'
    },
    featured: false
  }
];

module.exports = updatedProducts;
