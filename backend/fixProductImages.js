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

// High-quality, category-specific images
const categoryImages = {
  'Electronics': [
    // Smartphones
    {
      title: ['iPhone', 'Apple iPhone', 'Galaxy', 'Samsung Galaxy', 'Pixel', 'Google Pixel'],
      images: [
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80',
        'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80'
      ]
    },
    // Laptops
    {
      title: ['MacBook', 'Apple MacBook', 'XPS', 'Dell XPS', 'Laptop'],
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80'
      ]
    },
    // Headphones
    {
      title: ['Headphones', 'AirPods', 'WH-1000', 'QuietComfort', 'SoundLink'],
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&q=80',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'
      ]
    },
    // TVs
    {
      title: ['TV', 'OLED', 'QLED', 'Smart TV'],
      images: [
        'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
        'https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=800&q=80',
        'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=80'
      ]
    },
    // Tablets
    {
      title: ['iPad', 'Apple iPad', 'Galaxy Tab', 'Samsung Tab', 'Tablet'],
      images: [
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
        'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80',
        'https://images.unsplash.com/photo-1623126908029-58c1502e76da?w=800&q=80'
      ]
    },
    // Smartwatches
    {
      title: ['Watch', 'Apple Watch', 'Galaxy Watch', 'Smartwatch'],
      images: [
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80'
      ]
    },
    // Cameras
    {
      title: ['Camera', 'Canon', 'Sony', 'Nikon', 'DSLR', 'Mirrorless'],
      images: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
        'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=800&q=80'
      ]
    },
    // Speakers
    {
      title: ['Speaker', 'Sonos', 'Bose', 'SoundLink', 'HomePod'],
      images: [
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
        'https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=800&q=80'
      ]
    },
    // Gaming
    {
      title: ['Nintendo', 'Switch', 'PlayStation', 'Xbox', 'Gaming', 'Console'],
      images: [
        'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=800&q=80',
        'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&q=80',
        'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800&q=80'
      ]
    },
    // Drones
    {
      title: ['Drone', 'DJI', 'Mavic', 'Mini'],
      images: [
        'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&q=80',
        'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=80',
        'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80'
      ]
    },
    // VR Headsets
    {
      title: ['VR', 'Oculus', 'Quest', 'Virtual Reality', 'Headset'],
      images: [
        'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
        'https://images.unsplash.com/photo-1525459571112-1e8a810d5c65?w=800&q=80',
        'https://images.unsplash.com/photo-1626387346567-68d0b1ee4f58?w=800&q=80'
      ]
    }
  ],
  'Home & Kitchen': [
    // Vacuum Cleaners
    {
      title: ['Vacuum', 'Dyson', 'Roomba', 'Cleaner'],
      images: [
        'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80',
        'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80',
        'https://images.unsplash.com/photo-1626250788734-c8f8a6345473?w=800&q=80'
      ]
    },
    // Coffee Machines
    {
      title: ['Coffee', 'Espresso', 'Breville', 'Nespresso'],
      images: [
        'https://images.unsplash.com/photo-1570087407133-46b5ffdcbb2f?w=800&q=80',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
        'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&q=80'
      ]
    },
    // Blenders
    {
      title: ['Blender', 'Vitamix', 'Mixer', 'Processor'],
      images: [
        'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&q=80',
        'https://images.unsplash.com/photo-1619847546747-25c82a03116d?w=800&q=80',
        'https://images.unsplash.com/photo-1608187251021-8f0a5b309025?w=800&q=80'
      ]
    },
    // Cookware
    {
      title: ['Cookware', 'Le Creuset', 'Dutch Oven', 'Pot', 'Pan', 'Calphalon'],
      images: [
        'https://images.unsplash.com/photo-1584947897558-4e06c5e5b1ec?w=800&q=80',
        'https://images.unsplash.com/photo-1585442245979-b2de261ebe8c?w=800&q=80',
        'https://images.unsplash.com/photo-1584946814095-8e8ee9a2f0f6?w=800&q=80'
      ]
    },
    // Smart Home
    {
      title: ['Smart', 'Hue', 'Philips', 'Alexa', 'Echo', 'Google Home'],
      images: [
        'https://images.unsplash.com/photo-1558002038-1055e2e28ed1?w=800&q=80',
        'https://images.unsplash.com/photo-1544428571-affe6494aa1e?w=800&q=80',
        'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80'
      ]
    }
  ],
  'Clothing': [
    // Jackets
    {
      title: ['Jacket', 'North Face', 'Patagonia', 'Columbia'],
      images: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
        'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=800&q=80',
        'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80'
      ]
    },
    // Athletic Wear
    {
      title: ['Lululemon', 'Nike', 'Adidas', 'Athletic', 'Running', 'Shoes'],
      images: [
        'https://images.unsplash.com/photo-1584545284372-f22510eb7c26?w=800&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
        'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80'
      ]
    },
    // Sunglasses
    {
      title: ['Sunglasses', 'Ray-Ban', 'Aviator'],
      images: [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
        'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=80',
        'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80'
      ]
    }
  ],
  'Beauty & Personal Care': [
    // Hair Styling
    {
      title: ['Dyson Airwrap', 'Hair', 'Dryer', 'Styler'],
      images: [
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
        'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80',
        'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=800&q=80'
      ]
    },
    // Skincare
    {
      title: ['Cream', 'La Mer', 'Moisturizer', 'Serum', 'Drunk Elephant'],
      images: [
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
        'https://images.unsplash.com/photo-1556228578-dd539282b964?w=800&q=80',
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80'
      ]
    },
    // Hair Care
    {
      title: ['Olaplex', 'Shampoo', 'Conditioner', 'Hair'],
      images: [
        'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&q=80',
        'https://images.unsplash.com/photo-1626725451333-221d3826f6a8?w=800&q=80',
        'https://images.unsplash.com/photo-1610113774930-ac5b8a85c80a?w=800&q=80'
      ]
    },
    // Massage
    {
      title: ['Theragun', 'Massage', 'Therapy', 'Percussive'],
      images: [
        'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
        'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80'
      ]
    }
  ],
  'Books': [
    {
      title: ['Book', 'Novel', 'Dune', 'Educated', 'Psychology', 'Habits'],
      images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80'
      ]
    }
  ],
  'Sports & Outdoors': [
    // Fitness Equipment
    {
      title: ['Fitness', 'Dumbbells', 'Bowflex', 'Weights', 'Exercise'],
      images: [
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
        'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=800&q=80'
      ]
    },
    // Outdoor Gear
    {
      title: ['Outdoor', 'Camping', 'Tent', 'Hiking', 'Backpack', 'Coleman', 'Osprey'],
      images: [
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
        'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
        'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80'
      ]
    },
    // Water Bottles
    {
      title: ['Hydro', 'Flask', 'Bottle', 'Water'],
      images: [
        'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80',
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
        'https://images.unsplash.com/photo-1555633514-abcee6ab92e1?w=800&q=80'
      ]
    },
    // Fitness Trackers
    {
      title: ['Fitbit', 'Garmin', 'Tracker', 'Smartwatch', 'GPS'],
      images: [
        'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=800&q=80',
        'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=800&q=80',
        'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&q=80'
      ]
    }
  ],
  'Toys & Games': [
    // Board Games
    {
      title: ['Board Game', 'Monopoly', 'Game', 'Wingspan'],
      images: [
        'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80',
        'https://images.unsplash.com/photo-1611371805429-12b8e1c48fdb?w=800&q=80',
        'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=800&q=80'
      ]
    },
    // LEGO
    {
      title: ['LEGO', 'Building', 'Blocks'],
      images: [
        'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
        'https://images.unsplash.com/photo-1516981879613-9f5da904015f?w=800&q=80',
        'https://images.unsplash.com/photo-1560961911-ba7ef651a56a?w=800&q=80'
      ]
    },
    // Toys
    {
      title: ['Toy', 'Barbie', 'Nerf', 'Action Figure'],
      images: [
        'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80',
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80',
        'https://images.unsplash.com/photo-1596460107916-430662021049?w=800&q=80'
      ]
    }
  ]
};

// Default images for categories or products not specifically matched
const defaultImages = {
  'Electronics': [
    'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=800&q=80',
    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80'
  ],
  'Home & Kitchen': [
    'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
    'https://images.unsplash.com/photo-1583845112203-29329902332e?w=800&q=80'
  ],
  'Clothing': [
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
    'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80'
  ],
  'Beauty & Personal Care': [
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80'
  ],
  'Books': [
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80'
  ],
  'Sports & Outdoors': [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80'
  ],
  'Toys & Games': [
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80',
    'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&q=80',
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80'
  ],
  'default': [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80'
  ]
};

// Find the best matching image set for a product
const findMatchingImageSet = (product) => {
  const title = product.title.toLowerCase();
  const category = product.category;
  
  // Check if we have specific image sets for this category
  if (categoryImages[category]) {
    // Try to find a matching title pattern
    for (const imageSet of categoryImages[category]) {
      for (const titlePattern of imageSet.title) {
        if (title.includes(titlePattern.toLowerCase())) {
          return imageSet.images;
        }
      }
    }
  }
  
  // If no specific match found, use default images for the category
  return defaultImages[category] || defaultImages['default'];
};

// Update product images with better, more relevant images
const updateProductImages = async () => {
  try {
    console.log('Fetching all products...'.yellow);
    
    // Get all products
    const products = await Product.find();
    
    if (products.length === 0) {
      console.log('No products found in the database.'.red);
      process.exit(1);
    }
    
    console.log(`Found ${products.length} products. Updating images...`.yellow);
    
    // Update each product
    for (const product of products) {
      // Get appropriate image set based on product title and category
      const imageSet = findMatchingImageSet(product);
      
      // Update product with new images
      product.images = imageSet;
      await product.save();
      
      console.log(`Updated images for product: ${product.title}`.green);
    }
    
    console.log('All product images updated successfully!'.green);
    process.exit(0);
  } catch (err) {
    console.error(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

// Run the update function
updateProductImages();
