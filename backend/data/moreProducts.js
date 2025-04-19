const moreProducts = [
  // Toys & Games
  {
    title: "LEGO Star Wars Millennium Falcon",
    description: "Build the iconic Millennium Falcon from Star Wars with this detailed LEGO set. Featuring opening top panels, detailed interior, and minifigures including Han Solo, Chewbacca, and Princess Leia, it's perfect for fans and collectors.",
    brand: "LEGO",
    price: 159.99,
    mrp: 169.99,
    discount: 6,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?q=80&w=1469&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=1471&auto=format&fit=crop"
    ],
    category: "Toys & Games",
    subCategory: "Building Toys",
    specifications: {
      pieces: "1,351",
      age: "9+ years",
      minifigures: "7",
      dimensions: "5\" x 18\" x 12\" when built",
      features: "Detailed interior, removable panels",
      theme: "Star Wars"
    },
    featured: true
  },
  {
    title: "Monopoly Classic Board Game",
    description: "The classic property trading game that brings friends and family together. Buy, sell, dream, and scheme your way to riches as you acquire properties, collect rent, and bankrupt your opponents.",
    brand: "Hasbro",
    price: 19.99,
    mrp: 24.99,
    discount: 20,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1611371805429-12b7e19b2c43?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566694271453-390536dd1f0d?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Toys & Games",
    subCategory: "Board Games",
    specifications: {
      players: "2-8",
      age: "8+ years",
      playTime: "60+ minutes",
      contents: "Game board, 8 tokens, 28 title deed cards, 16 Chance cards, 16 Community Chest cards, money pack, 32 houses, 12 hotels, 2 dice",
      features: "Classic gameplay, family-friendly",
      dimensions: "15.75\" x 10.5\" x 2\""
    },
    featured: false
  },
  {
    title: "Nintendo Switch Pro Controller",
    description: "The Nintendo Switch Pro Controller offers a comfortable gaming experience with motion controls, HD rumble, and amiibo functionality. Its ergonomic design and extended battery life make it perfect for long gaming sessions.",
    brand: "Nintendo",
    price: 69.99,
    mrp: 69.99,
    discount: 0,
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Toys & Games",
    subCategory: "Gaming",
    specifications: {
      compatibility: "Nintendo Switch",
      connectivity: "Bluetooth, USB-C",
      battery: "Up to 40 hours",
      features: "Motion controls, HD rumble, amiibo functionality",
      weight: "8.8 oz",
      dimensions: "6.3\" x 5.9\" x 2.7\""
    },
    featured: false
  },
  {
    title: "Barbie Dreamhouse",
    description: "The Barbie Dreamhouse is a three-story dollhouse with 8 rooms, a working elevator, pool with slide, and over 70 accessories. With lights, sounds, and transforming features, it's the ultimate play experience for Barbie fans.",
    brand: "Mattel",
    price: 199.99,
    mrp: 219.99,
    discount: 9,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1598465185929-8bdd3c2c7eea?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559535332-db9971090158?q=80&w=1631&auto=format&fit=crop"
    ],
    category: "Toys & Games",
    subCategory: "Dolls & Accessories",
    specifications: {
      dimensions: "43\" x 41\" x 15\"",
      rooms: "8 rooms, 3 stories",
      features: "Working elevator, pool with slide, lights and sounds",
      accessories: "70+ pieces",
      age: "3+ years",
      assembly: "Adult assembly required"
    },
    featured: false
  },
  {
    title: "Nerf Elite 2.0 Commander RD-6 Blaster",
    description: "The Nerf Elite 2.0 Commander RD-6 Blaster features a 6-dart rotating drum, tactical rails for customization, and fires darts up to 90 feet. Perfect for indoor or outdoor play, it's a must-have for Nerf battles.",
    brand: "Nerf",
    price: 14.99,
    mrp: 19.99,
    discount: 25,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1563396983906-b3795482a59a?q=80&w=1472&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Toys & Games",
    subCategory: "Action Toys",
    specifications: {
      capacity: "6-dart rotating drum",
      range: "Up to 90 feet",
      includes: "6 Nerf Elite darts",
      features: "Tactical rails, slam-fire action",
      age: "8+ years",
      batteries: "No batteries required"
    },
    featured: false
  },
  
  // Sports & Outdoors
  {
    title: "Hydro Flask 32 oz Wide Mouth Water Bottle",
    description: "The Hydro Flask 32 oz Wide Mouth bottle keeps beverages cold for up to 24 hours or hot for up to 12 hours with TempShield insulation. Made from pro-grade stainless steel with a powder coat finish, it's perfect for hiking, gym, or everyday use.",
    brand: "Hydro Flask",
    price: 44.95,
    mrp: 44.95,
    discount: 0,
    stock: 70,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523362289600-a70b4a0e09aa?q=80&w=1480&auto=format&fit=crop"
    ],
    category: "Sports & Outdoors",
    subCategory: "Outdoor Recreation",
    specifications: {
      capacity: "32 oz",
      material: "18/8 Pro-Grade Stainless Steel",
      insulation: "TempShield double-wall vacuum",
      lid: "Wide Mouth Flex Cap",
      features: "BPA-free, dishwasher safe",
      dimensions: "3.58\" diameter, 9.4\" height"
    },
    featured: false
  },
  {
    title: "Coleman Sundome Tent",
    description: "The Coleman Sundome Tent sets up in just 10 minutes with its WeatherTec system and welded floors to keep you dry. Large windows and a ground vent provide superior ventilation, while the E-Port makes it easy to bring electrical power inside.",
    brand: "Coleman",
    price: 79.99,
    mrp: 99.99,
    discount: 20,
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Sports & Outdoors",
    subCategory: "Camping & Hiking",
    specifications: {
      capacity: "4-Person",
      dimensions: "9' x 7' with 4'11\" center height",
      setup: "10 minutes",
      weatherproofing: "WeatherTec System, welded floors",
      ventilation: "Large windows and ground vent",
      weight: "9.8 lbs"
    },
    featured: false
  },
  {
    title: "Bowflex SelectTech 552 Adjustable Dumbbells",
    description: "The Bowflex SelectTech 552 Adjustable Dumbbells replace 15 sets of weights with a space-saving design. With a simple dial turn, you can adjust from 5 to 52.5 pounds, making them perfect for home gyms and versatile strength training.",
    brand: "Bowflex",
    price: 429.00,
    mrp: 549.00,
    discount: 22,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Sports & Outdoors",
    subCategory: "Exercise & Fitness",
    specifications: {
      weightRange: "5 to 52.5 lbs per dumbbell",
      increments: "2.5 lbs (up to 25 lbs), 5 lbs (25-50 lbs)",
      replaces: "15 sets of weights",
      dimensions: "15.75\" L x 8\" W x 9\" H (each)",
      material: "Metal plates with durable molding",
      warranty: "2-year parts"
    },
    featured: true
  },
  {
    title: "Garmin Forerunner 245 Music GPS Running Smartwatch",
    description: "The Garmin Forerunner 245 Music is a GPS running smartwatch with advanced training features, music storage, and performance monitoring. It provides detailed metrics on running dynamics, recovery time, and training status to help improve performance.",
    brand: "Garmin",
    price: 299.99,
    mrp: 349.99,
    discount: 14,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1527&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Sports & Outdoors",
    subCategory: "Exercise & Fitness",
    specifications: {
      display: "1.2\" transflective MIP",
      battery: "Up to 7 days (smartwatch), 6 hours (GPS with music)",
      storage: "Up to 500 songs",
      connectivity: "Bluetooth, ANT+",
      features: "GPS, heart rate monitor, VO2 max, training status",
      waterRating: "5 ATM"
    },
    featured: false
  },
  {
    title: "Osprey Atmos AG 65 Backpack",
    description: "The Osprey Atmos AG 65 features Anti-Gravity suspension that contours to your body, providing outstanding load transfer and comfort. With an adjustable harness, multiple pockets, and integrated rain cover, it's perfect for multi-day backpacking trips.",
    brand: "Osprey",
    price: 270.00,
    mrp: 300.00,
    discount: 10,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1622260614153-03223fb72052?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501554728187-ce583db33af7?q=80&w=1473&auto=format&fit=crop"
    ],
    category: "Sports & Outdoors",
    subCategory: "Camping & Hiking",
    specifications: {
      capacity: "65 liters",
      weight: "4.5 lbs",
      torsoFit: "Adjustable",
      suspension: "Anti-Gravity (AG)",
      features: "Integrated rain cover, sleeping bag compartment, trekking pole attachment",
      material: "Nylon"
    },
    featured: false
  },
  
  // Grocery & Gourmet Food
  {
    title: "Ghirardelli Chocolate Squares Premium Assortment",
    description: "Ghirardelli Chocolate Squares feature an assortment of premium filled chocolates including milk chocolate with caramel, dark chocolate with raspberry, and dark chocolate with mint. Perfect for sharing or indulging yourself.",
    brand: "Ghirardelli",
    price: 19.99,
    mrp: 24.99,
    discount: 20,
    stock: 80,
    images: [
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Grocery & Gourmet Food",
    subCategory: "Candy & Chocolate",
    specifications: {
      count: "72 pieces",
      weight: "15.9 oz",
      flavors: "Milk Chocolate Caramel, Dark Chocolate Raspberry, Dark Chocolate Mint, and more",
      ingredients: "Premium chocolate, natural flavors",
      allergens: "Contains milk, soy. May contain nuts",
      storage: "Store in a cool, dry place"
    },
    featured: false
  },
  {
    title: "Nespresso Vertuo Coffee and Espresso Machine by Breville",
    description: "The Nespresso Vertuo by Breville brews both coffee and espresso with the touch of a button. Using barcode recognition, it automatically adjusts brewing parameters for each capsule, delivering perfect crema-rich coffee every time.",
    brand: "Nespresso",
    price: 199.95,
    mrp: 249.95,
    discount: 20,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572119865084-43c285814d63?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Grocery & Gourmet Food",
    subCategory: "Coffee & Tea",
    specifications: {
      cupSizes: "5 cup sizes (1.35 oz, 2.7 oz, 5 oz, 8 oz, 14 oz)",
      heatUp: "15-20 seconds",
      waterTank: "40 oz removable water tank",
      dimensions: "8.3\" W x 11.91\" D x 11.93\" H",
      includes: "Welcome set with 12 Nespresso Vertuo capsules",
      features: "Automatic capsule ejection, energy-saving mode"
    },
    featured: true
  },
  {
    title: "Truff Hot Sauce, Gourmet Black Truffle",
    description: "TRUFF Hot Sauce combines ripe chili peppers, organic agave nectar, black truffle, and savory spices to create a gourmet hot sauce experience. The perfect balance of heat, flavor, and luxury makes it ideal for elevating any dish.",
    brand: "Truff",
    price: 17.98,
    mrp: 19.99,
    discount: 10,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1589895224616-64f269a49b97?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Grocery & Gourmet Food",
    subCategory: "Condiments & Sauces",
    specifications: {
      size: "6 oz",
      ingredients: "Chili peppers, vinegar, black truffle, organic agave nectar, salt, organic cumin",
      heat: "Medium",
      features: "Gluten-free, non-GMO",
      usage: "Ideal for pasta, pizza, eggs, meat, and more",
      storage: "Refrigerate after opening"
    },
    featured: false
  },
  
  // Pet Supplies
  {
    title: "Furbo Dog Camera",
    description: "The Furbo Dog Camera lets you see, talk, and toss treats to your dog when you're away. With 1080p HD video, night vision, and barking alerts, you can check on your pet anytime through the smartphone app.",
    brand: "Furbo",
    price: 169.00,
    mrp: 199.00,
    discount: 15,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1364&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1471&auto=format&fit=crop"
    ],
    category: "Pet Supplies",
    subCategory: "Dogs",
    specifications: {
      camera: "1080p HD with night vision",
      audio: "2-way audio",
      treats: "Compatible with round treats 0.4\" in diameter",
      connectivity: "Wi-Fi",
      features: "Barking alerts, treat tossing, dog selfie",
      dimensions: "5.9\" x 4.7\" x 8.9\""
    },
    featured: false
  },
  {
    title: "PetSafe ScoopFree Ultra Self-Cleaning Cat Litter Box",
    description: "The PetSafe ScoopFree Ultra is an automatic self-cleaning litter box that uses crystal litter to absorb urine and dehydrate solid waste. With a health counter and privacy hood, it provides weeks of fresh, clean litter with minimal maintenance.",
    brand: "PetSafe",
    price: 199.95,
    mrp: 229.95,
    discount: 13,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1460&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Pet Supplies",
    subCategory: "Cats",
    specifications: {
      dimensions: "27.5\" x 19\" x 16\"",
      weight: "19 lbs",
      power: "AC adapter (included)",
      features: "Automatic raking system, health counter, privacy hood",
      includes: "1 litter tray with lid, 1 bag of crystal litter",
      maintenance: "Replace tray every 20-30 days for one cat"
    },
    featured: false
  },
  
  // Automotive
  {
    title: "NOCO Boost Plus GB40 1000 Amp 12-Volt UltraSafe Portable Lithium Car Battery Jump Starter",
    description: "The NOCO Boost Plus GB40 is a portable lithium-ion battery jump starter that delivers 1000 amps for jump starting a dead battery in seconds. It's also a portable power bank with a built-in LED flashlight and is rated for over 20 jump starts on a single charge.",
    brand: "NOCO",
    price: 99.95,
    mrp: 124.95,
    discount: 20,
    stock: 55,
    images: [
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1483&auto=format&fit=crop"
    ],
    category: "Automotive",
    subCategory: "Tools & Equipment",
    specifications: {
      amperage: "1000 Amps",
      batteryCapacity: "7.0 Wh",
      engineSize: "Up to 6.0L gas, 3.0L diesel",
      features: "Spark-proof technology, reverse polarity protection",
      includes: "Jump starter, USB cable, clamps, storage bag",
      dimensions: "8.3\" x 4.1\" x 2.4\""
    },
    featured: true
  }
];

module.exports = moreProducts;
