const predefinedProducts3 = [
  // Books
  {
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    description: 'James Clear presents a proven framework for improving every day through tiny changes in behavior. Learn how to form good habits, break bad ones, and master the small behaviors that lead to remarkable results.',
    brand: 'Avery',
    price: 11.98,
    mrp: 27.00,
    discount: 56,
    stock: 120,
    images: [
      'https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UY218_.jpg',
      'https://m.media-amazon.com/images/I/71F4+7rk2eL._AC_UY218_.jpg'
    ],
    category: 'Books',
    subCategory: 'Self-Help',
    specifications: {
      author: 'James Clear',
      format: 'Hardcover',
      pages: '320',
      publisher: 'Avery',
      language: 'English',
      isbn: '978-0735211292'
    },
    featured: true
  },
  {
    title: 'The Psychology of Money: Timeless lessons on wealth, greed, and happiness',
    description: 'In The Psychology of Money, Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life\'s most important topics.',
    brand: 'Harriman House',
    price: 14.49,
    mrp: 18.99,
    discount: 24,
    stock: 100,
    images: [
      'https://m.media-amazon.com/images/I/71TRB-fCSvL._AC_UY218_.jpg',
      'https://m.media-amazon.com/images/I/71gm8v4vFBL._AC_UY218_.jpg'
    ],
    category: 'Books',
    subCategory: 'Finance',
    specifications: {
      author: 'Morgan Housel',
      format: 'Paperback',
      pages: '256',
      publisher: 'Harriman House',
      language: 'English',
      isbn: '978-0857197689'
    },
    featured: false
  },
  
  // Sports & Outdoors
  {
    title: 'YETI Rambler 30 oz Tumbler with MagSlider Lid',
    description: 'The YETI Rambler Tumbler keeps drinks hot or cold for hours with double-wall vacuum insulation. Made from kitchen-grade stainless steel with a durable DuraCoat color that won\'t fade or peel, it\'s perfect for outdoor adventures or daily use.',
    brand: 'YETI',
    price: 38.00,
    mrp: 42.00,
    discount: 10,
    stock: 75,
    images: [
      'https://m.media-amazon.com/images/I/61vkTpL7IJL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71Ww6aRVHVL._AC_SL1500_.jpg'
    ],
    category: 'Sports & Outdoors',
    subCategory: 'Outdoor Recreation',
    specifications: {
      capacity: '30 oz',
      material: '18/8 Stainless Steel',
      insulation: 'Double-wall vacuum',
      lid: 'MagSlider Lid',
      features: 'Dishwasher safe, No sweat design',
      dimensions: '7.9" H x 3.8" W'
    },
    featured: false
  },
  {
    title: 'Fitbit Charge 5 Advanced Fitness & Health Tracker',
    description: 'The Fitbit Charge 5 helps you optimize your workout routine with a built-in GPS, heart rate monitoring, and Active Zone Minutes. It also tracks your stress, sleep quality, and overall health with tools like an ECG app and EDA scan.',
    brand: 'Fitbit',
    price: 129.95,
    mrp: 149.95,
    discount: 13,
    stock: 60,
    images: [
      'https://m.media-amazon.com/images/I/61aCL2QWtIL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71ZiXJkgJ4L._AC_SL1500_.jpg'
    ],
    category: 'Sports & Outdoors',
    subCategory: 'Fitness',
    specifications: {
      display: 'AMOLED color touchscreen',
      battery: 'Up to 7 days',
      waterResistance: 'Water resistant to 50m',
      sensors: 'GPS, heart rate, EDA, ECG',
      compatibility: 'iOS 13.3+, Android OS 8.0+',
      connectivity: 'Bluetooth'
    },
    featured: true
  },
  
  // Beauty & Personal Care
  {
    title: 'CeraVe Moisturizing Cream',
    description: 'CeraVe Moisturizing Cream features three essential ceramides and hyaluronic acid to restore and maintain the skin\'s natural barrier. Developed with dermatologists, this rich, non-greasy formula provides 24-hour hydration for dry to very dry skin.',
    brand: 'CeraVe',
    price: 16.08,
    mrp: 19.99,
    discount: 20,
    stock: 90,
    images: [
      'https://m.media-amazon.com/images/I/61S7BrCBj7L._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71e7ksQ-xyL._SL1500_.jpg'
    ],
    category: 'Beauty & Personal Care',
    subCategory: 'Skin Care',
    specifications: {
      size: '19 oz',
      formulation: 'Cream',
      skinType: 'Dry, Sensitive',
      features: 'Fragrance-free, non-comedogenic',
      ingredients: 'Ceramides, Hyaluronic Acid',
      benefits: 'Moisturizing, Barrier restoring'
    },
    featured: false
  },
  {
    title: 'Neutrogena Hydro Boost Water Gel',
    description: 'Neutrogena Hydro Boost Water Gel instantly quenches dry skin and keeps it looking smooth, supple, and hydrated all day. The lightweight gel formula with hyaluronic acid absorbs quickly like a gel but provides long-lasting moisturizing power.',
    brand: 'Neutrogena',
    price: 17.84,
    mrp: 22.49,
    discount: 21,
    stock: 85,
    images: [
      'https://m.media-amazon.com/images/I/71QDtK7DwNL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71zXYLzVgwL._SL1500_.jpg'
    ],
    category: 'Beauty & Personal Care',
    subCategory: 'Skin Care',
    specifications: {
      size: '1.7 oz',
      formulation: 'Gel',
      skinType: 'All skin types',
      features: 'Oil-free, non-comedogenic',
      ingredients: 'Hyaluronic Acid',
      benefits: 'Hydrating, Lightweight'
    },
    featured: false
  },
  
  // Toys & Games
  {
    title: 'LEGO Icons Orchid Building Set for Adults',
    description: 'The LEGO Icons Orchid Building Set lets you create a beautiful orchid display that never needs watering. With 608 pieces including flower stems, blooms, roots, and a blue fluted vase, it\'s a rewarding build that results in a stunning display piece.',
    brand: 'LEGO',
    price: 49.99,
    mrp: 59.99,
    discount: 17,
    stock: 50,
    images: [
      'https://m.media-amazon.com/images/I/71uUh3qKykL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81Jv1IOvWBL._AC_SL1500_.jpg'
    ],
    category: 'Toys & Games',
    subCategory: 'Building Toys',
    specifications: {
      pieces: '608',
      age: '18+ years',
      dimensions: '15" tall when built',
      theme: 'LEGO Botanical Collection',
      features: 'Adjustable stems and flowers',
      includes: 'Blue fluted vase'
    },
    featured: false
  },
  {
    title: 'Exploding Kittens Card Game',
    description: 'Exploding Kittens is a highly-strategic, kitty-powered version of Russian Roulette. Players draw cards until someone draws an Exploding Kitten and loses the game, unless they have a Defuse card to save themselves. It\'s the perfect family-friendly party game.',
    brand: 'Exploding Kittens',
    price: 19.99,
    mrp: 24.99,
    discount: 20,
    stock: 70,
    images: [
      'https://m.media-amazon.com/images/I/71UUDAPpKWL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71UAU6C7L7L._AC_SL1500_.jpg'
    ],
    category: 'Toys & Games',
    subCategory: 'Card Games',
    specifications: {
      players: '2-5',
      age: '7+ years',
      playTime: '15 minutes',
      contents: '56 cards',
      features: 'Family-friendly, easy to learn',
      creator: 'Matthew Inman, The Oatmeal'
    },
    featured: true
  },
  
  // Grocery & Gourmet Food
  {
    title: 'KIND Bars, Dark Chocolate Nuts & Sea Salt',
    description: 'KIND Dark Chocolate Nuts & Sea Salt bars combine whole nuts with dark chocolate and a touch of sea salt for a sweet and salty snack. With 5g of sugar and 6g of protein per bar, they\'re a satisfying, gluten-free snack for any time of day.',
    brand: 'KIND',
    price: 14.22,
    mrp: 17.76,
    discount: 20,
    stock: 100,
    images: [
      'https://m.media-amazon.com/images/I/81XOAX6O1QL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81xSsxrZZ9L._SL1500_.jpg'
    ],
    category: 'Grocery & Gourmet Food',
    subCategory: 'Snack Foods',
    specifications: {
      quantity: '12 count',
      weight: '1.4 oz per bar',
      protein: '6g per bar',
      sugar: '5g per bar',
      features: 'Gluten-free, No genetically engineered ingredients',
      ingredients: 'Almonds, dark chocolate, sea salt'
    },
    featured: false
  },
  {
    title: 'Starbucks Medium Roast Ground Coffee — Pike Place Roast',
    description: 'Starbucks Pike Place Roast is a smooth, well-rounded medium-roast coffee with subtle notes of cocoa and toasted nuts. Named after the original Starbucks store in Seattle\'s Pike Place Market, it\'s the perfect everyday coffee.',
    brand: 'Starbucks',
    price: 9.98,
    mrp: 12.99,
    discount: 23,
    stock: 110,
    images: [
      'https://m.media-amazon.com/images/I/71nnUOHRJOL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81Ouw0oaxDL._SL1500_.jpg'
    ],
    category: 'Grocery & Gourmet Food',
    subCategory: 'Coffee',
    specifications: {
      weight: '12 oz',
      roast: 'Medium',
      form: 'Ground',
      flavor: 'Pike Place Roast',
      origin: '100% Arabica coffee',
      features: 'Kosher certified'
    },
    featured: false
  }
];

module.exports = predefinedProducts3;
