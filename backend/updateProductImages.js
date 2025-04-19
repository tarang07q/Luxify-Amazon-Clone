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

// Placeholder images for development (using placeholder.com)
const placeholderImages = {
  'Electronics': [
    {
      primary: 'https://via.placeholder.com/600x600/6366F1/FFFFFF?text=Electronics+Product',
      additional: [
        'https://via.placeholder.com/600x600/6366F1/FFFFFF?text=Electronics+Detail+1',
        'https://via.placeholder.com/600x600/6366F1/FFFFFF?text=Electronics+Detail+2'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/818CF8/FFFFFF?text=Smartphone',
      additional: [
        'https://via.placeholder.com/600x600/818CF8/FFFFFF?text=Smartphone+Detail+1',
        'https://via.placeholder.com/600x600/818CF8/FFFFFF?text=Smartphone+Detail+2'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/A5B4FC/FFFFFF?text=Laptop',
      additional: [
        'https://via.placeholder.com/600x600/A5B4FC/FFFFFF?text=Laptop+Detail+1',
        'https://via.placeholder.com/600x600/A5B4FC/FFFFFF?text=Laptop+Detail+2'
      ]
    }
  ],
  'Clothing': [
    {
      primary: 'https://via.placeholder.com/600x600/EC4899/FFFFFF?text=Clothing+Product',
      additional: [
        'https://via.placeholder.com/600x600/EC4899/FFFFFF?text=Clothing+Detail+1',
        'https://via.placeholder.com/600x600/EC4899/FFFFFF?text=Clothing+Detail+2'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/F472B6/FFFFFF?text=Fashion+Item',
      additional: [
        'https://via.placeholder.com/600x600/F472B6/FFFFFF?text=Fashion+Detail+1',
        'https://via.placeholder.com/600x600/F472B6/FFFFFF?text=Fashion+Detail+2'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/FBCFE8/FFFFFF?text=Apparel',
      additional: [
        'https://via.placeholder.com/600x600/FBCFE8/FFFFFF?text=Apparel+Detail+1',
        'https://via.placeholder.com/600x600/FBCFE8/FFFFFF?text=Apparel+Detail+2'
      ]
    }
  ],
  'Home & Kitchen': [
    {
      primary: 'https://via.placeholder.com/600x600/10B981/FFFFFF?text=Home+Product',
      additional: [
        'https://via.placeholder.com/600x600/10B981/FFFFFF?text=Home+Detail+1',
        'https://via.placeholder.com/600x600/10B981/FFFFFF?text=Home+Detail+2'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/34D399/FFFFFF?text=Kitchen+Item',
      additional: [
        'https://via.placeholder.com/600x600/34D399/FFFFFF?text=Kitchen+Detail+1',
        'https://via.placeholder.com/600x600/34D399/FFFFFF?text=Kitchen+Detail+2'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/6EE7B7/FFFFFF?text=Appliance',
      additional: [
        'https://via.placeholder.com/600x600/6EE7B7/FFFFFF?text=Appliance+Detail+1',
        'https://via.placeholder.com/600x600/6EE7B7/FFFFFF?text=Appliance+Detail+2'
      ]
    }
  ],
  'Books': [
    {
      primary: 'https://via.placeholder.com/600x600/3B82F6/FFFFFF?text=Book+Cover',
      additional: [
        'https://via.placeholder.com/600x600/3B82F6/FFFFFF?text=Book+Back+Cover',
        'https://via.placeholder.com/600x600/3B82F6/FFFFFF?text=Book+Pages'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/60A5FA/FFFFFF?text=Novel',
      additional: [
        'https://via.placeholder.com/600x600/60A5FA/FFFFFF?text=Novel+Back',
        'https://via.placeholder.com/600x600/60A5FA/FFFFFF?text=Novel+Open'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/93C5FD/FFFFFF?text=Textbook',
      additional: [
        'https://via.placeholder.com/600x600/93C5FD/FFFFFF?text=Textbook+Back',
        'https://via.placeholder.com/600x600/93C5FD/FFFFFF?text=Textbook+Content'
      ]
    }
  ],
  'Beauty & Personal Care': [
    {
      primary: 'https://via.placeholder.com/600x600/8B5CF6/FFFFFF?text=Beauty+Product',
      additional: [
        'https://via.placeholder.com/600x600/8B5CF6/FFFFFF?text=Beauty+Detail+1',
        'https://via.placeholder.com/600x600/8B5CF6/FFFFFF?text=Beauty+Detail+2'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/A78BFA/FFFFFF?text=Skincare',
      additional: [
        'https://via.placeholder.com/600x600/A78BFA/FFFFFF?text=Skincare+Detail+1',
        'https://via.placeholder.com/600x600/A78BFA/FFFFFF?text=Skincare+Detail+2'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/C4B5FD/FFFFFF?text=Cosmetics',
      additional: [
        'https://via.placeholder.com/600x600/C4B5FD/FFFFFF?text=Cosmetics+Detail+1',
        'https://via.placeholder.com/600x600/C4B5FD/FFFFFF?text=Cosmetics+Detail+2'
      ]
    }
  ],
  'Sports & Outdoors': [
    {
      primary: 'https://via.placeholder.com/600x600/F59E0B/FFFFFF?text=Sports+Equipment',
      additional: [
        'https://via.placeholder.com/600x600/F59E0B/FFFFFF?text=Sports+Detail+1',
        'https://via.placeholder.com/600x600/F59E0B/FFFFFF?text=Sports+Detail+2'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/FBBF24/FFFFFF?text=Fitness+Gear',
      additional: [
        'https://via.placeholder.com/600x600/FBBF24/FFFFFF?text=Fitness+Detail+1',
        'https://via.placeholder.com/600x600/FBBF24/FFFFFF?text=Fitness+Detail+2'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/FCD34D/FFFFFF?text=Outdoor+Item',
      additional: [
        'https://via.placeholder.com/600x600/FCD34D/FFFFFF?text=Outdoor+Detail+1',
        'https://via.placeholder.com/600x600/FCD34D/FFFFFF?text=Outdoor+Detail+2'
      ]
    }
  ],
  'Toys & Games': [
    {
      primary: 'https://via.placeholder.com/600x600/EF4444/FFFFFF?text=Toy',
      additional: [
        'https://via.placeholder.com/600x600/EF4444/FFFFFF?text=Toy+Detail+1',
        'https://via.placeholder.com/600x600/EF4444/FFFFFF?text=Toy+Detail+2'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/F87171/FFFFFF?text=Game',
      additional: [
        'https://via.placeholder.com/600x600/F87171/FFFFFF?text=Game+Detail+1',
        'https://via.placeholder.com/600x600/F87171/FFFFFF?text=Game+Detail+2'
      ]
    },
    {
      primary: 'https://via.placeholder.com/600x600/FCA5A5/FFFFFF?text=Board+Game',
      additional: [
        'https://via.placeholder.com/600x600/FCA5A5/FFFFFF?text=Board+Game+Detail+1',
        'https://via.placeholder.com/600x600/FCA5A5/FFFFFF?text=Board+Game+Detail+2'
      ]
    }
  ]
};

// Default placeholder images
const defaultPlaceholders = [
  {
    primary: 'https://via.placeholder.com/600x600/1E293B/FFFFFF?text=Product',
    additional: [
      'https://via.placeholder.com/600x600/1E293B/FFFFFF?text=Product+Detail+1',
      'https://via.placeholder.com/600x600/1E293B/FFFFFF?text=Product+Detail+2'
    ]
  },
  {
    primary: 'https://via.placeholder.com/600x600/334155/FFFFFF?text=Item',
    additional: [
      'https://via.placeholder.com/600x600/334155/FFFFFF?text=Item+Detail+1',
      'https://via.placeholder.com/600x600/334155/FFFFFF?text=Item+Detail+2'
    ]
  },
  {
    primary: 'https://via.placeholder.com/600x600/475569/FFFFFF?text=Product+Image',
    additional: [
      'https://via.placeholder.com/600x600/475569/FFFFFF?text=Product+Image+Detail+1',
      'https://via.placeholder.com/600x600/475569/FFFFFF?text=Product+Image+Detail+2'
    ]
  }
];

// Update product images
const updateProductImages = async () => {
  try {
    console.log('Fetching existing products...'.yellow);

    // Get all products
    const products = await Product.find();

    if (products.length === 0) {
      console.log('No products found in the database.'.red);
      process.exit(1);
    }

    console.log(`Found ${products.length} products. Updating images...`.yellow);

    // Update each product
    for (const product of products) {
      // Get appropriate image set based on category
      let imageSet;

      if (placeholderImages[product.category]) {
        // Get random image set from the category
        const categoryImages = placeholderImages[product.category];
        imageSet = categoryImages[Math.floor(Math.random() * categoryImages.length)];
      } else {
        // Use default placeholder if category not found
        imageSet = defaultPlaceholders[Math.floor(Math.random() * defaultPlaceholders.length)];
      }

      // Create image array with primary and additional images
      const images = [imageSet.primary, ...imageSet.additional];

      // Update product
      product.images = images;
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
