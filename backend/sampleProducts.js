const products = [
  {
    title: 'Apple iPhone 13 Pro',
    description: 'The latest iPhone with A15 Bionic chip, Pro camera system, and Super Retina XDR display with ProMotion.',
    brand: 'Apple',
    price: 999.99,
    mrp: 1099.99,
    discount: 9,
    rating: 4.8,
    numReviews: 125,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    subCategory: 'Smartphones',
    specifications: {
      processor: 'A15 Bionic',
      ram: '6GB',
      storage: '128GB',
      display: '6.1-inch Super Retina XDR',
      camera: 'Triple 12MP camera system'
    },
    featured: true
  },
  {
    title: 'Samsung Galaxy S22 Ultra',
    description: 'Samsung\'s flagship phone with S Pen support, 108MP camera, and Dynamic AMOLED 2X display.',
    brand: 'Samsung',
    price: 1199.99,
    mrp: 1299.99,
    discount: 8,
    rating: 4.7,
    numReviews: 98,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1644501635454-a0a7ff7a247f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    subCategory: 'Smartphones',
    specifications: {
      processor: 'Snapdragon 8 Gen 1',
      ram: '12GB',
      storage: '256GB',
      display: '6.8-inch Dynamic AMOLED 2X',
      camera: 'Quad camera with 108MP main sensor'
    },
    featured: true
  },
  {
    title: 'Dell XPS 15',
    description: 'Premium laptop with InfinityEdge display, 11th Gen Intel processors, and NVIDIA GeForce graphics.',
    brand: 'Dell',
    price: 1799.99,
    mrp: 1999.99,
    discount: 10,
    rating: 4.6,
    numReviews: 75,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Computers',
    subCategory: 'Laptops',
    specifications: {
      processor: 'Intel Core i7-11800H',
      ram: '16GB',
      storage: '512GB SSD',
      display: '15.6-inch 4K UHD+',
      graphics: 'NVIDIA GeForce RTX 3050 Ti'
    },
    featured: false
  },
  {
    title: 'Sony WH-1000XM4',
    description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality and long battery life.',
    brand: 'Sony',
    price: 299.99,
    mrp: 349.99,
    discount: 14,
    rating: 4.9,
    numReviews: 210,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    subCategory: 'Headphones',
    specifications: {
      type: 'Over-ear',
      connectivity: 'Bluetooth 5.0',
      batteryLife: '30 hours',
      noiseCancellation: 'Active',
      weight: '254g'
    },
    featured: true
  },
  {
    title: 'LG C1 OLED 65"',
    description: 'OLED TV with perfect blacks, infinite contrast, and NVIDIA G-SYNC compatibility for gaming.',
    brand: 'LG',
    price: 1799.99,
    mrp: 2499.99,
    discount: 28,
    rating: 4.8,
    numReviews: 156,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Electronics',
    subCategory: 'TVs',
    specifications: {
      resolution: '4K UHD (3840 x 2160)',
      hdr: 'Dolby Vision, HDR10, HLG',
      refreshRate: '120Hz',
      smartPlatform: 'webOS',
      hdmiPorts: '4 HDMI 2.1'
    },
    featured: true
  },
  {
    title: 'Nike Air Zoom Pegasus 38',
    description: 'Versatile running shoe with responsive cushioning and breathable mesh upper.',
    brand: 'Nike',
    price: 119.99,
    mrp: 129.99,
    discount: 8,
    rating: 4.5,
    numReviews: 320,
    stock: 100,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Clothing',
    subCategory: 'Shoes',
    specifications: {
      type: 'Running',
      cushioning: 'Nike React foam',
      closure: 'Lace-up',
      material: 'Mesh upper',
      weight: '10.05 oz (men\'s size 10)'
    },
    featured: false
  },
  {
    title: 'Instant Pot Duo Plus',
    description: '9-in-1 electric pressure cooker with advanced microprocessor technology for fast and versatile cooking.',
    brand: 'Instant Pot',
    price: 119.95,
    mrp: 149.99,
    discount: 20,
    rating: 4.7,
    numReviews: 450,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1585664811087-47f65abbad64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Home & Kitchen',
    subCategory: 'Kitchen Appliances',
    specifications: {
      capacity: '6 Quart',
      functions: 'Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, warmer, sterilizer, and cake maker',
      programs: '15 one-touch programs',
      material: 'Stainless steel',
      power: '1000W'
    },
    featured: false
  },
  {
    title: 'Kindle Paperwhite',
    description: 'Waterproof e-reader with a flush-front design and 300 ppi glare-free display.',
    brand: 'Amazon',
    price: 129.99,
    mrp: 149.99,
    discount: 13,
    rating: 4.6,
    numReviews: 280,
    stock: 75,
    images: [
      'https://images.unsplash.com/photo-1544158828-5f2bcc1f31b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Books',
    subCategory: 'E-readers',
    specifications: {
      storage: '8GB',
      display: '6-inch 300 ppi',
      frontLight: 'Adjustable warm light',
      waterproof: 'IPX8 rated',
      batteryLife: 'Weeks on a single charge'
    },
    featured: true
  }
];

module.exports = products;
