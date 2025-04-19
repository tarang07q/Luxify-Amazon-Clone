const predefinedProducts2 = [
  // Home & Kitchen - Kitchen Appliances
  {
    title: 'Ninja DZ201 Foodi 8 Quart 6-in-1 DualZone Air Fryer',
    description: 'The Ninja Foodi DualZone Air Fryer features two independent cooking baskets that let you cook two foods, two ways, at the same time. With 6 versatile cooking programs and a large 8-quart capacity, it\'s perfect for preparing family meals quickly and healthily.',
    brand: 'Ninja',
    price: 179.99,
    mrp: 199.99,
    discount: 10,
    stock: 45,
    images: [
      'https://m.media-amazon.com/images/I/81v+8VM2zrL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81wVHJWjXrL._AC_SL1500_.jpg'
    ],
    category: 'Home & Kitchen',
    subCategory: 'Kitchen Appliances',
    specifications: {
      capacity: '8 Quart (4 Quart per basket)',
      functions: 'Air Fry, Air Broil, Roast, Bake, Reheat, Dehydrate',
      temperature: '105°F–450°F',
      technology: 'DualZone Technology',
      power: '1690 watts'
    },
    featured: true
  },
  {
    title: 'Instant Pot Duo Plus 9-in-1 Electric Pressure Cooker',
    description: 'The Instant Pot Duo Plus is a 9-in-1 programmable cooker that replaces multiple kitchen appliances. With advanced microprocessor technology, it speeds up cooking by up to 70% while delivering consistent, delicious results every time.',
    brand: 'Instant Pot',
    price: 129.95,
    mrp: 149.99,
    discount: 13,
    stock: 60,
    images: [
      'https://m.media-amazon.com/images/I/71Nw1oa1ToL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81U-qU2R3FL._AC_SL1500_.jpg'
    ],
    category: 'Home & Kitchen',
    subCategory: 'Kitchen Appliances',
    specifications: {
      capacity: '6 Quart',
      functions: 'Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté Pan, Yogurt Maker, Warmer, Sterilizer, Cake Maker',
      programs: '15 one-touch programs',
      material: 'Stainless steel',
      power: '1000W'
    },
    featured: true
  },
  
  // Home & Kitchen - Furniture
  {
    title: 'VASAGLE Industrial Coffee Table',
    description: 'This industrial-style coffee table combines rustic brown wood with a sturdy metal frame for a vintage look that complements any living room. The mesh shelf provides additional storage space for magazines, books, or decorative items.',
    brand: 'VASAGLE',
    price: 69.99,
    mrp: 89.99,
    discount: 22,
    stock: 40,
    images: [
      'https://m.media-amazon.com/images/I/81QcqLn+OpL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81Oa0xU9IYL._AC_SL1500_.jpg'
    ],
    category: 'Home & Kitchen',
    subCategory: 'Furniture',
    specifications: {
      dimensions: '41.8"L x 23.7"W x 17.7"H',
      material: 'Engineered wood, metal frame',
      style: 'Industrial/Rustic',
      assembly: 'Assembly required',
      weight: '28.7 pounds',
      capacity: '264 pounds'
    },
    featured: false
  },
  {
    title: 'Sauder North Avenue Sofa Table',
    description: 'The Sauder North Avenue Sofa Table features a minimalist design with a charter oak finish and black metal frame. Perfect for entryways, living rooms, or behind sofas, it provides both style and functionality to your home.',
    brand: 'Sauder',
    price: 109.99,
    mrp: 129.99,
    discount: 15,
    stock: 35,
    images: [
      'https://m.media-amazon.com/images/I/71Yx6jQKFkL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71Yx6jQKFkL._AC_SL1500_.jpg'
    ],
    category: 'Home & Kitchen',
    subCategory: 'Furniture',
    specifications: {
      dimensions: '41.5"W x 15.5"D x 29.5"H',
      material: 'Engineered wood, metal frame',
      style: 'Industrial/Modern',
      assembly: 'Assembly required',
      weight: '34 pounds',
      finish: 'Charter Oak'
    },
    featured: false
  },
  
  // Home & Kitchen - Bedding
  {
    title: 'Beckham Hotel Collection Bed Pillows',
    description: 'The Beckham Hotel Collection Pillows offer hotel-quality comfort with a no-shift construction that provides proper alignment and support. Filled with a soft down alternative and encased in a 250 thread count cover, they\'re perfect for all sleeping positions.',
    brand: 'Beckham Luxury Linens',
    price: 42.99,
    mrp: 49.99,
    discount: 14,
    stock: 70,
    images: [
      'https://m.media-amazon.com/images/I/71XMpZ8SbEL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71u9BmBXxsL._AC_SL1500_.jpg'
    ],
    category: 'Home & Kitchen',
    subCategory: 'Bedding',
    specifications: {
      size: 'Queen',
      material: 'Down alternative fill, cotton cover',
      threadCount: '250',
      care: 'Machine washable',
      quantity: '2-pack',
      suitable: 'All sleeping positions'
    },
    featured: false
  },
  {
    title: 'Bedsure Fleece Blanket Throw Size',
    description: 'The Bedsure Fleece Blanket offers exceptional softness and warmth with its premium microfiber construction. Perfect for couches, beds, or outdoor use, this versatile blanket is available in multiple colors to match any decor.',
    brand: 'Bedsure',
    price: 19.99,
    mrp: 24.99,
    discount: 20,
    stock: 80,
    images: [
      'https://m.media-amazon.com/images/I/81+FCBBJ+mL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71Oc+yBPTgL._AC_SL1500_.jpg'
    ],
    category: 'Home & Kitchen',
    subCategory: 'Bedding',
    specifications: {
      size: '50" x 60" (Throw)',
      material: '100% Microfiber Polyester',
      weight: '260 GSM',
      care: 'Machine washable',
      features: 'Shrink-resistant, fade-resistant',
      style: 'Lightweight'
    },
    featured: false
  },
  
  // Clothing - Men's
  {
    title: 'Carhartt Men\'s Loose Fit Heavyweight Short-Sleeve T-Shirt',
    description: 'This Carhartt heavyweight t-shirt is built tough for work or casual wear. Made from durable cotton jersey with a relaxed fit, it features a rib-knit crewneck, side-seamed construction to minimize twisting, and a tagless neck label for comfort.',
    brand: 'Carhartt',
    price: 19.99,
    mrp: 24.99,
    discount: 20,
    stock: 100,
    images: [
      'https://m.media-amazon.com/images/I/91BFHwlbDtL._AC_UX679_.jpg',
      'https://m.media-amazon.com/images/I/81Iqf8KPiIL._AC_UX679_.jpg'
    ],
    category: 'Clothing',
    subCategory: 'Men\'s',
    specifications: {
      material: '100% Cotton',
      fit: 'Loose Fit',
      weight: 'Heavyweight',
      care: 'Machine Wash',
      features: 'Tagless neck label, rib-knit crewneck',
      origin: 'Imported'
    },
    featured: false
  },
  {
    title: 'Levi\'s Men\'s 505 Regular Fit Jeans',
    description: 'The Levi\'s 505 Regular Fit Jeans sit at the waist and are straight through the hip and thigh with a straight leg opening. Made with durable denim and classic 5-pocket styling, they\'re the perfect everyday jeans for work or casual wear.',
    brand: 'Levi\'s',
    price: 39.99,
    mrp: 59.50,
    discount: 33,
    stock: 85,
    images: [
      'https://m.media-amazon.com/images/I/61PQxv+IcqL._AC_UX679_.jpg',
      'https://m.media-amazon.com/images/I/71pf5j5qOdL._AC_UX679_.jpg'
    ],
    category: 'Clothing',
    subCategory: 'Men\'s',
    specifications: {
      material: '100% Cotton',
      fit: 'Regular Fit',
      closure: 'Zip fly with button',
      rise: 'Sits at waist',
      leg: 'Straight leg',
      care: 'Machine wash'
    },
    featured: false
  },
  
  // Clothing - Women's
  {
    title: 'Amazon Essentials Women\'s Classic-Fit Lightweight Long-Sleeve Crewneck Sweater',
    description: 'This Amazon Essentials sweater features a classic crewneck design in a lightweight, soft-touch cotton blend. With a comfortable fit and versatile style, it\'s perfect for layering or wearing on its own throughout the year.',
    brand: 'Amazon Essentials',
    price: 22.90,
    mrp: 29.90,
    discount: 23,
    stock: 90,
    images: [
      'https://m.media-amazon.com/images/I/71nGOANcFJL._AC_UY741_.jpg',
      'https://m.media-amazon.com/images/I/71jlppwpjmL._AC_UY741_.jpg'
    ],
    category: 'Clothing',
    subCategory: 'Women\'s',
    specifications: {
      material: '60% Cotton, 40% Polyester',
      fit: 'Classic-fit',
      neckline: 'Crewneck',
      sleeve: 'Long sleeve',
      care: 'Machine wash',
      features: 'Ribbed cuffs and hem'
    },
    featured: false
  },
  {
    title: 'Hanes Women\'s EcoSmart Crewneck Sweatshirt',
    description: 'This Hanes EcoSmart sweatshirt is made with soft, medium-weight fleece for comfort and warmth. With a classic crewneck design and ribbed cuffs and waistband, it\'s perfect for casual wear, workouts, or lounging at home.',
    brand: 'Hanes',
    price: 14.99,
    mrp: 22.00,
    discount: 32,
    stock: 95,
    images: [
      'https://m.media-amazon.com/images/I/91JTWDxKWOL._AC_UX679_.jpg',
      'https://m.media-amazon.com/images/I/81RQnBdg0ML._AC_UX679_.jpg'
    ],
    category: 'Clothing',
    subCategory: 'Women\'s',
    specifications: {
      material: '50% Cotton, 50% Polyester',
      fit: 'Regular fit',
      neckline: 'Crewneck',
      sleeve: 'Long sleeve',
      care: 'Machine wash',
      features: 'EcoSmart fabric contains recycled plastic bottles'
    },
    featured: false
  }
];

module.exports = predefinedProducts2;
