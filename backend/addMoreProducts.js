const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load env vars
dotenv.config();

// Connect to DB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/amazer';
console.log(`Connecting to MongoDB: ${MONGO_URI}`.cyan);
mongoose.connect(MONGO_URI);

// New products to add (20 products)
const newProducts = [
  // Home & Kitchen Category (5 products)
  {
    title: "Dyson V15 Detect Absolute Cordless Vacuum",
    description: "The most powerful, intelligent cordless vacuum with laser dust detection. Automatically optimizes suction and run time across all floor types.",
    price: 749.99,
    mrp: 849.99,
    discount: 12,
    category: "Home & Kitchen",
    brand: "Dyson",
    stock: 15,
    rating: 4.8,
    numReviews: 124,
    specifications: {
      "Power": "240 AW",
      "Battery Life": "Up to 60 minutes",
      "Weight": "6.8 lbs",
      "Bin Volume": "0.2 gallons",
      "Filtration": "Whole-machine HEPA filtration"
    }
  },
  {
    title: "Breville Barista Express Espresso Machine",
    description: "The Barista Express delivers third wave specialty coffee at home using the 4 keys formula and is part of the Barista Series that offers all in one espresso machines with integrated grinder to go from beans to espresso in under one minute.",
    price: 699.95,
    mrp: 749.95,
    discount: 7,
    category: "Home & Kitchen",
    brand: "Breville",
    stock: 8,
    rating: 4.7,
    numReviews: 215,
    specifications: {
      "Capacity": "67 fl oz",
      "Power": "1600W",
      "Grinder": "Integrated conical burr grinder",
      "Pressure": "15 bar Italian pump",
      "Heating System": "Thermocoil"
    }
  },
  {
    title: "Vitamix 5200 Professional-Grade Blender",
    description: "Variable Speed Control: Easily adjust speed to achieve a variety of textures. The dial can be rotated at any point during the blend, so you're in complete control.",
    price: 449.95,
    mrp: 549.95,
    discount: 18,
    category: "Home & Kitchen",
    brand: "Vitamix",
    stock: 12,
    rating: 4.9,
    numReviews: 178,
    specifications: {
      "Container Size": "64 oz",
      "Power": "1380 watts",
      "Speed Settings": "10 variable speeds",
      "Blade Material": "Hardened stainless steel",
      "Height": "20.5 inches"
    }
  },
  {
    title: "Le Creuset Signature Enameled Cast Iron Round Dutch Oven",
    description: "Enameled cast iron delivers superior heat distribution and retention. Ready to use, requires no seasoning. Easy-to-clean and durable enamel resists dulling, staining, chipping and cracking.",
    price: 369.95,
    mrp: 399.95,
    discount: 8,
    category: "Home & Kitchen",
    brand: "Le Creuset",
    stock: 7,
    rating: 4.8,
    numReviews: 156,
    specifications: {
      "Capacity": "5.5 qt",
      "Material": "Enameled Cast Iron",
      "Dishwasher Safe": "Yes",
      "Oven Safe": "Up to 500°F",
      "Compatible Cooktops": "All, including induction"
    }
  },
  {
    title: "Philips Hue White and Color Ambiance Starter Kit",
    description: "Enhance your home with 16 million colors and warm to cool white light that syncs with music, games, and movies. Control your lights with your voice using Alexa, Apple HomeKit, or Google Assistant.",
    price: 179.99,
    mrp: 199.99,
    discount: 10,
    category: "Home & Kitchen",
    brand: "Philips",
    stock: 22,
    rating: 4.6,
    numReviews: 89,
    specifications: {
      "Bulbs Included": "3 A19 LED smart bulbs",
      "Bridge Included": "Yes",
      "Wattage": "9.5W (60W equivalent)",
      "Lifetime": "25,000 hours",
      "Connectivity": "Bluetooth and Zigbee"
    }
  },

  // Electronics Category (5 products)
  {
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    description: "Industry-leading noise cancellation with two processors and eight microphones. Crystal clear hands-free calling with precise voice pickup. Up to 30-hour battery life with quick charging.",
    price: 349.99,
    mrp: 399.99,
    discount: 13,
    category: "Electronics",
    brand: "Sony",
    stock: 18,
    rating: 4.7,
    numReviews: 203,
    specifications: {
      "Battery Life": "Up to 30 hours",
      "Noise Cancellation": "Industry-leading",
      "Connectivity": "Bluetooth 5.2",
      "Weight": "250g",
      "Charging": "USB-C, 3 hours full charge"
    }
  },
  {
    title: "Samsung 65-Inch QN90B Neo QLED 4K Smart TV",
    description: "Brilliant details shine even in daylight with Quantum Matrix Technology. See bold contrast controlled by Quantum Mini LEDs. Experience smooth motion for fast action with Motion Xcelerator Turbo+.",
    price: 1799.99,
    mrp: 2199.99,
    discount: 18,
    category: "Electronics",
    brand: "Samsung",
    stock: 5,
    rating: 4.8,
    numReviews: 87,
    specifications: {
      "Screen Size": "65 inches",
      "Resolution": "4K UHD (3840 x 2160)",
      "HDR": "Quantum HDR 32X",
      "Refresh Rate": "120Hz",
      "Smart Platform": "Tizen"
    }
  },
  {
    title: "Apple AirPods Max",
    description: "A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods. The ultimate personal listening experience is here.",
    price: 479.99,
    mrp: 549.99,
    discount: 13,
    category: "Electronics",
    brand: "Apple",
    stock: 9,
    rating: 4.6,
    numReviews: 142,
    specifications: {
      "Chip": "Apple H1 (in each ear cup)",
      "Battery Life": "Up to 20 hours",
      "Weight": "384.8g",
      "Noise Control": "Active Noise Cancellation and Transparency mode",
      "Connectivity": "Bluetooth 5.0"
    }
  },
  {
    title: "LG C2 Series 55-Inch OLED evo Smart TV",
    description: "Self-lit OLED pixels create infinite contrast and perfect black. α9 Gen5 AI Processor 4K for enhanced picture and sound. Dolby Vision IQ and Dolby Atmos for immersive entertainment.",
    price: 1299.99,
    mrp: 1799.99,
    discount: 28,
    category: "Electronics",
    brand: "LG",
    stock: 7,
    rating: 4.9,
    numReviews: 112,
    specifications: {
      "Screen Size": "55 inches",
      "Resolution": "4K UHD (3840 x 2160)",
      "HDR": "Dolby Vision, HDR10, HLG",
      "Refresh Rate": "120Hz",
      "Smart Platform": "webOS 22"
    }
  },
  {
    title: "Bose QuietComfort Earbuds II",
    description: "The world's best noise cancellation and full, clear sound. CustomTune technology personalizes the noise cancellation and sound performance to fit your ears perfectly.",
    price: 249.99,
    mrp: 299.99,
    discount: 17,
    category: "Electronics",
    brand: "Bose",
    stock: 14,
    rating: 4.5,
    numReviews: 76,
    specifications: {
      "Battery Life": "Up to 6 hours (24 with charging case)",
      "Noise Cancellation": "CustomTune technology",
      "Water Resistance": "IPX4",
      "Connectivity": "Bluetooth 5.3",
      "Charging": "USB-C, wireless Qi-compatible"
    }
  },

  // Clothing Category (5 products)
  {
    title: "The North Face Men's Thermoball Eco Jacket",
    description: "Stay warm in wet weather with this lightweight, packable jacket that's insulated with ThermoBall Eco, a synthetic alternative to down that's made with recycled materials.",
    price: 199.99,
    mrp: 229.99,
    discount: 13,
    category: "Clothing",
    brand: "The North Face",
    stock: 25,
    rating: 4.7,
    numReviews: 98,
    specifications: {
      "Material": "100% recycled polyester",
      "Insulation": "ThermoBall Eco",
      "Pockets": "Secure-zip hand pockets",
      "Packable": "Stows in own pocket",
      "Weight": "Medium - 15.2 oz"
    }
  },
  {
    title: "Lululemon Align High-Rise Pant 25\"",
    description: "Designed for yoga, these buttery-soft, lightweight leggings minimize distractions and maximize comfort as you flow through your practice.",
    price: 98.00,
    mrp: 118.00,
    discount: 17,
    category: "Clothing",
    brand: "Lululemon",
    stock: 18,
    rating: 4.8,
    numReviews: 215,
    specifications: {
      "Material": "Nulu fabric (81% nylon, 19% Lycra elastane)",
      "Rise": "High-rise",
      "Length": "25 inches",
      "Features": "Hidden waistband pocket",
      "Care": "Machine wash cold, tumble dry low"
    }
  },
  {
    title: "Adidas Ultraboost 22 Running Shoes",
    description: "Experience incredible energy return with these running shoes designed specifically for women. The adidas PRIMEKNIT upper wraps the foot with a supportive fit that enhances movement.",
    price: 139.99,
    mrp: 189.99,
    discount: 26,
    category: "Clothing",
    brand: "Adidas",
    stock: 32,
    rating: 4.6,
    numReviews: 167,
    specifications: {
      "Upper": "adidas PRIMEKNIT textile",
      "Midsole": "BOOST",
      "Outsole": "Continental™ Rubber",
      "Weight": "10.9 oz (size 9)",
      "Drop": "10 mm (heel 22 mm / forefoot 12 mm)"
    }
  },
  {
    title: "Patagonia Women's Better Sweater Fleece Jacket",
    description: "Warm, easy-wearing fleece made of 100% recycled polyester. Fair Trade Certified sewn, which means the people who made it earned a premium for their labor.",
    price: 139.00,
    mrp: 159.00,
    discount: 13,
    category: "Clothing",
    brand: "Patagonia",
    stock: 15,
    rating: 4.9,
    numReviews: 124,
    specifications: {
      "Material": "100% recycled polyester fleece",
      "Pockets": "Zippered handwarmer and chest pocket",
      "Cuffs": "Shape-holding micropolyester jersey trim",
      "Weight": "16 oz (454 g)",
      "Fair Trade": "Certified sewn"
    }
  },
  {
    title: "Ray-Ban Aviator Classic Sunglasses",
    description: "The iconic Ray-Ban Aviator is the most recognizable style in the history of sunglasses. With a timeless and classic design, they are worn by cultural icons, celebrities and trendsetters worldwide.",
    price: 154.00,
    mrp: 179.00,
    discount: 14,
    category: "Clothing",
    brand: "Ray-Ban",
    stock: 28,
    rating: 4.7,
    numReviews: 189,
    specifications: {
      "Frame Material": "Metal",
      "Lens Material": "Glass",
      "Lens Width": "58 mm",
      "Bridge Width": "14 mm",
      "Temple Length": "135 mm"
    }
  },

  // Beauty & Personal Care Category (5 products)
  {
    title: "Dyson Airwrap Multi-Styler Complete",
    description: "The only multi-styler to curl, shape, smooth and dry with no extreme heat. Includes six attachments to style different hair types and lengths.",
    price: 549.99,
    mrp: 599.99,
    discount: 8,
    category: "Beauty & Personal Care",
    brand: "Dyson",
    stock: 6,
    rating: 4.5,
    numReviews: 156,
    specifications: {
      "Power": "1300W",
      "Heat Settings": "3 precise settings",
      "Airflow Settings": "3 precise speeds",
      "Cord Length": "8.4 ft",
      "Attachments": "6 styling attachments"
    }
  },
  {
    title: "La Mer Crème de la Mer Moisturizing Cream",
    description: "This ultra-rich cream transforms skin on contact and immerses it in moisture. Skin looks naturally vibrant, restored to its healthiest center.",
    price: 190.00,
    mrp: 190.00,
    discount: 0,
    category: "Beauty & Personal Care",
    brand: "La Mer",
    stock: 12,
    rating: 4.7,
    numReviews: 98,
    specifications: {
      "Size": "1 oz / 30 ml",
      "Key Ingredients": "Miracle Broth™, Lime Tea",
      "Skin Type": "Dry, Normal, Combination",
      "Concerns": "Dryness, Fine Lines, Wrinkles",
      "Texture": "Rich cream"
    }
  },
  {
    title: "Olaplex No. 3 Hair Perfector",
    description: "A weekly at-home treatment, not a conditioner, that reduces breakage and visibly strengthens hair, improving its look and feel.",
    price: 28.00,
    mrp: 30.00,
    discount: 7,
    category: "Beauty & Personal Care",
    brand: "Olaplex",
    stock: 35,
    rating: 4.6,
    numReviews: 245,
    specifications: {
      "Size": "3.3 oz / 100 ml",
      "Hair Type": "All hair types",
      "Key Benefits": "Repairs damaged hair, Strengthens hair structure",
      "Free From": "Parabens, Sulfates, Phthalates",
      "Application": "Apply to damp hair before shampooing"
    }
  },
  {
    title: "Drunk Elephant T.L.C. Sukari Babyfacial",
    description: "A pro-quality AHA/BHA facial that resurfaces to reveal greater clarity, improved skin texture and tone, and a more youthful radiance.",
    price: 80.00,
    mrp: 80.00,
    discount: 0,
    category: "Beauty & Personal Care",
    brand: "Drunk Elephant",
    stock: 18,
    rating: 4.5,
    numReviews: 112,
    specifications: {
      "Size": "1.69 oz / 50 ml",
      "Skin Type": "All skin types",
      "Key Ingredients": "25% AHA, 2% BHA, Chickpea flour",
      "pH Level": "3.5 - 3.6",
      "Free From": "Essential oils, Silicones, Fragrance"
    }
  },
  {
    title: "Theragun Elite Percussive Therapy Device",
    description: "The quietest commercial-grade percussive therapy device with advanced sound insulation. Features an OLED screen, wireless charging, and customizable speed range.",
    price: 349.00,
    mrp: 399.00,
    discount: 13,
    category: "Beauty & Personal Care",
    brand: "Therabody",
    stock: 9,
    rating: 4.8,
    numReviews: 76,
    specifications: {
      "Speed Range": "1750-2400 PPM",
      "Amplitude": "16 mm",
      "Battery Life": "Up to 120 minutes",
      "Force": "40 lbs",
      "Attachments": "5 closed-cell foam attachments"
    }
  }
];

// Add products to database
const addProducts = async () => {
  try {
    console.log('Adding new products to database...'.yellow);

    // Get admin user
    const adminId = '68027749f98066a80a549b1b';

    // Add admin user to each product
    const productsWithUser = newProducts.map(product => ({
      ...product,
      user: adminId,
      // Add empty images array that will be updated later
      images: []
    }));

    // Insert products
    const result = await Product.insertMany(productsWithUser);

    console.log(`${result.length} products added successfully!`.green);
    process.exit(0);
  } catch (err) {
    console.error(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

// Run the function
addProducts();
