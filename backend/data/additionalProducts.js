const additionalProducts = [
  // More Electronics
  {
    title: "LG OLED C2 Series 65-inch 4K Smart TV",
    description: "Experience stunning picture quality with perfect blacks and over a billion colors. The LG OLED C2 features Dolby Vision, Dolby Atmos, and NVIDIA G-SYNC for an immersive viewing and gaming experience.",
    brand: "LG",
    price: 1799.99,
    mrp: 2099.99,
    discount: 14,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601944177325-f8867652837f?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Electronics",
    subCategory: "TVs",
    specifications: {
      display: "65-inch 4K OLED",
      processor: "α9 Gen5 AI Processor",
      hdr: "Dolby Vision, HDR10, HLG",
      audio: "Dolby Atmos",
      connectivity: "HDMI 2.1, Wi-Fi, Bluetooth",
      smartFeatures: "webOS, ThinQ AI"
    },
    featured: true
  },
  {
    title: "Bose QuietComfort 45 Wireless Noise Cancelling Headphones",
    description: "The Bose QuietComfort 45 headphones deliver best-in-class noise cancellation with high-fidelity audio. With up to 24 hours of battery life and a comfortable design, they're perfect for all-day listening.",
    brand: "Bose",
    price: 279.99,
    mrp: 329.99,
    discount: 15,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Electronics",
    subCategory: "Headphones",
    specifications: {
      type: "Over-ear",
      connectivity: "Bluetooth 5.1",
      noiseCancellation: "Active Noise Cancellation",
      batteryLife: "Up to 24 hours",
      charging: "USB-C",
      weight: "240g"
    },
    featured: false
  },
  {
    title: "Canon EOS R6 Mark II Mirrorless Camera",
    description: "The Canon EOS R6 Mark II is a professional-grade mirrorless camera with a 24.2MP full-frame CMOS sensor, 4K60p video recording, and advanced autofocus. Perfect for photographers and videographers who demand exceptional performance.",
    brand: "Canon",
    price: 2499.99,
    mrp: 2699.99,
    discount: 7,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1528&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Electronics",
    subCategory: "Cameras",
    specifications: {
      sensor: "24.2MP Full-Frame CMOS",
      processor: "DIGIC X",
      iso: "100-102400 (expandable to 204800)",
      video: "4K60p, 1080p120",
      autofocus: "Dual Pixel CMOS AF II",
      stabilization: "5-axis In-Body Image Stabilization"
    },
    featured: true
  },
  {
    title: "Nintendo Switch OLED Model",
    description: "The Nintendo Switch OLED Model features a vibrant 7-inch OLED screen, enhanced audio, 64GB of internal storage, and a wired LAN port in the dock. Experience your favorite games at home or on the go with improved visuals and sound.",
    brand: "Nintendo",
    price: 349.99,
    mrp: 349.99,
    discount: 0,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Electronics",
    subCategory: "Gaming",
    specifications: {
      display: "7-inch OLED",
      storage: "64GB (expandable)",
      battery: "4.5-9 hours",
      modes: "TV, Tabletop, Handheld",
      connectivity: "Wi-Fi, Bluetooth, Wired LAN (dock)",
      includes: "Console, Dock, Joy-Con controllers"
    },
    featured: true
  },
  {
    title: "Dyson V15 Detect Cordless Vacuum Cleaner",
    description: "The Dyson V15 Detect features a laser that reveals microscopic dust, an LCD screen that displays particle counts, and powerful suction for deep cleaning. With up to 60 minutes of run time, it's the ultimate cordless cleaning solution.",
    brand: "Dyson",
    price: 699.99,
    mrp: 749.99,
    discount: 7,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    subCategory: "Vacuum Cleaners",
    specifications: {
      suction: "230 AW",
      runtime: "Up to 60 minutes",
      dustbin: "0.76L",
      weight: "6.8 lbs",
      filtration: "Whole-machine HEPA filtration",
      features: "Laser Slim Fluffy cleaner head, LCD screen, acoustic dust sensing"
    },
    featured: false
  },

  // Home & Kitchen
  {
    title: "KitchenAid Artisan Series 5-Quart Stand Mixer",
    description: "The KitchenAid Artisan Stand Mixer is a versatile kitchen essential with 10 speeds and a powerful motor. It comes with a dough hook, flat beater, and wire whip attachments, making it perfect for everything from kneading bread to whipping cream.",
    brand: "KitchenAid",
    price: 399.99,
    mrp: 449.99,
    discount: 11,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1594046243098-0fceea9d451e?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578738288760-05ce9be719d3?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    subCategory: "Kitchen Appliances",
    specifications: {
      capacity: "5 Quart",
      power: "325 Watts",
      speeds: "10",
      attachments: "Dough hook, flat beater, wire whip",
      material: "Die-cast metal",
      weight: "26 lbs"
    },
    featured: true
  },
  {
    title: "Breville Barista Express Espresso Machine",
    description: "The Breville Barista Express delivers third wave specialty coffee at home. With an integrated conical burr grinder, precise extraction, and micro-foam milk texturing, you can create café quality coffee right in your kitchen.",
    brand: "Breville",
    price: 699.95,
    mrp: 749.95,
    discount: 7,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1612888077747-e7d23f0ee0f6?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    subCategory: "Coffee & Espresso",
    specifications: {
      grinder: "Integrated conical burr grinder",
      pressure: "15 Bar Italian pump",
      steamWand: "Manual microfoam milk texturing",
      waterTank: "67 oz",
      filter: "1 & 2 cup single & dual wall filter baskets",
      dimensions: "13.25\" x 12.5\" x 15.75\""
    },
    featured: false
  },
  {
    title: "Le Creuset Signature Enameled Cast Iron Round Dutch Oven",
    description: "The Le Creuset Dutch Oven is a versatile kitchen essential that delivers superior heat distribution and retention. Perfect for slow-cooking, braising, and baking, its colorful exterior enamel resists chipping and cracking.",
    brand: "Le Creuset",
    price: 369.95,
    mrp: 399.95,
    discount: 8,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1585442231525-a41e8aa38cce?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584990347449-a9e4f10cce6c?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    subCategory: "Cookware",
    specifications: {
      capacity: "5.5 Quart",
      material: "Enameled Cast Iron",
      compatibility: "Gas, electric, ceramic, induction, oven, outdoor grill",
      dishwasherSafe: "Yes",
      weight: "11.5 lbs",
      madeIn: "France"
    },
    featured: false
  },
  {
    title: "Vitamix 5200 Blender",
    description: "The Vitamix 5200 is a professional-grade blender with variable speed control and a powerful motor. From smoothies and hot soups to nut butters and frozen desserts, it can handle any blending task with ease.",
    brand: "Vitamix",
    price: 449.95,
    mrp: 549.95,
    discount: 18,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619067581557-1a779a3f2d3c?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    subCategory: "Kitchen Appliances",
    specifications: {
      power: "1380 Watts",
      capacity: "64 oz",
      speed: "Variable, 10 settings",
      blade: "Stainless-steel hammermill cutting blades",
      height: "20.5 inches",
      warranty: "7-year full warranty"
    },
    featured: true
  },
  {
    title: "Roomba j7+ Robot Vacuum with Automatic Dirt Disposal",
    description: "The Roomba j7+ robot vacuum uses PrecisionVision Navigation to avoid obstacles and clean when you're away. With an automatic dirt disposal base that holds up to 60 days of dirt, it's a hands-free cleaning solution.",
    brand: "iRobot",
    price: 799.99,
    mrp: 899.99,
    discount: 11,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?q=80&w=1476&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1480&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    subCategory: "Vacuum Cleaners",
    specifications: {
      navigation: "PrecisionVision Navigation",
      suction: "10x Power-Lifting Suction",
      runtime: "Up to 75 minutes",
      features: "Automatic dirt disposal, obstacle avoidance, smart mapping",
      control: "App, voice assistant compatible",
      dimensions: "13.3\" x 13.3\" x 3.4\""
    },
    featured: false
  },

  // Clothing
  {
    title: "The North Face Men's Thermoball Eco Jacket",
    description: "The North Face Thermoball Eco Jacket provides lightweight warmth in a stylish, packable design. Made with recycled materials, it delivers exceptional insulation even when wet, making it perfect for unpredictable weather.",
    brand: "The North Face",
    price: 199.99,
    mrp: 229.99,
    discount: 13,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1472&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Clothing",
    subCategory: "Men's",
    specifications: {
      material: "100% recycled polyester",
      insulation: "ThermoBall Eco",
      closure: "Full-zip front",
      pockets: "Secure-zip hand pockets",
      packable: "Stows in own pocket",
      weight: "15.2 oz"
    },
    featured: false
  },
  {
    title: "Patagonia Women's Better Sweater Fleece Jacket",
    description: "The Patagonia Better Sweater combines the look of a sweater with the performance of a technical fleece. Made with 100% recycled polyester, it provides warmth without bulk and features a stand-up collar for additional comfort.",
    brand: "Patagonia",
    price: 149.00,
    mrp: 149.00,
    discount: 0,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Clothing",
    subCategory: "Women's",
    specifications: {
      material: "100% recycled polyester fleece",
      closure: "Full-zip with wind flap",
      pockets: "Zippered handwarmer pockets, chest pocket",
      features: "Stand-up collar, Fair Trade Certified sewn",
      care: "Machine wash cold, tumble dry low",
      weight: "16 oz"
    },
    featured: true
  },
  {
    title: "Adidas Ultraboost 22 Running Shoes",
    description: "The Adidas Ultraboost 22 delivers incredible energy return and comfort for runners. With a responsive Boost midsole, adaptive Primeknit upper, and Continental rubber outsole, it's designed for performance and all-day comfort.",
    brand: "Adidas",
    price: 189.99,
    mrp: 189.99,
    discount: 0,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1450&auto=format&fit=crop"
    ],
    category: "Clothing",
    subCategory: "Shoes",
    specifications: {
      material: "Primeknit textile upper",
      midsole: "Boost cushioning",
      outsole: "Continental Rubber",
      weight: "10.9 oz",
      drop: "10mm",
      sustainability: "Made with recycled content"
    },
    featured: true
  },
  {
    title: "Ray-Ban Aviator Classic Sunglasses",
    description: "The iconic Ray-Ban Aviator sunglasses feature the timeless teardrop shape that started it all. With metal frames, crystal lenses, and 100% UV protection, they combine style and functionality in a legendary design.",
    brand: "Ray-Ban",
    price: 161.00,
    mrp: 179.00,
    discount: 10,
    stock: 75,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1480&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1480&auto=format&fit=crop"
    ],
    category: "Clothing",
    subCategory: "Accessories",
    specifications: {
      frame: "Metal",
      lenses: "Crystal glass, 100% UV protection",
      style: "Pilot/Aviator",
      size: "58mm lens width",
      includes: "Protective case, cleaning cloth",
      origin: "Made in Italy"
    },
    featured: false
  },
  {
    title: "Lululemon Align High-Rise Pant",
    description: "The Lululemon Align Pant is designed to minimize distractions and maximize comfort during yoga. Made with buttery-soft Nulu fabric, these leggings feel weightless and feature a high-rise waistband for coverage and support.",
    brand: "Lululemon",
    price: 98.00,
    mrp: 98.00,
    discount: 0,
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=1474&auto=format&fit=crop"
    ],
    category: "Clothing",
    subCategory: "Women's",
    specifications: {
      material: "Nulu fabric (81% Nylon, 19% Lycra elastane)",
      rise: "High-rise",
      length: "28 inch inseam",
      features: "Hidden waistband pocket, four-way stretch",
      care: "Machine wash cold, tumble dry low",
      fit: "Tight"
    },
    featured: false
  },

  // Beauty & Personal Care
  {
    title: "Dyson Airwrap Multi-Styler Complete",
    description: "The Dyson Airwrap uses Coanda airflow to curl, wave, smooth, and dry hair without extreme heat. This complete set includes multiple attachments for different hair types and styles, delivering salon-quality results at home.",
    brand: "Dyson",
    price: 599.99,
    mrp: 599.99,
    discount: 0,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1522338140262-f46f5913618a?q=80&w=1528&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1480&auto=format&fit=crop"
    ],
    category: "Beauty & Personal Care",
    subCategory: "Hair Care",
    specifications: {
      technology: "Coanda effect, intelligent heat control",
      attachments: "6 styling attachments",
      heatSettings: "3 precise heat settings",
      power: "1300W",
      includes: "Storage case, filter cleaning brush",
      warranty: "2-year"
    },
    featured: true
  },
  {
    title: "La Mer Crème de la Mer Moisturizing Cream",
    description: "La Mer's legendary moisturizing cream with Miracle Broth™ helps heal dryness and improve the appearance of fine lines. This ultra-rich cream delivers deep moisture and transforms skin to appear more radiant and youthful.",
    brand: "La Mer",
    price: 190.00,
    mrp: 190.00,
    discount: 0,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1376&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4ee0e57?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Beauty & Personal Care",
    subCategory: "Skin Care",
    specifications: {
      size: "1 oz",
      formulation: "Cream",
      skinType: "Dry, Normal, Combination",
      keyIngredients: "Miracle Broth™, lime tea, antioxidants",
      features: "Fragrance-free option available",
      application: "Warm between fingers before applying"
    },
    featured: false
  },
  {
    title: "Olaplex No. 3 Hair Perfector",
    description: "Olaplex No. 3 is a take-home treatment that reduces breakage and visibly strengthens hair. This bond-building formula repairs damaged hair from within, improving its look and feel while protecting from future damage.",
    brand: "Olaplex",
    price: 28.00,
    mrp: 28.00,
    discount: 0,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1626108860850-3b84afc12438?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599751449628-8e4d764373fd?q=80&w=1469&auto=format&fit=crop"
    ],
    category: "Beauty & Personal Care",
    subCategory: "Hair Care",
    specifications: {
      size: "3.3 oz",
      formulation: "Liquid",
      hairType: "All hair types",
      features: "Vegan, cruelty-free, color-safe",
      use: "Weekly treatment",
      benefits: "Reduces breakage, strengthens hair structure"
    },
    featured: false
  },
  {
    title: "Drunk Elephant T.L.C. Sukari Babyfacial",
    description: "This professional-quality AHA/BHA facial reveals clearer, smoother, more radiant skin. With a 25% AHA and 2% BHA blend, it resurfaces by gently dissolving dead skin cells and improving skin texture and tone.",
    brand: "Drunk Elephant",
    price: 80.00,
    mrp: 80.00,
    discount: 0,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Beauty & Personal Care",
    subCategory: "Skin Care",
    specifications: {
      size: "1.69 oz",
      formulation: "Mask",
      skinType: "All skin types",
      keyIngredients: "25% AHA, 2% BHA, chickpea flour, pumpkin ferment",
      features: "Cruelty-free, vegan, free from essential oils",
      use: "Weekly treatment"
    },
    featured: false
  },
  {
    title: "Theragun Elite Percussive Therapy Device",
    description: "The Theragun Elite delivers professional-grade deep muscle treatment in a quiet, premium design. With 5 built-in speeds, an OLED screen, and Bluetooth connectivity, it helps relieve muscle tension and soreness.",
    brand: "Therabody",
    price: 399.00,
    mrp: 399.00,
    discount: 0,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop"
    ],
    category: "Beauty & Personal Care",
    subCategory: "Personal Care",
    specifications: {
      speed: "5 built-in speeds",
      amplitude: "16mm",
      "stall force": "40 lbs",
      attachments: "5 foam attachments",
      battery: "120 minutes of battery life",
      features: "Bluetooth connectivity, OLED screen, QuietForce Technology"
    },
    featured: true
  },

  // Books
  {
    title: "Dune by Frank Herbert",
    description: "Set on the desert planet Arrakis, Dune is a stunning blend of adventure and mysticism, environmentalism and politics. This science fiction masterpiece tells the story of Paul Atreides, whose family accepts stewardship of the dangerous planet.",
    brand: "Ace",
    price: 12.99,
    mrp: 18.00,
    discount: 28,
    stock: 100,
    images: [
      "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "Books",
    subCategory: "Science Fiction",
    specifications: {
      author: "Frank Herbert",
      format: "Paperback",
      pages: "896",
      publisher: "Ace",
      language: "English",
      isbn: "978-0441172719"
    },
    featured: false
  },
  {
    title: "Educated: A Memoir by Tara Westover",
    description: "Born to survivalists in the mountains of Idaho, Tara Westover was 17 the first time she set foot in a classroom. Her quest for knowledge transformed her, taking her to Harvard and Cambridge. A powerful memoir about the struggle for self-invention.",
    brand: "Random House",
    price: 13.99,
    mrp: 18.00,
    discount: 22,
    stock: 85,
    images: [
      "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1476&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1529&auto=format&fit=crop"
    ],
    category: "Books",
    subCategory: "Biographies & Memoirs",
    specifications: {
      author: "Tara Westover",
      format: "Paperback",
      pages: "352",
      publisher: "Random House",
      language: "English",
      isbn: "978-0399590504"
    },
    featured: true
  },
  {
    title: "Where the Crawdads Sing by Delia Owens",
    description: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove. Sensitive and intelligent, Kya Clark has survived alone in the marsh that she calls home. When two young men become intrigued by her wild beauty, Kya opens herself to a new life—until the unthinkable happens.",
    brand: "G.P. Putnam's Sons",
    price: 12.39,
    mrp: 18.00,
    discount: 31,
    stock: 90,
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "Books",
    subCategory: "Fiction",
    specifications: {
      author: "Delia Owens",
      format: "Paperback",
      pages: "400",
      publisher: "G.P. Putnam's Sons",
      language: "English",
      isbn: "978-0735219090"
    },
    featured: false
  }
];

module.exports = additionalProducts;
