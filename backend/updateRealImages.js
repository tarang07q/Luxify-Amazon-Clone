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

// Real image URLs by category
const realImages = {
  'Electronics': [
    {
      primary: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1585790050230-5ab112f5b1cf?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=1000&auto=format&fit=crop'
      ]
    }
  ],
  'Clothing': [
    {
      primary: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
      ]
    }
  ],
  'Home & Kitchen': [
    {
      primary: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1586208958839-06c17cacdf08?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583845112203-29329902332e?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1584346133934-a3a4db9b5732?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1584346138880-dc20ab95e89d?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1586208958859-e78c31a1da48?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1583845112223-caa9e49cc926?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1584346236371-e23eff99e5ca?q=80&w=1000&auto=format&fit=crop'
      ]
    }
  ],
  'Books': [
    {
      primary: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1000&auto=format&fit=crop'
      ]
    }
  ],
  'Beauty & Personal Care': [
    {
      primary: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1596462502102-2d5d56936b51?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1596462502022-6a0a770204ec?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598452963559-7a5757a31f51?q=80&w=1000&auto=format&fit=crop'
      ]
    }
  ],
  'Sports & Outdoors': [
    {
      primary: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1000&auto=format&fit=crop'
      ]
    }
  ],
  'Toys & Games': [
    {
      primary: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1596460107916-430662021049?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596461404806-1a8bfc0b3d01?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      primary: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop',
      additional: [
        'https://images.unsplash.com/photo-1596460107853-8fbd11bf3421?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596461404881-b187e9a8fff2?q=80&w=1000&auto=format&fit=crop'
      ]
    }
  ]
};

// Default images for categories not specifically mapped
const defaultImages = [
  {
    primary: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    additional: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    primary: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1000&auto=format&fit=crop',
    additional: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    primary: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    additional: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop'
    ]
  }
];

// Update product images with real URLs
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
      
      if (realImages[product.category]) {
        // Get random image set from the category
        const categoryImages = realImages[product.category];
        imageSet = categoryImages[Math.floor(Math.random() * categoryImages.length)];
      } else {
        // Use default images if category not found
        imageSet = defaultImages[Math.floor(Math.random() * defaultImages.length)];
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
