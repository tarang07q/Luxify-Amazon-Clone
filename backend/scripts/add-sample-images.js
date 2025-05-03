const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Sample image URLs for different categories
const categoryImages = {
  'Electronics': [
    'https://images.unsplash.com/photo-1498049794561-7780e7231661',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    'https://images.unsplash.com/photo-1546054454-aa26e2b734c7',
    'https://images.unsplash.com/photo-1526738549149-8e07eca6c147'
  ],
  'Computers': [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2',
    'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302'
  ],
  'Smart Home': [
    'https://images.unsplash.com/photo-1558002038-bb0237f4e204',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72',
    'https://images.unsplash.com/photo-1556740758-90de374c12ad',
    'https://images.unsplash.com/photo-1544273677-c433136021d4'
  ],
  'Home & Kitchen': [
    'https://images.unsplash.com/photo-1556911220-bda9f7f7597e',
    'https://images.unsplash.com/photo-1583845112203-29329902332e',
    'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c',
    'https://images.unsplash.com/photo-1586208958839-06c17cacdf08'
  ],
  'Clothing': [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f',
    'https://images.unsplash.com/photo-1542060748-10c28b62716f',
    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3'
  ],
  'Beauty & Personal Care': [
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908',
    'https://images.unsplash.com/photo-1571875257727-256c39da42af'
  ],
  'Books': [
    'https://images.unsplash.com/photo-1512820790803-83ca734da794',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
    'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
    'https://images.unsplash.com/photo-1589998059171-988d887df646'
  ],
  'Toys & Games': [
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088',
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b',
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1',
    'https://images.unsplash.com/photo-1558060370-d5019f6a41b4'
  ],
  'Sports & Outdoors': [
    'https://images.unsplash.com/photo-1517649763962-0c623066013b',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55',
    'https://images.unsplash.com/photo-1530549387789-4c1017266635',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438'
  ],
  'Grocery & Gourmet Food': [
    'https://images.unsplash.com/photo-1542838132-92c53300491e',
    'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8',
    'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9',
    'https://images.unsplash.com/photo-1543168256-418811576931'
  ],
  'Pet Supplies': [
    'https://images.unsplash.com/photo-1548767797-d8c844163c4c',
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee',
    'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69'
  ],
  'Automotive': [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',
    'https://images.unsplash.com/photo-1542362567-b07e54358753',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2'
  ],
  'Tools & Home Improvement': [
    'https://images.unsplash.com/photo-1504148455328-c376907d081c',
    'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd',
    'https://images.unsplash.com/photo-1530124566582-a618bc2615dc',
    'https://images.unsplash.com/photo-1572281566245-aef6d2cb1ba0'
  ],
  'Health & Household': [
    'https://images.unsplash.com/photo-1584362917165-526a968579e8',
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f',
    'https://images.unsplash.com/photo-1576671081837-49000212a370',
    'https://images.unsplash.com/photo-1556228852-6d35a585d566'
  ],
  'Office Products': [
    'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc',
    'https://images.unsplash.com/photo-1568952433726-3896e3881c65',
    'https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e',
    'https://images.unsplash.com/photo-1524578271613-d550eacf6090'
  ],
  'Gift Cards': [
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48',
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
    'https://images.unsplash.com/photo-1577375729152-4c8b5fcda381'
  ]
};

// Download an image from a URL
const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https.get(`${url}?w=800&q=80`, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve(filename);
      });
    }).on('error', err => {
      fs.unlink(filename, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
};

// Main function to download all images
const downloadAllImages = async () => {
  const downloadPromises = [];
  
  // Process each category
  for (const [category, imageUrls] of Object.entries(categoryImages)) {
    // Create category directory if it doesn't exist
    const categoryDir = path.join(uploadsDir, category.toLowerCase().replace(/\s+/g, '-'));
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    // Download each image for the category
    imageUrls.forEach((url, index) => {
      const filename = path.join(categoryDir, `${category.toLowerCase().replace(/\s+/g, '-')}-${index + 1}.jpg`);
      downloadPromises.push(downloadImage(url, filename));
    });
  }
  
  try {
    await Promise.all(downloadPromises);
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

// Run the download function
downloadAllImages();
