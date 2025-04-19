const predefinedProducts4 = [
  // Pet Supplies
  {
    title: 'KONG - Classic Dog Toy',
    description: 'The KONG Classic is the gold standard of dog toys and has become the staple for dogs around the world. The super-bouncy, red natural rubber compound is perfect for dogs that like to chew while also fulfilling their instinctual needs.',
    brand: 'KONG',
    price: 12.99,
    mrp: 14.99,
    discount: 13,
    stock: 80,
    images: [
      'https://m.media-amazon.com/images/I/61LMXhVVX4L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71Sw+ZR3MJL._AC_SL1500_.jpg'
    ],
    category: 'Pet Supplies',
    subCategory: 'Dogs',
    specifications: {
      size: 'Large',
      material: 'Natural rubber',
      dimensions: '3.5" x 3.5" x 5.5"',
      weight: '7.8 ounces',
      features: 'Fillable, durable, dishwasher safe',
      suitableFor: 'Medium to large dogs'
    },
    featured: false
  },
  {
    title: 'Catit Flower Fountain: 3L Cat Water Fountain',
    description: 'The Catit Flower Fountain is designed to encourage cats to drink more water. With three different water flow settings and a triple-action filter, it keeps water fresh and appealing to help maintain your cat\'s urinary tract health.',
    brand: 'Catit',
    price: 27.99,
    mrp: 34.99,
    discount: 20,
    stock: 65,
    images: [
      'https://m.media-amazon.com/images/I/71Ht6tGKlVL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71Ht6tGKlVL._AC_SL1500_.jpg'
    ],
    category: 'Pet Supplies',
    subCategory: 'Cats',
    specifications: {
      capacity: '3 liters',
      dimensions: '9.0" x 8.3" x 7.7"',
      material: 'BPA-free plastic',
      filter: 'Triple-action filter',
      powerSource: 'Corded Electric',
      features: 'Three water flow settings'
    },
    featured: false
  },
  
  // Office Products
  {
    title: 'Sharpie S-Gel, Gel Pens',
    description: 'Sharpie S-Gel pens feature no-smear, no-bleed technology for smooth, skip-free writing. With a comfortable grip and bold gel ink, these pens are perfect for everyday writing at home, work, or school.',
    brand: 'Sharpie',
    price: 15.99,
    mrp: 19.99,
    discount: 20,
    stock: 120,
    images: [
      'https://m.media-amazon.com/images/I/71Yw8bTXNsL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81Yw9cr1HFL._AC_SL1500_.jpg'
    ],
    category: 'Office Products',
    subCategory: 'Writing Supplies',
    specifications: {
      type: 'Gel pen',
      pointSize: '0.7mm Medium',
      color: 'Black',
      quantity: '12 count',
      features: 'No-smear, no-bleed technology',
      grip: 'Contoured rubber grip'
    },
    featured: false
  },
  {
    title: 'Five Star Spiral Notebooks, College Ruled Paper',
    description: 'Five Star Spiral Notebooks feature durable covers, strong spiral binding, and college-ruled paper that resists ink bleed. With perforated pages for easy tear-out and three-hole punched sheets for binder storage, they\'re perfect for school or work.',
    brand: 'Five Star',
    price: 15.99,
    mrp: 18.99,
    discount: 16,
    stock: 100,
    images: [
      'https://m.media-amazon.com/images/I/81uiMOld0QL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81Dn1kKjHKL._AC_SL1500_.jpg'
    ],
    category: 'Office Products',
    subCategory: 'Notebooks & Writing Pads',
    specifications: {
      size: '8.5" x 11"',
      ruling: 'College ruled',
      sheets: '100 sheets per notebook',
      quantity: '4 pack',
      features: 'Perforated pages, three-hole punched',
      cover: 'Plastic cover with pocket'
    },
    featured: false
  },
  
  // Automotive
  {
    title: 'Chemical Guys HOL169 16-Piece Arsenal Builder Car Wash Kit',
    description: 'The Chemical Guys Car Wash Kit includes everything you need to detail your vehicle like a professional. With premium car wash soap, wax, tire shine, and microfiber towels, you can achieve a showroom-quality finish at home.',
    brand: 'Chemical Guys',
    price: 99.99,
    mrp: 124.99,
    discount: 20,
    stock: 40,
    images: [
      'https://m.media-amazon.com/images/I/91DjHMXjAuL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81Dn1kKjHKL._AC_SL1500_.jpg'
    ],
    category: 'Automotive',
    subCategory: 'Exterior Care',
    specifications: {
      pieces: '16-piece kit',
      includes: 'Car wash soap, wax, tire shine, microfiber towels, applicators, bucket',
      features: 'Professional-grade products',
      usage: 'Interior and exterior detailing',
      suitable: 'All vehicle types',
      storage: 'Bucket doubles as storage'
    },
    featured: false
  },
  {
    title: 'NOCO Boost Plus GB40 1000 Amp 12-Volt UltraSafe Portable Lithium Car Battery Jump Starter',
    description: 'The NOCO Boost Plus GB40 is a portable lithium-ion battery jump starter that delivers 1000 amps for jump starting a dead battery in seconds. It\'s also a portable power bank with a built-in LED flashlight and is rated for over 20 jump starts on a single charge.',
    brand: 'NOCO',
    price: 99.95,
    mrp: 124.95,
    discount: 20,
    stock: 55,
    images: [
      'https://m.media-amazon.com/images/I/71Jd99CXhZL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71nDX36Y9UL._AC_SL1500_.jpg'
    ],
    category: 'Automotive',
    subCategory: 'Tools & Equipment',
    specifications: {
      amperage: '1000 Amps',
      batteryCapacity: '7.0 Wh',
      engineSize: 'Up to 6.0L gas, 3.0L diesel',
      features: 'Spark-proof technology, reverse polarity protection',
      includes: 'Jump starter, USB cable, clamps, storage bag',
      dimensions: '8.3" x 4.1" x 2.4"'
    },
    featured: true
  },
  
  // Health & Household
  {
    title: 'Clorox Disinfecting Wipes, Bleach Free Cleaning Wipes',
    description: 'Clorox Disinfecting Wipes kill 99.9% of viruses and bacteria, including cold and flu viruses. These versatile wipes are perfect for cleaning and disinfecting surfaces throughout your home or office.',
    brand: 'Clorox',
    price: 12.99,
    mrp: 15.99,
    discount: 19,
    stock: 150,
    images: [
      'https://m.media-amazon.com/images/I/81DJAlkPcBL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81qTbBBuRnL._AC_SL1500_.jpg'
    ],
    category: 'Health & Household',
    subCategory: 'Household Supplies',
    specifications: {
      count: '75 wipes per canister, 3-pack',
      scent: 'Fresh Scent',
      killsGerms: '99.9% of viruses and bacteria',
      surface: 'Multi-surface',
      features: 'Bleach-free, disinfecting',
      dimensions: '3.9" x 3.9" x 7.8" per canister'
    },
    featured: false
  },
  {
    title: 'Bounty Quick-Size Paper Towels',
    description: 'Bounty Quick-Size Paper Towels are 2x more absorbent than leading ordinary brand, so you can use less. Each sheet is strong enough to tackle tough messes, making cleanup quick and easy throughout your home.',
    brand: 'Bounty',
    price: 19.99,
    mrp: 24.99,
    discount: 20,
    stock: 130,
    images: [
      'https://m.media-amazon.com/images/I/81UdAjRwUlL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81qTbBBuRnL._AC_SL1500_.jpg'
    ],
    category: 'Health & Household',
    subCategory: 'Household Supplies',
    specifications: {
      count: '8 Family Rolls',
      sheets: '116 sheets per roll',
      equivalent: 'Equal to 20 Regular Rolls',
      features: '2x more absorbent, strong when wet',
      size: 'Quick Size (Select-A-Size)',
      dimensions: '11" x 5.9" x 11"'
    },
    featured: false
  },
  
  // Tools & Home Improvement
  {
    title: 'BLACK+DECKER 20V MAX Cordless Drill / Driver',
    description: 'The BLACK+DECKER 20V MAX Cordless Drill/Driver is perfect for drilling into wood, metal, and plastic, as well as for fastening applications. With an 11-position clutch, LED work light, and lightweight design, it\'s ideal for DIY projects around the home.',
    brand: 'BLACK+DECKER',
    price: 49.00,
    mrp: 59.99,
    discount: 18,
    stock: 70,
    images: [
      'https://m.media-amazon.com/images/I/61Qe63-sjIL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71h5+MbEK7L._AC_SL1500_.jpg'
    ],
    category: 'Tools & Home Improvement',
    subCategory: 'Power Tools',
    specifications: {
      voltage: '20V MAX',
      speed: '0-650 RPM',
      clutch: '11-position clutch',
      chuckSize: '3/8-inch',
      includes: 'Drill/driver, 20V MAX battery, charger',
      weight: '3.15 lbs'
    },
    featured: false
  },
  {
    title: 'DEWALT 20V MAX Impact Driver Kit',
    description: 'The DEWALT 20V MAX Impact Driver Kit delivers 1,500 in-lbs of torque in a compact design, perfect for driving screws and fasteners with ease. With a brushless motor for efficiency and runtime, it\'s a must-have for any toolbox.',
    brand: 'DEWALT',
    price: 139.00,
    mrp: 169.00,
    discount: 18,
    stock: 60,
    images: [
      'https://m.media-amazon.com/images/I/71i6mPGX6FL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71h5+MbEK7L._AC_SL1500_.jpg'
    ],
    category: 'Tools & Home Improvement',
    subCategory: 'Power Tools',
    specifications: {
      voltage: '20V MAX',
      torque: '1,500 in-lbs',
      speed: '0-2,800 RPM',
      impacts: '0-3,200 IPM',
      includes: 'Impact driver, battery, charger, belt hook, kit bag',
      weight: '2.8 lbs'
    },
    featured: true
  }
];

module.exports = predefinedProducts4;
