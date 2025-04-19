const finalProducts = [
  // Electronics
  {
    title: "Google Pixel 7 Pro",
    description: "The Google Pixel 7 Pro features Google's most advanced camera system, the powerful Google Tensor G2 chip, and a stunning 6.7-inch display. With all-day battery life and the most helpful version of Android yet, it's designed to be fast, secure, and helpful.",
    brand: "Google",
    price: 899.00,
    mrp: 999.00,
    discount: 10,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1527&auto=format&fit=crop"
    ],
    category: "Electronics",
    subCategory: "Smartphones",
    specifications: {
      display: "6.7-inch QHD+ LTPO OLED",
      processor: "Google Tensor G2",
      camera: "50MP main, 12MP ultrawide, 48MP telephoto",
      battery: "5000 mAh",
      storage: "128GB",
      os: "Android 13"
    },
    featured: true
  },
  {
    title: "Sonos Beam (Gen 2) Smart Soundbar",
    description: "The Sonos Beam (Gen 2) delivers rich, room-filling sound for TV, music, and more. With Dolby Atmos support, voice assistant compatibility, and easy setup, it's the perfect addition to your home entertainment system.",
    brand: "Sonos",
    price: 449.00,
    mrp: 449.00,
    discount: 0,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Electronics",
    subCategory: "Audio",
    specifications: {
      audio: "Dolby Atmos, 5 Class-D digital amplifiers",
      connectivity: "Wi-Fi, HDMI eARC, Ethernet",
      voiceControl: "Amazon Alexa, Google Assistant",
      dimensions: "25.6\" x 3.9\" x 2.7\"",
      features: "Trueplay tuning, Speech Enhancement",
      compatibility: "Apple AirPlay 2, Sonos app"
    },
    featured: false
  },
  {
    title: "GoPro HERO11 Black",
    description: "The GoPro HERO11 Black captures stunning 5.3K video and 27MP photos with the revolutionary new image sensor. With HyperSmooth 5.0 stabilization, waterproof design, and easy cloud connectivity, it's the ultimate action camera.",
    brand: "GoPro",
    price: 399.99,
    mrp: 499.99,
    discount: 20,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=1386&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526317899290-5427c2ce0244?q=80&w=1471&auto=format&fit=crop"
    ],
    category: "Electronics",
    subCategory: "Cameras",
    specifications: {
      video: "5.3K60, 4K120, 2.7K240",
      photo: "27MP",
      stabilization: "HyperSmooth 5.0",
      waterproof: "33ft (10m)",
      battery: "Enduro Battery",
      features: "TimeWarp 3.0, Hindsight, Scheduled Capture"
    },
    featured: false
  },
  {
    title: "Bose SoundLink Flex Bluetooth Speaker",
    description: "The Bose SoundLink Flex delivers deep, clear sound with powerful bass in a portable, waterproof design. With up to 12 hours of battery life and PositionIQ technology that automatically adjusts to how you position it, it's perfect for outdoor adventures.",
    brand: "Bose",
    price: 149.00,
    mrp: 149.00,
    discount: 0,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Electronics",
    subCategory: "Audio",
    specifications: {
      dimensions: "7.9\" x 2.1\" x 3.6\"",
      weight: "1.3 lbs",
      battery: "Up to 12 hours",
      waterproof: "IP67 rating",
      connectivity: "Bluetooth 5.1",
      features: "PositionIQ technology, built-in microphone"
    },
    featured: false
  },
  {
    title: "Logitech MX Master 3S Wireless Mouse",
    description: "The Logitech MX Master 3S features an 8K DPI optical sensor, quiet clicks, and MagSpeed electromagnetic scrolling. With app-specific customizations and the ability to work on multiple computers, it's the ultimate productivity mouse.",
    brand: "Logitech",
    price: 99.99,
    mrp: 99.99,
    discount: 0,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1465&auto=format&fit=crop"
    ],
    category: "Electronics",
    subCategory: "Computer Accessories",
    specifications: {
      sensor: "8K DPI optical sensor",
      buttons: "7 buttons",
      scrolling: "MagSpeed electromagnetic scrolling",
      battery: "Up to 70 days on full charge",
      connectivity: "Bluetooth, USB receiver",
      compatibility: "Windows, macOS, iPadOS"
    },
    featured: false
  },
  
  // Home & Kitchen
  {
    title: "Philips Hue White and Color Ambiance Starter Kit",
    description: "The Philips Hue Starter Kit includes a bridge and four color bulbs that can be controlled via app or voice. With 16 million colors and warm to cool white light, you can create the perfect ambiance for any moment.",
    brand: "Philips Hue",
    price: 199.99,
    mrp: 219.99,
    discount: 9,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563461661744-2c7e5e72e15e?q=80&w=1471&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    subCategory: "Smart Home",
    specifications: {
      includes: "Hue Bridge, 4 color bulbs",
      bulbType: "A19 E26",
      brightness: "800 lumens",
      colors: "16 million colors, warm to cool white",
      compatibility: "Amazon Alexa, Google Assistant, Apple HomeKit",
      connectivity: "Bluetooth, Zigbee"
    },
    featured: true
  },
  {
    title: "Ninja Foodi 9-in-1 Pressure Cooker and Air Fryer",
    description: "The Ninja Foodi 9-in-1 is a multi-cooker that pressure cooks, air fries, sears, sautés, steams, slow cooks, makes yogurt, and keeps food warm. With TenderCrisp Technology, it quickly cooks ingredients and then gives them a crispy finish.",
    brand: "Ninja",
    price: 199.99,
    mrp: 249.99,
    discount: 20,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622480916113-9000ac49b79d?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    subCategory: "Kitchen Appliances",
    specifications: {
      capacity: "6.5 quart",
      functions: "Pressure cook, air fry, steam, slow cook, yogurt, sear/sauté, bake/roast, broil, dehydrate",
      power: "1460 watts",
      includes: "Cook & crisp basket, reversible rack, pressure lid, crisping lid",
      dimensions: "14.25\" L x 16.75\" W x 13.1\" H",
      weight: "26 lbs"
    },
    featured: false
  },
  {
    title: "Shark IQ Robot Vacuum with Self-Empty Base",
    description: "The Shark IQ Robot Vacuum maps your home and cleans each room methodically. With powerful suction, self-cleaning brushroll, and a self-emptying base that holds up to 30 days of dirt and debris, it delivers hands-free cleaning for weeks.",
    brand: "Shark",
    price: 449.99,
    mrp: 599.99,
    discount: 25,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1603121397474-3a3091828b40?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584792286782-377701c8b5aa?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    subCategory: "Vacuum Cleaners",
    specifications: {
      suction: "High-efficiency suction",
      runtime: "Up to 60 minutes",
      mapping: "Whole-home mapping",
      filtration: "HEPA filtration",
      features: "Self-empty base, self-cleaning brushroll, app control",
      capacity: "30-day capacity dust bin"
    },
    featured: false
  },
  {
    title: "Calphalon Premier Space Saving Nonstick 10-Piece Cookware Set",
    description: "The Calphalon Premier cookware set features a space-saving design that stacks neatly and securely to save 30% more space. With a durable 3-layer nonstick interior and dishwasher-safe construction, it combines performance and convenience.",
    brand: "Calphalon",
    price: 399.99,
    mrp: 499.99,
    discount: 20,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    subCategory: "Cookware",
    specifications: {
      pieces: "10-piece set",
      material: "Hard-anodized aluminum with 3-layer nonstick interior",
      compatibility: "Gas, electric, glass, halogen, induction",
      dishwasherSafe: "Yes",
      ovenSafe: "Up to 450°F",
      includes: "8\" fry pan, 10\" fry pan, 2.5qt sauce pan with cover, 3.5qt sauce pan with cover, 3qt saute pan with cover, 6qt stock pot with cover"
    },
    featured: false
  },
  {
    title: "Ember Temperature Control Smart Mug 2",
    description: "The Ember Mug 2 is a temperature-controlled smart mug that keeps your coffee or tea at your preferred drinking temperature for up to 1.5 hours. Control with your smartphone and receive notifications when your drink has reached the perfect temperature.",
    brand: "Ember",
    price: 129.95,
    mrp: 129.95,
    discount: 0,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572916118970-fb5c8a1cb3de?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    subCategory: "Coffee & Tea",
    specifications: {
      capacity: "10 oz",
      batteryLife: "1.5 hours",
      temperatureRange: "120°F - 145°F",
      features: "LED indicator, auto sleep, app control",
      charging: "Charging coaster included",
      material: "Stainless steel with ceramic coating"
    },
    featured: false
  },
  
  // Clothing
  {
    title: "Columbia Men's Watertight II Rain Jacket",
    description: "The Columbia Watertight II is a lightweight, waterproof rain jacket with Omni-Tech technology for breathable protection. With an adjustable hood, zippered pockets, and packable design, it's perfect for unpredictable weather.",
    brand: "Columbia",
    price: 59.99,
    mrp: 79.99,
    discount: 25,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1605908502724-9093a79a1b39?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1472&auto=format&fit=crop"
    ],
    category: "Clothing",
    subCategory: "Men's",
    specifications: {
      material: "100% nylon shell, 100% polyester mesh lining",
      waterproofing: "Omni-Tech waterproof breathable",
      features: "Adjustable hood, zippered hand pockets",
      closure: "Full-zip front with storm flap",
      packable: "Packs into hand pocket",
      care: "Machine wash cold, tumble dry low"
    },
    featured: false
  },
  {
    title: "Nike Air Zoom Pegasus 39 Women's Running Shoes",
    description: "The Nike Air Zoom Pegasus 39 delivers responsive cushioning and breathable support for runners. With Zoom Air units, a secure midfoot fit, and a durable outsole, it's designed for comfort and performance mile after mile.",
    brand: "Nike",
    price: 120.00,
    mrp: 130.00,
    discount: 8,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Clothing",
    subCategory: "Shoes",
    specifications: {
      material: "Mesh upper, foam midsole",
      cushioning: "Zoom Air units in forefoot and heel",
      closure: "Lace-up",
      weight: "8.3 oz (women's size 8)",
      drop: "10mm",
      features: "Breathable, secure midfoot fit, durable rubber outsole"
    },
    featured: false
  },
  
  // Beauty & Personal Care
  {
    title: "Philips Sonicare DiamondClean Smart 9500 Electric Toothbrush",
    description: "The Philips Sonicare DiamondClean Smart combines superior cleaning technology with app connectivity for personalized guidance. With 5 modes, 3 intensities, and smart brush head recognition, it delivers exceptional oral care.",
    brand: "Philips",
    price: 269.99,
    mrp: 329.99,
    discount: 18,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1559591937-eeab6267b026?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564462670400-63e2eeeb9511?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Beauty & Personal Care",
    subCategory: "Personal Care",
    specifications: {
      modes: "Clean, White+, Deep Clean+, Gum Health, Tongue Care",
      battery: "Up to 14 days of battery life",
      includes: "4 brush heads, charging travel case, charging glass",
      features: "Smart brush head recognition, pressure sensor, location sensor",
      connectivity: "Bluetooth, app connectivity",
      intensity: "3 intensity settings"
    },
    featured: false
  },
  {
    title: "Revlon One-Step Hair Dryer and Volumizer",
    description: "The Revlon One-Step Hair Dryer and Volumizer is a 2-in-1 styling tool that delivers gorgeous volume and brilliant shine in a single step. With ionic technology, ceramic coating, and multiple heat settings, it reduces frizz and styling time.",
    brand: "Revlon",
    price: 39.99,
    mrp: 59.99,
    discount: 33,
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1522338140262-f46f5913618a?q=80&w=1528&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1480&auto=format&fit=crop"
    ],
    category: "Beauty & Personal Care",
    subCategory: "Hair Care",
    specifications: {
      power: "1100 Watts",
      settings: "3 heat/speed settings",
      technology: "Ionic technology, ceramic coating",
      design: "Oval brush design with nylon pin & tufted bristles",
      features: "Lightweight, cool tip, tangle-free swivel cord",
      dimensions: "4.1\" x 11.4\" x 10.1\""
    },
    featured: true
  },
  
  // Sports & Outdoors
  {
    title: "Schwinn IC4 Indoor Cycling Bike",
    description: "The Schwinn IC4 Indoor Cycling Bike offers a connected fitness experience with Bluetooth connectivity to apps like Peloton and Zwift. With 100 levels of resistance, a full color backlit LCD display, and included dumbbells, it's a complete home workout solution.",
    brand: "Schwinn",
    price: 799.99,
    mrp: 999.99,
    discount: 20,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=1389&auto=format&fit=crop"
    ],
    category: "Sports & Outdoors",
    subCategory: "Exercise & Fitness",
    specifications: {
      resistance: "100 levels of magnetic resistance",
      display: "Full color backlit LCD display",
      connectivity: "Bluetooth connectivity to apps",
      includes: "3 lb dumbbells, heart rate armband, USB charging station",
      pedals: "Dual-sided pedals with toe cages and SPD clips",
      dimensions: "48.7\" L x 21.2\" W x 51.8\" H"
    },
    featured: false
  },
  {
    title: "Manduka PRO Yoga Mat",
    description: "The Manduka PRO is a high-density yoga mat that provides unparalleled comfort and cushioning. With a closed-cell surface that prevents moisture absorption and a lifetime guarantee, it's the choice of yoga teachers worldwide.",
    brand: "Manduka",
    price: 120.00,
    mrp: 120.00,
    discount: 0,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Sports & Outdoors",
    subCategory: "Exercise & Fitness",
    specifications: {
      thickness: "6mm",
      length: "71\"",
      width: "26\"",
      weight: "7.5 lbs",
      material: "PVC (latex-free)",
      features: "Closed-cell surface, high-density cushioning, lifetime guarantee"
    },
    featured: false
  },
  
  // Toys & Games
  {
    title: "Wingspan Board Game",
    description: "Wingspan is a competitive bird-collection, engine-building board game. Each bird you play extends a chain of powerful combinations in one of your habitats. With stunning artwork and 170 unique bird cards, it's a beautiful and strategic game for 1-5 players.",
    brand: "Stonemaier Games",
    price: 60.00,
    mrp: 60.00,
    discount: 0,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1606503153255-59d8b2e4739e?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1471&auto=format&fit=crop"
    ],
    category: "Toys & Games",
    subCategory: "Board Games",
    specifications: {
      players: "1-5 players",
      playTime: "40-70 minutes",
      age: "10+ years",
      contents: "170 unique bird cards, 26 bonus cards, 16 Automa cards, 103 food tokens, 75 egg miniatures, 5 player mats, 1 birdfeeder dice tower",
      awards: "Kennerspiel des Jahres Winner 2019",
      designer: "Elizabeth Hargrave"
    },
    featured: false
  },
  {
    title: "DJI Mini 3 Pro Drone",
    description: "The DJI Mini 3 Pro is a lightweight drone with professional-grade features including 4K/60fps video, tri-directional obstacle sensing, and up to 34 minutes of flight time. Weighing less than 249g, it's portable and perfect for capturing stunning aerial content.",
    brand: "DJI",
    price: 759.00,
    mrp: 759.00,
    discount: 0,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1480&auto=format&fit=crop"
    ],
    category: "Electronics",
    subCategory: "Drones",
    specifications: {
      camera: "4K/60fps video, 48MP photos",
      flightTime: "Up to 34 minutes",
      range: "Up to 12 km HD video transmission",
      weight: "< 249g",
      features: "Tri-directional obstacle sensing, FocusTrack, True Vertical Shooting",
      includes: "DJI Mini 3 Pro, DJI RC, Intelligent Flight Battery, shoulder bag"
    },
    featured: true
  },
  {
    title: "Oculus Quest 2 VR Headset",
    description: "The Oculus Quest 2 is an all-in-one VR headset with fast-switching LCD display, 3D positional audio, and intuitive controls. With no PC or console needed, it delivers an immersive virtual reality experience with hundreds of games and experiences.",
    brand: "Meta",
    price: 299.99,
    mrp: 299.99,
    discount: 0,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525459571112-1e8a900d2c95?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Electronics",
    subCategory: "Gaming",
    specifications: {
      storage: "128GB",
      display: "Fast-switching LCD, 1832 x 1920 per eye",
      processor: "Qualcomm Snapdragon XR2",
      audio: "3D positional audio",
      tracking: "6DOF inside-out tracking",
      includes: "VR headset, 2 Touch controllers, charging cable, power adapter"
    },
    featured: true
  }
];

module.exports = finalProducts;
